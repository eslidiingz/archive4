
const mongoose = require('mongoose')
let ObjectId = require('mongoose').Types.ObjectId;

const BanksSchema = new mongoose.Schema({
    code : { type: String, default: '' },
    logo : { type: String, default: '' },
    mapcode : { type: String, default: '' },
    nameth : { type: String, default: '' },
    nameen : { type: String, default: '' },

    is_delete: { type: Boolean, default: false },
    is_enable: { type: Boolean, default: true },
    created_date: { type: Date, default: null },
    created_by: { type: String, default: '' },
    updated_date: { type: Date, default: null },
    updated_by: { type: String, default: '' },
})


const bankModel = mongoose.model('banks', BanksSchema)
module.exports = bankModel