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

const POI = new mongoose.Schema({
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
    },
    is_Validate: {
        type: Boolean,
        required: true,
    },
    coordinates:{
        type: [String],
        required: true,
    },
    category: {
        type: [mongoose.Types.ObjectId],
        ref: 'categories',
        required: true, 
    },
    createdBy: {
        type: String,
        ref: 'User.email',
        required: true, 
    }
})

module.exports = mongoose.model("POI", POI);