const mongoose = require("mongoose");

const Address = new mongoose.Schema({
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
});

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
        required: false,
    },
    address: {
        type: Address,
        required: true,
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true, 
    }
})

module.exports = mongoose.model("alerts", Alert);