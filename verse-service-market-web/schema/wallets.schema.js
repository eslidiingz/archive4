const mongoose = require('mongoose')
let ObjectId = require('mongoose').Types.ObjectId;

const WalletsSchema = new mongoose.Schema({
    tel: { type: String, default: '' },
    email: { type: String, default: '' },
    account_name: { type: String, default: '' },
    balance: { type: Number, default: 0 },
    coin_balance: { type: Number, default: 0 },
    image_url: { type: String, default: '' },
    remark: { type: String, default: '' },
    lasted_os: { type: String, default: 'android' },
    device_token: { type: String, default: '' },//เอาไว้ส่ง push noti
    otp_ref: { type: String, default: '' },//ใช้ตอนขอ otp

    system_name_in_use: [{//ชื่อระบบไหนที่ไม่มีในนี้คือยังไม่ผ่านการลงทะเบียน กรณีที่ระบบนั้นๆต้องการการลงทะเบียนก่อนจะไม่สามารถใช้งานได้
        system_name: { type: String, default: '' },//STN, BIRD_FLASH, YAAMO
        register_date: { type: Date, default: null },
        is_kyc: { type: Boolean, default: false },//ยังไม่ใช้ ถ้ามียิง api userKYCBankAccount จะเป็น true คือสามารถถอนได้
        bank_detail: {//ยังไม่ใช้
            bank_code: { type: String, default: '' },
            bank_name: { type: String, default: '' },
            account_no: { type: String, default: '' },
            account_name: { type: String, default: '' },
            bank_branch_name: { type: String, default: '' },
            front_book_image_url: { type: String, default: '' },
            // is_verify : { type: Boolean, default: false },
            // verify_by : { type: String, default: '' },
            // verify_comment : { type: String, default: '' },
        },
    }],

    update_detail: [{ //เก็บรายละเอียดการเปลี่ยน tel, account, email
        change_date: { type: Date, default: null },
        old: {
            tel: { type: String, default: '' },
            account_name: { type: String, default: '' },
            email: { type: String, default: '' }
        },
        new: {
            tel: { type: String, default: '' },
            account_name: { type: String, default: '' },
            email: { type: String, default: '' }
        }
    }],

    is_delete: { type: Boolean, default: false },
    is_enable: { type: Boolean, default: true },
    created_date: { type: Date, default: null },
    created_by: { type: String, default: '' },
    updated_date: { type: Date, default: null },
    updated_by: { type: String, default: '' },
})


const walletModel = mongoose.model('wallets', WalletsSchema)
module.exports = walletModel