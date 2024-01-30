const mongoose = require('mongoose')
let ObjectId = require('mongoose').Types.ObjectId;

//กระเป๋าเงินฝาก ซื้อของเท่านั้น(ยังไม่เปิดให้ถอนเงิน)
//เก็บรายการชำระค่าสินค้าโดยตัดเงินจากกระเป๋า ,รายการเงินเข้าจากการ refund, รายการเติมเงินจาก [QR/Credit]
const Wallet_TransectionsSchema = new mongoose.Schema({
    wallet_id: { type: ObjectId, default: null },
    tel: { type: String, default: '' },
    account_name: { type: String, default: '' },//เก็บสดทุกครั้งที่ส่งมา
    email : { type: String, default: '' },//เก็บสดทุกครั้งที่ส่งมา
    
    source: { type: String, default: '' },//"QR, CREDIT, REFUND, SWAP" เงินเข้า จากแหล่งไหน ถ้าเงินออกเป็น''
    system: { type: String, default: 'TEST' },//"STN, BIRD_FLASH, YAAMO เงินข้าออกของระบบอะไร
    status: {type: String, default: 'PENDING'},//"PENDING" ทำรายการเข้ามาแต่ยังไม่เรียบร้อย เช่นqr จะต้องสร้าง record ตอนgen qr แต่สถานะเริ่มต้นเป็น "PENDING" หลังจากผู้เติมเงินแสกนจ่ายเรียบร้อย third party จะ callback กลับมาให้ตรวจว่า success มั้ยถ้าใช่ค่อยปรับตัวนีเป็น "COMPLETE"
    type: { type: String, default: '' },//"INCOME, EXPENSE, WITHDRAW" ถ้าเป็นข้อมูลจากการ refund ให้ใช้ INCOME
    inv_ref: { type: String, default: '' },//เลขที่อ้างอิง
    inv_ref_plus: { type: String, default: '' },//เลขที่อ้างอิง+system_name เอาไว้ส่ง third party payment gateway ที่ต้องเป็น unique
    ref_json : { type: String, default: '' },//ใช้เก็บสิ่งที่ third party ส่งกลับมาตอน callback
    paid_third_party_date : { type: Date, default: null },//เวลาที่ชำระเงินกับ third party
    inv_ref_of_refund : { type: String, default: '' },//ใช้กรณี refund จะต้องใส่ inv_ref ตัวที่ถูก refund ที่นี่
    sub_inv_ref_of_refund : { type: String, default: '' },
    swap_wallet_id: { type: ObjectId, default: null },//ใช้กรณี swap เก็บ id จาก tb.swap_wallets
    trans_amt: {type: Number, default: 0},//เงินที่เข้าออก เช่น +100, -50
    charge_fee_per: {type: Number, default: 0},//เก็บค่า config การ charge ณ.ขณะนั้นจาก db
    charge_fee_amt: {type: Number, default: 0},//ค่าบริการ อาจจะบวกเพื่มกรณีเติมเงินด้วยบัตร เงินส่วนนี้บวกเพิ่มต่างหากเข้าระบบ ไม่จ่ายคืนระบบย่อย
    coin_amt: {type: Number, default: 0},//แต้มพิเศษอาจใช้ในอนาคต
    link_pay : { type: String, default: '' },//เก็บข้อมูลที่ได้จากการทำจ่าย

    sub_inv_ref_list : [{ //ใช้เก็บ inv_ref ย่อย ใช้สำหรับ userExpense ว่าแต่ละร้านมีซื้อไปเท่าไหร่
        shop_tel : { type: String, default: '' },
        shop_wallet_id: { type: ObjectId, default: null },
        sub_inv_ref : { type: String, default: '' }, //"A"
        amt : { type: Number, default: 0 },//บวกเท่านั้น
        system_name : { type: String, default: '' }
    }],


    //ส่วนถอนเงินฝากคืนผู้ใช้(ไม่ใช้ก่อน ไม่มีการถอนเงินจากเงินฝาก)
    bank_detail :{//ข้อมูลบัญชีผู้ใช้สำหรับโอน เอาไว้สำหรับ process ถอนเงินฝากให้ผู้ใช้
        bank_code : { type: String, default: '' },
        bank_name : { type: String, default: '' },
        account_no : { type: String, default: '' },
        account_name : { type: String, default: '' },
        bank_branch_name : { type: String, default: '' },
    },
    is_give_back :{ type: Boolean, default: false },//โอนเงินถอนคืนผู้ใช้ไปแล้ว
    give_back_date: { type: Date, default: null },//โอนคืนผู้ใช้วันที่วันที่
    admin_give_back: {type: String, default: '' },//admin ผู้ทำการโอนเงินเข้าบชผู้ใช้
    admin_prove_withdraw_img_url : {type: String, default: '' },


    remark: {type: String, default: '' },
    ip_create: { type: String, default: '' },
    is_delete: { type: Boolean, default: false },
    is_enable: { type: Boolean, default: true },
    created_date: { type: Date, default: null },
    created_by: { type: String, default: '' },
    updated_date: { type: Date, default: null },
    updated_by: { type: String, default: '' },
})
//ในนี้เก็บ transaction เงินเข้าออกของ wallet 

//กรณีทำรายการถอนเงินฝาก ***ขณะนี้ยังไม่อนุญาตให้ถอนเงินฝากได้
//เงินที่ต้องถอนโอนคืนผู้ใช้ select จาก wallet โดย sum pay_amtทั้งหมดที่ type:WITHDRAW และ status:PENDING
//โอนคืนผู้ใช้แล้ว status จะเป็น COMPLETE
const walletTransectionModel = mongoose.model('wallet_transactions', Wallet_TransectionsSchema)
module.exports = walletTransectionModel