const mongoose = require('mongoose')
let ObjectId = require('mongoose').Types.ObjectId;

//เก็บรายการชำระค่าสินค้าโดยจ่ายเอง QR, Credit [ไม่ได้ตัดเงินจากกระเป๋า] (บิลใหญ่)
const Payment_TransectionsSchema = new mongoose.Schema({
    wallet_id: { type: ObjectId, default: null },
    tel: { type: String, default: '' },
    // shop_tel: { type: String, default: '' },//เบอร์ร้าน
    account_name: { type: String, default: '' },//เก็บสดทุกครั้งที่ส่งมา
    email : { type: String, default: '' },//เก็บสดทุกครั้งที่ส่งมา
    
    source: { type: String, default: '' },//"QR, CREDIT, TRANSFER, REFUND" จ่ายเงินจากแหล่งไหน
    system: { type: String, default: 'YAAMO' },//"STN, BIRD_FLASH, YAAMO เงินข้าออกของระบบอะไร
    status: {type: String, default: 'PENDING'},//"PENDING" ทำรายการเข้ามาแต่ยังไม่เรียบร้อย เช่นqr จะต้องสร้าง record ตอนgen qr แต่สถานะเริ่มต้นเป็น "PENDING" หลังจากแสกนจ่ายเรียบร้อย third party จะ callback กลับมาให้ตรวจว่า success มั้ยถ้าใช่ค่อยปรับตัวนีเป็น "COMPLETE"

    inv_ref: { type: String, default: '' },//เลขที่อ้างอิง
    inv_ref_plus: { type: String, default: '' },//เลขที่อ้างอิง+system_name เอาไว้ส่ง third party payment gateway ที่ต้องเป็น unique
    ref_json : { type: String, default: '' },//ใช้เก็บสิ่งที่ third party ส่งกลับมาตอน callback
    paid_third_party_date : { type: Date, default: null },//เวลาที่ชำระเงินกับ third party
    // inv_ref_of_refund : { type: String, default: '' },//ใช้กรณี refund จะต้องใส่ inv_ref ตัวที่ถูก refund ที่นี่
    pay_amt: {type: Number, default: 0},//ต้องเป็นบวกเท่านั้น
    charge_fee_per: {type: Number, default: 0},//เก็บค่า config การ charge ณ.ขณะนั้นจาก db
    charge_fee_amt: {type: Number, default: 0},//ค่าบริการ อาจจะเอาไปเพื่มกรณีจ่ายด้วยบัตร เงินส่วนนี้บวกเพิ่มต่างหากเข้าระบบ ไม่จ่ายคืนระบบย่อย
    link_pay : { type: String, default: '' },//เก็บข้อมูลที่ได้จากการทำจ่าย
    remark: {type: String, default: '' },

    sub_inv_ref_list : [{ //ใช้เก็บ inv_ref ย่อย ใช้สำหรับ จ่ายสินค้าโดย credit/qr ว่าแต่ละร้านมีซื้อไปเท่าไหร่
        shop_tel : { type: String, default: '' },
        shop_wallet_id: { type: ObjectId, default: null },
        sub_inv_ref : { type: String, default: '' }, //"A"
        amt : { type: Number, default: 0 },//บวกเท่านั้น
        system_name : { type: String, default: '' }
    }],

    ip_create: { type: String, default: '' },
    is_delete: { type: Boolean, default: false },
    is_enable: { type: Boolean, default: true },
    created_date: { type: Date, default: null },
    created_by: { type: String, default: '' },
    updated_date: { type: Date, default: null },
    updated_by: { type: String, default: '' },
})



const paymentTransectionModel = mongoose.model('payment_transactions', Payment_TransectionsSchema)
module.exports = paymentTransectionModel
