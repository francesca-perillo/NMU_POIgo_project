const mongoose = require("mongoose");

const Address = new mongoose.Schema({
    street: {
        type: String,
        required: true,
    },
    cap: {
        type: Number,
        required: true,
    },
}, { _id: false })

const Alert = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    }, 
    description: {
        type: String,
        required: true,
    },
    photo: {
        type: String,
        required: true,
    },
    address: {
        type: Address,
        required: true,
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true, 
        index: true,
    }
})

module.exports = mongoose.model("alerts", Alert);