const mongoose = require('mongoose')
let ObjectId = require('mongoose').Types.ObjectId;

const ProfilesSchema = new mongoose.Schema({
    username: { type: String, default: '' },
    password: { type: String, default: '' },
    name: { type: String, default: '' },
    image_url: { type: String, default: '' },
    remark: { type: String, default: '' },
    lasted_os: { type: String, default: 'android' },
    device_token: { type: String, default: '' },
    is_delete: { type: Boolean, default: false },
    is_enable: { type: Boolean, default: true },
    created_date: { type: Date, default: new Date() },
    created_by: { type: String, default: '' },
    updated_date: { type: Date, default: new Date() },
    updated_by: { type: String, default: '' },
})


const profileModel = mongoose.model('profiles', ProfilesSchema)
module.exports = profileModel