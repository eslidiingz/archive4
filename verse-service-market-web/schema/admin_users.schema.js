
const mongoose = require('mongoose')
let ObjectId = require('mongoose').Types.ObjectId;

const Admin_usersSchema = new mongoose.Schema({
    username : { type: String, default: '' },
    password : { type: String, default: '' },
    email : { type: String, default: '' },
    token_login : { type: String, default: '' },
    img_url : { type: String, default: '' },
    remark : { type: String, default: '' },
    name : { type: String, default: '' },
    last_login :{ type: Date, default: null },
    jwt_token:{ type: String, default: '' },//เก็บ token ที่ได้จาก jwt เอาไว้ตรวจ เพราะ 1 username จะต้อง login ได้เครื่องเดียวเท่านั้น

    is_delete: { type: Boolean, default: false },
    is_enable: { type: Boolean, default: true },
    created_date: { type: Date, default: null },
    created_by: { type: String, default: '' },
    updated_date: { type: Date, default: null },
    updated_by: { type: String, default: '' },
})


const adminUserModel = mongoose.model('admin_users', Admin_usersSchema)
module.exports = adminUserModel