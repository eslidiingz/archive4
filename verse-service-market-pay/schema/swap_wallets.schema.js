const mongoose = require('mongoose')
let ObjectId = require('mongoose').Types.ObjectId;

//เอาไว้ย้ายเงินจาก tel เดิม ไปtel ใหม่ แยกตาม system_name
//ไม่สนว่าเบอร์ใหม่มีเงินเท่าไหร่ จะไปบวกเพิ่มเลย
const SwapWalletsSchema = new mongoose.Schema({
    system_name : { type: String, default: "" },
    ori_tel: { type: String, default: "" }, 
    des_tel : { type: String, default: "" },
    des_wallet_balance_before : { type: Number, default: 0 },//ยอดเงินของ new_tel ก่อน swap ระบบใส่ให้ตอน admin approve
    swap_amt :  { type: Number, default: 0 },//ต้องแจ้งไม่ต้องส่งมา จะได้ตัวเลขตอน admin approve ว่า swap ไปเท่าไหร่
    
    remark : { type: String, default: "" },
    url_callback : { type: String, default: "" },//ใช่ยิงกลับไประบบย่อยเมื่อ admin approve ถ้าไม่ใส่มาคือไม่ยิง

    status: {type: String, default: 'PENDING'},//admin approve จะเป็น COMPLETE ถ้าไม่จะเป็น REJECT
    admin_approve_by : { type: String, default: "" },

    is_delete: { type: Boolean, default: false },
    is_enable: { type: Boolean, default: true },
    created_date: { type: Date, default: null },
    created_by: { type: String, default: '' },
    updated_date: { type: Date, default: null },
    updated_by: { type: String, default: '' },
})


const swapWalletModel = mongoose.model('swap_wallets', SwapWalletsSchema)
module.exports = swapWalletModel