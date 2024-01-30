const mongoose = require('mongoose')
let ObjectId = require('mongoose').Types.ObjectId;

const System_nameSchema = new mongoose.Schema({
    system_name: { type: String, default: '' },//STN, BIRD_FLASH, YAAMO
    system_ip: { type: String, default: '' },//ip ที่สามารถยิง api ถอนเงินและ ใช้ wallet ชำระค่าสินค้า เพื่อความปลอดภัย ถ้า system_name ไม่ใช่ TEST จะต้องตรวจสอบ ip
    full_name: { type: String, default: '' },
    remark: { type: String, default: '' },
    sec_key: { type: String, default: '' },//รหัสที่เอาไว้ทำ enCodeAES เพื่อยิง api sensitive
    email: { type: String, default: '' },//เก็บเมล์ที่ต้องการให้ส่งข้อมูลกลับไป เช่นข้อมูลสรุปการโอนเงินคืน
    callback_qr_pay: { type: String, default: '' },//เก็บ url callback
    callback_credit_pay: { type: String, default: '' },//เก็บ url callback
    redirect_url_credit_pay: { type: String, default: '' },//เก็บ web page ที่ต้องการให้ redirect ไปเมื่อชำระเงินสำเร็จ
    is_pay_qr: { type: Boolean, default: true },//สามารถจ่ายผ่าน qr
    is_pay_credit: { type: Boolean, default: true },//สามารถจ่ายผ่าน credit
    is_topup_qr: { type: Boolean, default: true },//สามารถเติมผ่าน qr
    is_topup_credit: { type: Boolean, default: true },//สามารถเติมผ่าน credit
    is_wallet_withdraw: { type: Boolean, default: true },//เปิดให้ผู้ใช้ถอนเงินจากกระเป๋าได้
    is_need_for_register: { type: Boolean, default: false },//ผู้ใช้ต้องลงทะเบียนและ OTP ก่อนจึงใช้งานได้
    bank_account: {//ข้อมูลธนาคาร เอาไว้โอนเงินคืนระบบย่อย
        bank_name: { type: String, default: '' },
        account_no: { type: String, default: '' },
        account_name: { type: String, default: '' },
        bank_branch_name: { type: String, default: '' },
        front_book_image_url: { type: String, default: '' },
    },

    is_delete: { type: Boolean, default: false },
    is_enable: { type: Boolean, default: true },
    created_date: { type: Date, default: null },
    created_by: { type: String, default: '' },
    updated_date: { type: Date, default: null },
    updated_by: { type: String, default: '' },
})


const systemNameModel = mongoose.model('system_names', System_nameSchema)
module.exports = systemNameModel