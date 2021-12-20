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

const Event = new mongoose.Schema({
    description: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    }, 
    address: {
        type: Address,
        required: true,
    },
    hours: {
        type: String,
        required: true,
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true, 
        index: true,
    }
})

module.exports = mongoose.model("events", Event);