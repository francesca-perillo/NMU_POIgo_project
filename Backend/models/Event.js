const mongoose = require("mongoose");

const Address = new mongoose.Schema({
    _id: false,
    street: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    cap: {
        type: Number,
        required: true,
    },
})

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
    }
})

module.exports = mongoose.model("events", Event);