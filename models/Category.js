const mongoose = require("mongoose");

const Category = new mongoose.Schema({
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
    type: {
        type: String,
        required: true,
    },
})

module.exports = mongoose.model("categories", Category);