const mongoose = require("mongoose");

const POIManager = new mongoose.Schema({
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
    is_Abilited: {
        type: Boolean,
        required: true,
    }
})

module.exports = mongoose.model("POIManagers", POIManager);