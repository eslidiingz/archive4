const mongoose = require('mongoose')
let ObjectId = require('mongoose').Types.ObjectId;

//ยังไม่ได้ใช้
const menu_permissionsSchema = new mongoose.Schema({
    menu_code: { type: String, dafault: "" },
    path: { type: String, dafault: "" },
    title: { type: String, dafault: "" },
    icon: { type: String, dafault: "" },
    class: { type: String, dafault: "" },
    is_active: { type: Boolean, default: true },
    sort_no: { type: Number, default: 0 },
    users: [{ 
        admin_user_id: { type: ObjectId, dafault: null },
        username: { type: String, dafault: "" },
        can_edit: { type: Boolean, default: true },
        can_view: { type: Boolean, default: true },
    }],
    child: [{
        menu_code: { type: String, dafault: "" },
        path: { type: String, dafault: "" },
        title: { type: String, dafault: "" },
        icon: { type: String, dafault: "" },
        class: { type: String, dafault: "" },
    }],
    is_delete: { type: Boolean, default: false },
    is_enable: { type: Boolean, default: true },
    created_date: { type: Date, default: null },
    created_by: { type: String, default: '' },
    updated_date: { type: Date, default: null },
    updated_by: { type: String, default: '' },
})


const menu_permissionModel = mongoose.model('menu_permissions', menu_permissionsSchema)
module.exports = menu_permissionModel