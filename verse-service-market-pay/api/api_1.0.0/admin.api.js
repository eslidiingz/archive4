const express = require('express');
const route = express.Router();
// const { URLSearchParams } = require('url')
const moment = require('moment')
var schedule = require('node-schedule');

const config = require('../../systems/config/config')
const globalService = require('./../../utils/globalService');
const models = require('./../../schema/index.js');
const modelService = require('./../../utils/modelService')(models, globalService);

module.exports = function (route, models, globalService, modelService, config) {

    //(เลิกใช้ก่อน ไม่อนุญาตถอนเงินที่ฝาก)admin ต้องยิง api นี้หลังจากโอนเงินเข้าบัญชีผู้ใช้งานเรียบร้อยแล้ว
    route.post('/adminProveWithdraw', async function (req, res) {
        try {
            return globalService.responseError(res, "ระบบยังไม่เปิดให้สามารถถอนเงินได้");

            const thisdata = req.body;
            if (globalService.checkParam(thisdata, 'tel', res) == false) { return };
            if (globalService.checkParam(thisdata, 'system_name', res) == false) { return };//ALL, STN, BIRD_FLASH, YAAMO
            if (globalService.checkParam(thisdata, 'wallet_transection_id', res) == false) { return };
            if (globalService.checkParam(thisdata, 'admin_prove_withdraw_img_64', res) == false) { return };

            let this_wallet = await models.wallets.findOne({ 'tel': thisdata.tel }, {}, { sort: { _id: 1 } });
            if (this_wallet == null) {
                return globalService.responseError(res, "ไม่พบชื่อบัญชีเบอร์นี้");
            }

            let this_wallet_t = await models.wallet_transactions.findOne({ 'system': thisdata.system_name, '_id': globalService.genMongoId(thisdata.wallet_transection_id) }, {}, { sort: { _id: 1 } });
            if (this_wallet_t == null) {
                return globalService.responseError(res, "ไม่พบ transaction นี้");
            }
            if (this_wallet_t.status != "PENDING") {
                return globalService.responseError(res, "transaction นี้ complete แล้ว");
            }
            if (this_wallet_t.type != "WITHDRAW") {
                return globalService.responseError(res, "transaction นี้ไม่ใช่ประเภทถอนเงิน");
            }

            let sumResult = await models.wallet_transactions.aggregate([
                { $match: { 'system': thisdata.system_name, 'tel': thisdata.tel, 'status': 'COMPLETE', 'is_delete': false, 'is_enable': true } },
                {
                    $group: {
                        _id: {
                            "system": "$system"
                        },
                        total_amt: { $sum: "$trans_amt" },
                        count: { $sum: 1 }
                    }
                }
            ]);
            if (sumResult.length == 0) {
                return globalService.responseError(res, "ไม่พบกระเป๋าเงินของระบบนี้ " + thisdata.system_name);
            }
            let itemreturn = {
                system_name: "",
                total_amt: 0,
                count: 0
            }
            itemreturn.system_name = thisdata.system_name;
            itemreturn.total_amt = sumResult[0].total_amt;
            itemreturn.count = sumResult[0].count;
            let withdraw_amt = Math.abs(this_wallet_t.trans_amt);
            if (withdraw_amt > itemreturn.total_amt) {
                return globalService.responseError(res, "ยอดเงินคงเหลือไม่พอถอน บัญชีมี: " + itemreturn.total_amt + " ต้องการถอน: " + withdraw_amt);
            }

            //--------------------
            var imgtodb = "";
            if (thisdata.admin_prove_withdraw_img_64 != "") {
                var imageprofiletolocaldisk = "";
                let fileName = thisdata.tel + "_" + new Date().getTime().toString() + "_" + globalService.randomString(3);

                imageprofiletolocaldisk = process.cwd() + '/public/admin_confirm_withdraw/' + fileName + '.png';
                var imageBuffer = globalService.decodeBase64Image(thisdata.admin_prove_withdraw_img_64);
                require('fs').writeFile(imageprofiletolocaldisk, imageBuffer.data, function () {
                    console.log('DEBUG - feed:message: Saved to disk image attached by user:', imageprofiletolocaldisk);
                });

                imgtodb = fileName + ".png";

            }

            this_wallet_t.admin_prove_withdraw_img_url = imgtodb;
            this_wallet_t.admin_give_back = req.decoded.username;
            this_wallet_t.status = "COMPLETE";
            this_wallet_t.save();

            return globalService.responseSuccess(res, "ตรวจสอบรายการถอนแล้ว นี่หมายความว่า Adminได้โอนเงินเข้าบัญชีผู้ใช้งานแล้ว", itemreturn);
        } catch (e) {
            globalService.dumpError(e);
            globalService.sendLineNotifyErr(req, globalService.getFullURL(req), globalService.getClientIP(req), e, "API", JSON.stringify(req.body));
            return globalService.responseError(res, e.stack);
        }
    });

    //admin อนุมัติการ swap wallet.
    route.post('/adminApproveSwap', async function (req, res) {
        try {
            const thisdata = req.body;
            if (globalService.checkParam(thisdata, 'swap_wallet_id', res) == false) { return };
            if (globalService.checkParam(thisdata, 'is_approve', res) == false) { return };


            let this_swap_wallet = await models.swap_wallets.findOne({ '_id': globalService.genMongoId(thisdata.swap_wallet_id) }, {}, { sort: { _id: 1 } });
            if (this_swap_wallet == null) {
                return globalService.responseError(res, "ไม่พบ ID นี้", {});
            }
            if (this_swap_wallet.status != "PENDING") {
                return globalService.responseError(res, "สถานะ ID นี้ถูก " + this_swap_wallet.status + "ไปแล้วโดย admin " + this_swap_wallet.admin_approve_by, {});
            }

            let this_wallet_old = await models.wallets.findOne({ 'tel': this_swap_wallet.old_tel, 'is_delete': false }, {}, { sort: { _id: 1 } });
            if (this_wallet_old == null) {
                return globalService.responseError(res, "ไม่พบชื่อบัญชีเบอร์ต้นทาง");
            }
            let this_wallet_new = await models.wallets.findOne({ 'tel': this_swap_wallet.new_tel, 'is_delete': false }, {}, { sort: { _id: 1 } });
            if (this_wallet_new == null) {
                return globalService.responseError(res, "ไม่พบชื่อบัญชีเบอร์ปลายทาง");
            }
            if (thisdata.is_approve == false) {
                this_swap_wallet.status = "REJECT";
                this_swap_wallet.admin_approve_by = req.decoded.username;
                this_swap_wallet.save();
                if (this_swap_wallet.url_callback != "") {
                    await globalService.callAPIThirdParty(this_swap_wallet.url_callback, this_swap_wallet, "1");
                }
                return globalService.responseSuccess(res, "ระบบไม่อนุมัติการโยกเงินจาก " + this_swap_wallet.old_tel + "ไปบวกเพิ่มที่เบอร์" + this_swap_wallet.new_tel, {});
            }

            let sumResult = await models.wallet_transactions.aggregate([
                { $match: { 'tel': this_swap_wallet.old_tel, 'status': 'COMPLETE', 'is_delete': false, 'is_enable': true } },
                {
                    $group: {
                        _id: {
                            "system": "$system"
                        },
                        total_amt: { $sum: "$trans_amt" },
                        count: { $sum: 1 }
                    }
                }
            ]);
            if (sumResult.length <= 0) {
                return globalService.responseError(res, "ไม่พบเงินในwallet ต้นทาง กรุณาrejectการ swapนี้ และแจ้งระบบย่อย", {});
            }
            if (sumResult[0].total_amt <= 0) {
                return globalService.responseError(res, "wallet ต้นทางมีเงิน 0บาท กรุณาrejectการ swapนี้ และแจ้งระบบย่อย", {});
            }
            let old_tel_amt = 0;
            let sumResult_new = await models.wallet_transactions.aggregate([
                { $match: { 'tel': this_swap_wallet.new_tel, 'status': 'COMPLETE', 'is_delete': false, 'is_enable': true } },
                {
                    $group: {
                        _id: {
                            "system": "$system"
                        },
                        total_amt: { $sum: "$trans_amt" },
                        count: { $sum: 1 }
                    }
                }
            ]);
            if (sumResult_new.length <= 0) {
                old_tel_amt = sumResult_new[0].total_amt;
            }

            let swap_amt = sumResult[0].total_amt;
            //----หักเป๋าเก่า
            let inv_ref_old_tel = await modelService.getOrderNo("SWAP_DEDUCT", 5);
            let new_item_old_tel = {
                wallet_id: this_wallet_old._id,
                swap_wallet_id: this_swap_wallet._id,
                tel: this_swap_wallet.old_tel,
                source: 'SWAP',//"QR, CREDIT, TRANSFER" เงินเข้า เงินออกจากแหล่งไหน
                system: this_swap_wallet.system_name,//"STN, BIRD_FLASH, YAAMO เงินข้าออกของระบบอะไร
                status: 'COMPLETE',//"PENDING" ทำรายการเข้ามาแต่ยังไม่เรียบร้อย เช่นqr จะต้องสร้าง record ตอนgen qr แต่สถานะเริ่มต้นเป็น "PENDING" หลังจากผู้เติมเงินแสกนจ่ายเรียบร้อย third party จะ callback กลับมาให้ตรวจว่า success มั้ยถ้าใช่ค่อยปรับตัวนีเป็น "COMPLETE"
                type: 'WITHDRAW',//"INCOME, EXPENSE, WITHDRAW"
                inv_ref: inv_ref_old_tel,//เลขที่อ้างอิง
                inv_ref_plus: "",
                ref_json: '',//ใช้เก็บสิ่งที่ third party ส่งกลับมาตอน callback
                trans_amt: swap_amt - (swap_amt * 2),//เงินที่เข้าออก เช่น +100, -50
                coin_amt: 0,//แต้มพิเศษอาจใช้ในอนาคต
                created_date: new Date().toISOString(),
                remark: "jeudtest",
                ip_create: globalService.getClientIP(req)
            }
            const resSave_old = await new models.wallet_transactions(new_item_old_tel).save();
            if (!resSave_old) {
                return globalService.responseError(res, "adminApproveSwap something went wrong", {});
            }
            //-----เติมเป๋าใหม่
            let inv_ref_new_tel = await modelService.getOrderNo("SWAP_TOPUP", 5);
            let new_item_new_tel = {
                wallet_id: this_wallet_new._id,
                swap_wallet_id: this_swap_wallet._id,
                tel: this_swap_wallet.new_tel,
                source: 'SWAP',//"QR, CREDIT, TRANSFER" เงินเข้า เงินออกจากแหล่งไหน
                system: this_swap_wallet.system_name,//"STN, BIRD_FLASH, YAAMO เงินข้าออกของระบบอะไร
                status: 'COMPLETE',//"PENDING" ทำรายการเข้ามาแต่ยังไม่เรียบร้อย เช่นqr จะต้องสร้าง record ตอนgen qr แต่สถานะเริ่มต้นเป็น "PENDING" หลังจากผู้เติมเงินแสกนจ่ายเรียบร้อย third party จะ callback กลับมาให้ตรวจว่า success มั้ยถ้าใช่ค่อยปรับตัวนีเป็น "COMPLETE"
                type: 'INCOME',//"INCOME, EXPENSE, WITHDRAW"
                inv_ref: inv_ref_new_tel,//เลขที่อ้างอิง
                inv_ref_plus: "",
                ref_json: '',//ใช้เก็บสิ่งที่ third party ส่งกลับมาตอน callback
                trans_amt: swap_amt,//เงินที่เข้าออก เช่น +100, -50
                coin_amt: 0,//แต้มพิเศษอาจใช้ในอนาคต
                created_date: new Date().toISOString(),
                remark: "jeudtest",
                ip_create: globalService.getClientIP(req)
            }
            const resSave_new = await new models.wallet_transactions(new_item_new_tel).save();
            if (!resSave_new) {
                await globalService.sendLineNotifyErr(req, globalService.getFullURL(req), globalService.getClientIP(req), "Critical error ***ระบบ" + this_swap_wallet.system_name + " ได้หักเงินออกจาก[" + this_swap_wallet.old_tel + "]แล้ว แต่ไม่สามารถเติมเข้า[" + this_swap_wallet.new_tel + "]ได้", "API", JSON.stringify(req.body));
                return globalService.responseError(res, "adminApproveSwap something went wrong", {});
            }

            this_swap_wallet.swap_amt = swap_amt;
            this_swap_wallet.status = "COMPLETE";
            this_swap_wallet.admin_approve_by = req.decoded.username;
            this_swap_wallet.save();
            if (this_swap_wallet.url_callback != "") {
                await globalService.callAPIThirdParty(this_swap_wallet.url_callback, this_swap_wallet, "0");
            }

            return globalService.responseSuccess(res, "ระบบทำการโยกเงินเรียบร้อยโดยย้ายจาก " + this_swap_wallet.old_tel + "ไปบวกเพิ่มที่เบอร์" + this_swap_wallet.new_tel + " เป็นจำนวนเงิน" + swap_amt + "บาท", this_swap_wallet);
        } catch (e) {
            globalService.dumpError(e);
            globalService.sendLineNotifyErr(req, globalService.getFullURL(req), globalService.getClientIP(req), e, "API", JSON.stringify(req.body));
            return globalService.responseError(res, e.stack);
        }
    });

    //ยกเลิกใช้งาน
    route.post('/adminApproveGiveBack', async function (req, res) {
        try {
            const thisdata = req.body;
            if (globalService.checkParam(thisdata, 'inv_ref', res) == false) { return };//shop inv_ref
            if (globalService.checkParam(thisdata, 'sub_inv_ref', res) == false) { return };
            if (globalService.checkParam(thisdata, 'system_name', res) == false) { return };
            if (globalService.checkParam(thisdata, 'admin_prove_giveback_img_64', res) == false) { return };//รูปหลักฐานการโอนคืน b64

            let this_shop_t = await models.shop_transactions.findOne({ 'system': thisdata.system_name, 'inv_ref': thisdata.inv_ref, 'sub_inv_ref': thisdata.sub_inv_ref }, {}, { sort: { _id: 1 } });
            if (this_shop_t == null) {
                return globalService.responseError(res, "ไม่พบ shop_transaction นี้", {});
            }
            if (this_shop_t.is_give_back == true) {
                return globalService.responseError(res, "shop_transaction นี้ Admin โอนเงินค่าสินค้าคืนไปแล้วเมื่อ " + this_shop_t.give_back_date, {});
            }

            //--------------------
            var imgtodb = "";
            if (thisdata.admin_prove_giveback_img_64 != "") {
                var imageprofiletolocaldisk = "";
                let fileName = thisdata.inv_ref + "_" + new Date().getTime().toString() + "_" + globalService.randomString(3);

                imageprofiletolocaldisk = process.cwd() + '/public/admin_confirm_giveback/' + fileName + '.png';
                var imageBuffer = globalService.decodeBase64Image(thisdata.admin_prove_giveback_img_64);
                require('fs').writeFile(imageprofiletolocaldisk, imageBuffer.data, function () {
                    console.log('DEBUG - feed:message: Saved to disk image attached by user:', imageprofiletolocaldisk);
                });

                imgtodb = fileName + ".png";

            }
            this_shop_t.give_back_date = new Date().toISOString();
            this_shop_t.is_give_back = true;
            this_shop_t.admin_give_back = req.decoded.username;
            this_shop_t.admin_prove_giveback_img_url = imgtodb;
            this_shop_t.save();

            return globalService.responseSuccess(res, "adminApproveGiveBack ok", {});
        } catch (e) {
            globalService.dumpError(e);
            globalService.sendLineNotifyErr(req, globalService.getFullURL(req), globalService.getClientIP(req), e, "API", JSON.stringify(req.body));
            return globalService.responseError(res, e.stack);
        }
    });

    route.post('/adminProveGiveBack', async function (req, res) {
        try {
            const thisdata = req.body;
            if (globalService.checkParam(thisdata, 'withdraw_t_id', res) == false) { return };
            if (globalService.checkParam(thisdata, 'system_name', res) == false) { return };
            if (globalService.checkParam(thisdata, 'admin_prove_giveback_img_64', res) == false) { return };//รูปหลักฐานการโอนคืน b64
            if (globalService.checkParam(thisdata, 'transfer_ref', res) == false) { return };
            if (globalService.checkParam(thisdata, 'remark', res) == false) { return };

            let this_withdraw_t = await models.withdraw_transactions.findOne({ 'system': thisdata.system_name, '_id': globalService.genMongoId(thisdata.withdraw_t_id) }, {}, { sort: { _id: 1 } });
            if (this_withdraw_t == null) {
                return globalService.responseError(res, "ไม่พบ withdraw_transaction นี้", {});
            }
            if (this_withdraw_t.is_withdraw == true) {
                return globalService.responseError(res, "withdraw_transaction นี้ Admin โอนเงินค่าสินค้าคืนไปแล้วเมื่อ " + this_withdraw_t.withdraw_date, {});
            }

            //--------------------
            var imgtodb = "";
            if (thisdata.admin_prove_giveback_img_64 != "") {
                var imageprofiletolocaldisk = "";
                let fileName = thisdata.withdraw_t_id + "_" + new Date().getTime().toString() + "_" + globalService.randomString(3);

                imageprofiletolocaldisk = process.cwd() + '/public/admin_confirm_giveback/' + fileName + '.png';
                var imageBuffer = globalService.decodeBase64Image(thisdata.admin_prove_giveback_img_64);
                require('fs').writeFile(imageprofiletolocaldisk, imageBuffer.data, function () {
                    console.log('DEBUG - feed:message: Saved to disk image attached by user:', imageprofiletolocaldisk);
                });

                imgtodb = fileName + ".png";

            }
            this_withdraw_t.withdraw_date = new Date().toISOString();
            this_withdraw_t.is_withdraw = true;
            this_withdraw_t.admin_withdraw = req.decoded.username;
            if (imgtodb != "") {
                let new_item = {
                    img_url : imgtodb,
                    push_date: new Date().toISOString()
                }
                this_withdraw_t.slip_img_list.push(new_item);
            }

            this_withdraw_t.transfer_ref = thisdata.transfer_ref;
            this_withdraw_t.remark = thisdata.remark;
            await this_withdraw_t.save();

            return globalService.responseSuccess(res, "adminProveGiveBack ok", this_withdraw_t);
        } catch (e) {
            globalService.dumpError(e);
            globalService.sendLineNotifyErr(req, globalService.getFullURL(req), globalService.getClientIP(req), e, "API", JSON.stringify(req.body));
            return globalService.responseError(res, e.stack);
        }
    });

    route.post('/adminEditProveGiveBack', async function (req, res) {
        try {
            const thisdata = req.body;
            if (globalService.checkParam(thisdata, 'withdraw_t_id', res) == false) { return };
            if (globalService.checkParam(thisdata, 'system_name', res) == false) { return };
            if (globalService.checkParam(thisdata, 'admin_prove_giveback_img_64', res) == false) { return };//รูปหลักฐานการโอนคืน b64
            // if (globalService.checkParam(thisdata, 'transfer_ref', res) == false) { return };
            if (globalService.checkParam(thisdata, 'remark', res) == false) { return };

            let this_withdraw_t = await models.withdraw_transactions.findOne({ 'system': thisdata.system_name, '_id': globalService.genMongoId(thisdata.withdraw_t_id) }, {}, { sort: { _id: 1 } });
            if (this_withdraw_t == null) {
                return globalService.responseError(res, "ไม่พบ withdraw_transaction นี้", {});
            }
            // if (this_withdraw_t.is_withdraw == true) {
            //     return globalService.responseError(res, "withdraw_transaction นี้ Admin โอนเงินค่าสินค้าคืนไปแล้วเมื่อ " + this_withdraw_t.withdraw_date, {});
            // }
            if (this_withdraw_t.admin_withdraw != req.decoded.username) {
                return globalService.responseError(res, "ต้องเป็น admin คนเดิมที่เคย Prove การเบิกนี้เท่านั้น จึงสามารถเพิ่มรูป slip และแก้ไข remark ได้", {});
            }

            //--------------------
            var imgtodb = "";
            if (thisdata.admin_prove_giveback_img_64 != "") {
                var imageprofiletolocaldisk = "";
                let fileName = thisdata.inv_ref + "_" + new Date().getTime().toString() + "_" + globalService.randomString(3);

                imageprofiletolocaldisk = process.cwd() + '/public/admin_confirm_giveback/' + fileName + '.png';
                var imageBuffer = globalService.decodeBase64Image(thisdata.admin_prove_giveback_img_64);
                require('fs').writeFile(imageprofiletolocaldisk, imageBuffer.data, function () {
                    console.log('DEBUG - feed:message: Saved to disk image attached by user:', imageprofiletolocaldisk);
                });

                imgtodb = fileName + ".png";

            }
            // this_withdraw_t.withdraw_date = new Date().toISOString();
            // this_withdraw_t.is_withdraw = true;
            // this_withdraw_t.admin_withdraw = req.decoded.username;
            if (imgtodb != "") {
                this_withdraw_t.slip_img_list.push(imgtodb);
            }
            // this_withdraw_t.transfer_ref = thisdata.transfer_ref;
            this_withdraw_t.remark = thisdata.remark;
            this_withdraw_t.save();

            return globalService.responseSuccess(res, "adminEditProveGiveBack ok", this_withdraw_t);
        } catch (e) {
            globalService.dumpError(e);
            globalService.sendLineNotifyErr(req, globalService.getFullURL(req), globalService.getClientIP(req), e, "API", JSON.stringify(req.body));
            return globalService.responseError(res, e.stack);
        }
    });

    //แก้ไขเบอร์ข้อมูล wallet(user profile) ของทุกระบบ
    route.post('/userUpdateProfileByWalletId', async function (req, res) {
        try {
            const thisdata = req.body;
            if (globalService.checkParam(thisdata, 'wallet_id', res) == false) { return };
            if (globalService.checkParam(thisdata, 'tel', res) == false) { return };
            if (globalService.checkParam(thisdata, 'account_name', res) == false) { return };
            if (globalService.checkParam(thisdata, 'email', res) == false) { return };

            if (thisdata.tel == "" || thisdata.account_name == "" || thisdata.email == "") {
                return globalService.responseError(res, "tel, account_name, email ไม่สามารถเป็นค่าว่างได้ กรุณาตรวจสอบ", {});
            }
            let this_wallet = await models.wallets.findOne({ '_id': globalService.genMongoId(thisdata.wallet_id), is_delete: false }, {}, { sort: { _id: 1 } });
            if (this_wallet == null) {
                return globalService.responseError(res, "ไม่พบ profile ของ wallet_id: " + thisdata.wallet_id + " กรุณาตรวจสอบ", {});
            }
            let new_update_detail = {
                change_date: new Date().toISOString(),
                old: {
                    tel: this_wallet.tel,
                    account_name: this_wallet.account_name,
                    email: this_wallet.email
                },
                new: {
                    tel: thisdata.tel,
                    account_name: thisdata.account_name,
                    email: thisdata.email
                }
            }
            if (this_wallet.update_detail == null) {
                this_wallet.update_detail = [];
            }
            this_wallet.update_detail.push(new_update_detail);
            this_wallet.tel = thisdata.tel;
            this_wallet.account_name = thisdata.account_name;
            this_wallet.email = thisdata.email;
            this_wallet.save();

            return globalService.responseSuccess(res, "ระบบได้ปรับเปลี่ยน tel, account_name, email ของ wallet_id: " + thisdata.wallet_id + " เรียบร้อยแล้ว", {});
        } catch (e) {
            globalService.dumpError(e);
            globalService.sendLineNotifyErr(req, globalService.getFullURL(req), globalService.getClientIP(req), e, "API", JSON.stringify(req.body));
            return globalService.responseError(res, e.stack);
        }
    });

    route.post('/userAdminChangePassword', async function (req, res) {
        try {
            const thisdata = req.body;
            // if (globalService.checkParam(thisdata, 'username', res) == false) { return };
            if (globalService.checkParam(thisdata, 'oldpassword', res) == false) { return };
            if (globalService.checkParam(thisdata, 'newpassword', res) == false) { return };
            if (globalService.checkParam(thisdata, 'confirmpassword', res) == false) { return };

            if (thisdata.newpassword != thisdata.confirmpassword) {
                return globalService.responseError(res, "รหัสผ่านใหม่และรหัสผ่านยืนยันไม่ตรงกัน");
            }

            let old_pwd_md5 = globalService.md5(thisdata.oldpassword);
            let this_admin = await models.admin_users.findOne({ 'username': req.decoded.username, 'password': old_pwd_md5, 'is_delete': false, 'is_enable': true }, {}, { sort: { _id: 1 } });
            if (this_admin == null) {
                return globalService.responseError(res, "รหัสผ่านเดิมไม่ถูกต้อง");
            }

            let new_pwd_md5 = globalService.md5(thisdata.newpassword);
            this_admin.password = new_pwd_md5;
            this_admin.save();

            return globalService.responseSuccess(res, "ระบบได้ปรับเปลี่ยนรหัสผ่านของ admin username: " + req.decoded.username + " เรียบร้อยแล้ว", {});
        } catch (e) {
            globalService.dumpError(e);
            globalService.sendLineNotifyErr(req, globalService.getFullURL(req), globalService.getClientIP(req), e, "API", JSON.stringify(req.body));
            return globalService.responseError(res, e.stack);
        }
    });

    route.post('/adminLogout', async function (req, res) {
        try {
            const thisdata = req.body;
            if (globalService.checkParam(thisdata, 'username', res) == false) { return };

            let this_admin = await models.admin_users.findOne({ 'username': thisdata.username, 'is_delete': false, 'is_enable': true }, {}, { sort: { _id: 1 } });
            if (this_admin == null) {
                return globalService.responseError(res, "user not found");
            }
            this_admin.jwt_token = "";
            this_admin.save();

            return globalService.responseSuccess(res, "adminLogout ok", {});
        } catch (e) {
            globalService.dumpError(e);
            globalService.sendLineNotifyErr(req, globalService.getFullURL(req), globalService.getClientIP(req), e, "API", JSON.stringify(req.body));
            return globalService.responseError(res, e.stack);
        }
    });
}

