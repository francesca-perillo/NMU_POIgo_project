const mongoose = require("mongoose");

const Activity = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    surname: {
        type: String,
        required: true,
    },
    partita_iva:{
        type: Number,
        required: true,
    },
    tel_number:{
        type: Number,
        required: true,
    }
})

const Credit_Cart = new mongoose.Schema({
    number_card: {
        type: Number,
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