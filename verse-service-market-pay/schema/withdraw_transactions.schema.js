const mongoose = require('mongoose')
let ObjectId = require('mongoose').Types.ObjectId;

//ใช้สำหรับร้านค้าเบิกเงินที่ขายของได้ออก โดยจะรวบบิลย่อยเป็นชุดแล้วระบุบัญชีที่ต้องการโอน
const Withdraw_TransactionsSchema = new mongoose.Schema({
    withdraw_no: { type: String, default: '' },//เก็บเลขที่ gen unique text
    shop_tel: { type: String, default: '' },
    wallet_id: { type: ObjectId, default: null },//ของร้าน
    system : { type: String, default: '' },
    sum_real_amt: { type: Number, default: 0 },
    inv_ref_list: [{//บิลย่อยและเงินคงเหลือจากการ refund
        inv_ref : { type: String, default: '' },
        sub_inv_ref : { type: String, default: '' },
        real_amt : { type: Number, default: 0 }
    }],
    bank_detail: {
        bank_code: { type: String, default: '' },
        bank_name: { type: String, default: '' },
        account_no: { type: String, default: '' },
        account_name: { type: String, default: '' },
        bank_branch_name: { type: String, default: '' }
    },
    is_withdraw: { type: Boolean, default: false },
    admin_withdraw: { type: String, default: '' },
    withdraw_date: { type: Date, default: null },
    slip_img_list:[{//slip หลักฐานโอนเงินให้ร้าน
        img_url : { type: String, default: '' },
        push_date :{ type: Date, default: null }
    }],
    transfer_ref : { type: String, default: '' },
    remark: { type: String, default: '' },//admin ผู้ทำคนเดิมสามารถแก้ไขได้

    is_delete: { type: Boolean, default: false },
    is_enable: { type: Boolean, default: true },
    created_date: { type: Date, default: null },
    created_by: { type: String, default: '' },
    updated_date: { type: Date, default: null },
    updated_by: { type: String, default: '' },
})


const withdrawTransactionModel = mongoose.model('withdraw_transactions', Withdraw_TransactionsSchema)
module.exports = withdrawTransactionModel