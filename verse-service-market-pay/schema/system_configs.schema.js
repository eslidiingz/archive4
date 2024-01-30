const mongoose = require('mongoose')
let ObjectId = require('mongoose').Types.ObjectId;

const SystemConfigsSchema = new mongoose.Schema({
    qr_charge_fee_per : { type: Number, default: 0 },
    credit_charge_fee_per : { type: Number, default: 0 },

    is_delete: { type: Boolean, default: false },
    is_enable: { type: Boolean, default: true },
    created_date: { type: Date, default: null },
    created_by: { type: String, default: '' },
    updated_date: { type: Date, default: null },
    updated_by: { type: String, default: '' },
})


const systemConfigModel = mongoose.model('system_configs', SystemConfigsSchema)
module.exports = systemConfigModel