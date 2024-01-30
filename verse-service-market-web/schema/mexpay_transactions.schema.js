const mongoose = require("mongoose");
let ObjectId = require("mongoose").Types.ObjectId;

const moment = require("moment");

const Mexpay_TransectionsSchema = new mongoose.Schema({
  system_name: { type: String, default: "" }, // system_name ของ verse
  verse_uid: { type: String, default: "" }, // uid ของ verse
  verse_user_uid: { type: String, default: "" }, // uid ของ user จาก user service
  verse_invoice_no: { type: String, default: "" }, // เลขที่อ้างอิงจาก verse
  inv_ref: { type: String, default: "" }, // เลขที่อ้างอิง
  inv_ref_full: { type: String, default: "" }, // เลขที่อ้างอิงของธนาคาร
  payment_method: { type: String, default: "" }, // credit, qr
  is_success: { type: Boolean, default: null }, // ชำระผ่านหรือไม่
  is_enabled: { type: Boolean, default: null }, // คำนวนยอดหรือไม่
  callback_endpoint: { type: String, default: null }, // url ที่จะให้ยิงกลับไปตอน callback กับ expire
  expiry_date: { type: Date, default: null }, // expiry_date สำหรับการระบุเวลาหมดอายุของการจ่ายเงิน
  created_at: { type: Date, default: null },
  updated_at: { type: Date, default: null },
});

Mexpay_TransectionsSchema.pre("save", function (next) {
  let number = moment().unix().toString() + moment().milliseconds().toString();
  if (number.length == 12) number = number + "0";
  if (number.length == 11) number = number + "00";
  this.inv_ref = `${number}`;
  this.inv_ref_full = `${number}${this.system_name}`;
  next();
});

const mexpayTransectionModel = mongoose.model(
  "mexpay_transactions",
  Mexpay_TransectionsSchema
);
module.exports = mexpayTransectionModel;
