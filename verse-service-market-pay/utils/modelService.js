module.exports = function (models, globalService) {
    var modelService = {
        getOrderNo: async function (method, digitGen = 5, system_name = "TEST") {
            //S{YY}{MM}{DD}{Random 6 Digit}{DIGIT 1}
            let orderNo = ""
            let d = new Date();
            let year = (d.getFullYear() + 543).toString();
            let subYear = year.substr(2, 3)
            let month = (d.getMonth() + 1).toString()
            month = month.padStart(2, '0')
            let day = d.getDate().toString()
            day = day.padStart(2, '0')
            let digit = Math.floor(Math.random() * (9 - 0 + 1)) + 0;
            let maxOrderNo = ""
            let running = ""
            let preFixOrderNo = "";
            switch (method) {
                case 'SCAN':
                    preFixOrderNo = 'S' + subYear + month + day
                    break;
                case 'APP_INSURANCE':
                    preFixOrderNo = 'APP-' + subYear + month + day
                    break;
                case 'YAAMO':
                    preFixOrderNo = 'FD' + subYear + month + day
                    break;
                case 'QR_TOPUP':
                    preFixOrderNo = 'QRT' + subYear + month + day
                    break;
                case 'USER_WITHDRAW':
                    preFixOrderNo = 'UWD' + subYear + month + day
                    break;
                case 'CREDIT_TOPUP':
                    preFixOrderNo = 'CDT' + subYear + month + day
                    break;
                case 'REFUND_WALLET':
                    preFixOrderNo = 'REW' + subYear + month + day
                    break;
                case 'SWAP_TOPUP':
                    preFixOrderNo = 'SWT' + subYear + month + day
                    break;
                case 'SWAP_DEDUCT':
                    preFixOrderNo = 'SWD' + subYear + month + day
                    break;
                case 'WITHDRAW_NO':
                    preFixOrderNo = 'WDN' + subYear + month + day
                    break;
            }

            preFixOrderNo = '' + preFixOrderNo;
            let startCut = 0;
            let transNo = {}
            if (method == "SCAN") {
                startCut = 7;
                //S640514000033
                transNo = await models.ScanOffering.aggregate([
                    { $match: { scan_no: { $regex: preFixOrderNo + ".*" } } },
                    { $sort: { _id: -1 } },
                    { $limit: 1 },
                    { $project: { _id: 0, trans_no: "$scan_no" } }
                ])
            } else if (method == "APP_INSURANCE") {
                startCut = 10;
                //APP-640514000033
                transNo = await models.policys.aggregate([
                    { $match: { "application_no": { $regex: preFixOrderNo + ".*" } } },
                    { $project: { _id: 0, trans_no: "$application_no" } },
                    { $sort: { trans_no: -1 } },
                    { $limit: 1 },
                ])
            } else if (method == "YAAMO") {
                //FD640514000033
                startCut = 8;
                let order_data = await globalService.postgresCon(`SELECT "ORDER_NO" as trans_no
                FROM public."ORDER_T"
                ORDER BY "ID" DESC `);
                transNo = order_data.rows;

            } else if (method == "QR_TOPUP") { //เติมเงิน qr scan scb
                startCut = 9;
                //QRT640514000033
                transNo = await models.wallet_transactions.aggregate([
                    { $match: { "system": system_name } },
                    { $match: { "source": "QR", "type": "INCOME" } },
                    { $match: { "inv_ref": { $regex: preFixOrderNo + ".*" } } },
                    { $project: { _id: 0, trans_no: "$inv_ref" } },
                    { $sort: { trans_no: -1 } },
                    { $limit: 1 },
                ])
            } else if (method == "USER_WITHDRAW") { //ถอนเงิน
                startCut = 9;
                //UDW640514000033
                transNo = await models.wallet_transactions.aggregate([
                    { $match: { "system": system_name } },
                    { $match: { "type": "WITHDRAW" } },
                    { $match: { "inv_ref": { $regex: preFixOrderNo + ".*" } } },
                    { $project: { _id: 0, trans_no: "$inv_ref" } },
                    { $sort: { trans_no: -1 } },
                    { $limit: 1 },
                ])
            } else if (method == "CREDIT_TOPUP") { //เติมเงิน wallet ด้วยบัตรเครดิต
                startCut = 9;
                //CDT640514000033
                transNo = await models.wallet_transactions.aggregate([
                    { $match: { "system": system_name } },
                    { $match: { "source": "CREDIT", "type": "INCOME" } },
                    { $match: { "inv_ref": { $regex: preFixOrderNo + ".*" } } },
                    { $project: { _id: 0, trans_no: "$inv_ref" } },
                    { $sort: { trans_no: -1 } },
                    { $limit: 1 },
                ])
            } else if (method == "REFUND_WALLET") { //refund เงินเข้า wallet
                startCut = 9;
                //REW640514000033
                transNo = await models.wallet_transactions.aggregate([
                    { $match: { "system": system_name } },
                    { $match: { "source": "REFUND", "type": "INCOME" } },
                    { $match: { "inv_ref": { $regex: preFixOrderNo + ".*" } } },
                    { $project: { _id: 0, trans_no: "$inv_ref" } },
                    { $sort: { trans_no: -1 } },
                    { $limit: 1 },
                ])
            } else if (method == "SWAP_TOPUP") { //swap เงินเข้า wallet
                startCut = 9;
                //SWT640514000033
                transNo = await models.wallet_transactions.aggregate([
                    { $match: { "system": system_name } },
                    { $match: { "source": "SWAP", "type": "INCOME" } },
                    { $match: { "inv_ref": { $regex: preFixOrderNo + ".*" } } },
                    { $project: { _id: 0, trans_no: "$inv_ref" } },
                    { $sort: { trans_no: -1 } },
                    { $limit: 1 },
                ])
            } else if (method == "SWAP_DEDUCT") { //swap เงินออก wallet
                startCut = 9;
                //SWD640514000033
                transNo = await models.wallet_transactions.aggregate([
                    { $match: { "system": system_name } },
                    { $match: { "source": "SWAP", "type": "WITHDRAW" } },
                    { $match: { "inv_ref": { $regex: preFixOrderNo + ".*" } } },
                    { $project: { _id: 0, trans_no: "$inv_ref" } },
                    { $sort: { trans_no: -1 } },
                    { $limit: 1 },
                ])
            }
            else if (method == "WITHDRAW_NO") { //swap เงินออก wallet
                startCut = 9;
                //WDN640514000033
                transNo = await models.withdraw_transactions.aggregate([
                    { $match: { "system": system_name } },
                    { $match: { "withdraw_no": { $regex: preFixOrderNo + ".*" } } },
                    { $project: { _id: 0, trans_no: "$withdraw_no" } },
                    { $sort: { trans_no: -1 } },
                    { $limit: 1 },
                ])
            }
            // console.log("preFixOrderNo: ", preFixOrderNo);
            if (transNo.length == 0) {
                let no = "1"
                running = no.padStart(digitGen, '0')
            } else {
                maxOrderNo = (transNo[0].trans_no).toString();
                let lastRunningNo = maxOrderNo.substr(startCut, digitGen) //ตำแหน่งที่เริ่มตน , จำนวนตัวเลข
                console.log("last: " + lastRunningNo);
                let no = (parseInt(lastRunningNo) + 1).toString()
                running = no.padStart(digitGen, '0')
            }


            orderNo = preFixOrderNo + running + digit
            return orderNo;
        },
        checkTokenSecKey: async function (req, res, this_sys) {
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, token, sec_token");
            var sec_token = req.headers['sec_token'];
            if (this_sys.system_name == "TEST" || this_sys.system_name == "KK" || this_sys.system_name == "STNV4" || this_sys.system_name == "FASMALL" || this_sys.system_name == "CNB" ) {
                return {
                    is_ok: true,
                    time_code: "",
                    time_result: ""
                }
            }

            //----------
            if (sec_token == undefined) {
                return {
                    is_ok: false,
                    time_code: "",
                    time_result: ""
                }
            }
            let result = globalService.deCodeAES(sec_token, this_sys.sec_key);
            // console.log("aa ", sec_token);
            let last_item = new Date();
            var d = new Date();
            d.setTime(result);
            let itemreturn = {
                is_ok: true,
                time_code: result,
                time_result: d
            }
            if (new Date().getTime() - result > 60000) {
                itemreturn.is_ok = false
            }
            return itemreturn;
        }
    }

    return modelService;
}
