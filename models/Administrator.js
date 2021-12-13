const mongoose = require("mongoose");

const Administrator = new mongoose.Schema({
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
})

module.exports = mongoose.model("administrators", Administrator);