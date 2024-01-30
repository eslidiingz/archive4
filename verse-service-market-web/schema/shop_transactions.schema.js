const mongoose = require('mongoose')
let ObjectId = require('mongoose').Types.ObjectId;

//กระเป๋ารายได้ เบิกออกได้ตามการทำเรื่องขอเบิก (api userDoGiveBack)
//เก็บรายการรายได้จากค่าสินค้า(รายได้จริงหลังทำ refundแล้ว) แยกตามร้านตามเลขที่บิลย่อย 
const Shop_TransectionsSchema = new mongoose.Schema({
    tel: { type: String, default: '' },//เบอร์ร้าน
    wallet_id: { type: ObjectId, default: null },//ของร้าน

    cus_tel: { type: String, default: '' },//เบอร์ผู้ซื้อ
    cus_wallet_id: { type: ObjectId, default: null },//ของผู้ซื้อ

    source: { type: String, default: '' },//แหล่งรายได้จากการขายของ QR, CREDIT, WALLET
    system: { type: String, default: 'TEST' },//"STN, BIRD_FLASH, YAAMO เงินข้าออกของระบบอะไร
    status: {type: String, default: 'PENDING'},//สถานะเริ่มต้นเป็น "PENDING" ถ้าร้านสามารถเบิกได้จะเป็น COMPLETE, ถ้าเป็น PENDING คือยังสามารถทำ refund ได้
    inv_ref: { type: String, default: '' },//เลขที่อ้างอิงตัวเดียวกับ wallet_transactions และ payment_transactions
    sub_inv_ref: { type: String, default: '' },//เลขที่อ้างอิงย่อย
    
    amt: {type: Number, default: 0},//เงินที่ได้จากการขาย(บวกเท่านั้น)
    real_amt: {type: Number, default: 0},//เงินที่สามารถเบิกได้จริง(บวกเท่านั้น) (ต่างจาก amt เพราะปรับตามการ refund)
    refund_list: [{//ทำ refund 1ครั้ง เกิด1ข้อมูล
        remark: {type: String, default: '' },
        refund_amt: {type: Number, default: 0},//ลบเท่านั้น
        created_date : { type: Date, default: null }//วันที่ทำ refund
    }],
    double_spending: [{//ใช้กรณีมีการจ่ายซ้ำที่ inv_ref เดิม
        referenceno: {type: String, default: ''},
        approvalcode: {type: String, default: ''},
        created_date : { type: Date, default: null },
        status : {type: String, default: 'PENDING'},//PENDING คือยังไม่คืนเงินที่จ่ายซ้ำคืนผู้จ่าย
        amt: {type: Number, default: 0}
    }],

    //ส่วนเบิกเงินคืนร้าน ยกเลิกไม่ใช้
    is_need_give_back: { type: Boolean, default: false }, //ถ้าระบบย่อยยิงทำเรื่องขอเบิกมาข้อมูลส่วนนี้จะเป็น true พร้อมข้อมูลบัญชีธนาคารที่ต้องการให้โอน(api userDoGiveBack)
    // is_give_back :{ type: Boolean, default: false },//จ่ายคืนร้านไปแล้วจะเป็น true (api adminApproveGiveBack)
    // give_back_date: { type: Date, default: null },//จ่ายคืนร้านวันที่
    // admin_give_back: {type: String, default: '' },//admin ผู้ทำการโอนเงินคืนผู้ใช้ 
    // bank_detail :{//ข้อมูลบัญชีผู้ใช้สำหรับโอน เอาไว้สำหรับ process จ่ายคืนร้าน ยกเลิกไม่ใช้
    //     bank_code : { type: String, default: '' },
    //     bank_name : { type: String, default: '' },
    //     account_no : { type: String, default: '' },
    //     account_name : { type: String, default: '' },
    //     bank_branch_name : { type: String, default: '' },
    // },
    // admin_prove_giveback_img_url : {type: String, default: '' },


    remark: {type: String, default: '' },
    ip_create: { type: String, default: '' },
    is_delete: { type: Boolean, default: false },
    is_enable: { type: Boolean, default: true },
    created_date: { type: Date, default: null },
    created_by: { type: String, default: '' },
    updated_date: { type: Date, default: null },
    updated_by: { type: String, default: '' },
})
//is_need_give_back ถ้าเป็น true คือมีการทำเรื่องขอเบิกเงินเข้ามา ข้อมูล bank_detail จะสมบูรณ์
//ถ้า status:"PENDING" คือยังสามารถทำเรื่อง REFUNDได้อยู่
//ถ้า status:"COMPLETE" คือสามารถทำเรื่องเบิกคืนบัญชีธนาคารร้านได้
//ถ้า is_give_back: true คือคืนเงินร้านไปแล้ว

const shopTransectionModel = mongoose.model('shop_transactions', Shop_TransectionsSchema)
module.exports = shopTransectionModel