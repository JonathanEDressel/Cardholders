const mongoose = require("mongoose")

const CardholderSchema = new mongoose.Schema({
    businessName: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    ceoName: {
        type: String,
        required: true,
    },
    numberEmployees: {
        type: String,
        required: true,
    }
})

const CardholderModel = mongoose.model("CardHolders", CardholderSchema)
module.exports = CardholderModel