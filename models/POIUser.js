const mongoose = require("mongoose");

const Activity = new mongoose.Schema({
     /*id: {
        type: String,
        required: true,
    },*/
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
    _id: false,
    number_card: {
        type: Number,
        unique: true,
        required: true,
    }, 
    accountholder: {
        type: String,
        required: true,
    },
    ccv: {
        type: Number,
        required: true,
    },
    expiration: {
        type: String,
        required: true,
    }, 
    type: {
        type: String,
        required: true,
    }
})

const POIUser = new mongoose.Schema({
    _id: false,
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
        required: true,
    },
    activity: {
        type: Activity,
        required: true,
    },
    is_Paid: {
        type: Boolean,
        required: true,
    },
    is_Active: {
        type: Boolean,
        required: true,
    },
})

module.exports = mongoose.model("POIUsers", POIUser);