const mongoose = require("mongoose");

const Activity = new mongoose.Schema({
    email: {
        type: String,
        required: false,
    },
    name: {
        type: String,
        required: false,
    },
    surname: {
        type: String,
        required: false,
    },
    partita_iva:{
        type: Number,
        required: false,
    },
    tel_number:{
        type: Number,
        required: false,
    }
})

const Credit_Cart = new mongoose.Schema({
    _id: false,
    number_card: {
        type: Number,
        unique: true,
        required: false,
    }, 
    accountholder: {
        type: String,
        required: false,
    },
    ccv: {
        type: Number,
        required: false,
    },
    expiration: {
        type: String,
        required: false,
    }, 
    type: {
        type: String,
        required: false,
    }
})

const User = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
    }, 
    password: {
        type: String,
        required: true,
    },
    credit_cart: {
        type: Credit_Cart,
        required: false,
    },
    activity: {
        type: Activity,
        required: false,
    },
    is_paid: {
        type: Boolean,
        required: false,
    },
    is_active: {
        type: Boolean,
        required: false,
    },
    is_qualified: {
        type: Boolean,
        required: false,
    },
    type: {
        type: String,
        required: true,
    },
})

module.exports = mongoose.model("User", User);