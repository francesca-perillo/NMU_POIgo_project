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

const POI = new mongoose.Schema({
    /*id: {
        type: String,
        required: true,
    },*/
    name: {
        type: String,
        required: true,
    }, 
    photo: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    opening_hours: {
        type: String,
        required: true,
    },
    activity: {
        Type: Activity,
        required: true,
    },
    is_Validate: {
        type: Boolean,
        required: true,
    },
    coordinates:{
        type: [Number],
        required: true,
    }
})

module.exports = mongoose.model("POI", POI);