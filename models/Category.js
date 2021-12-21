const mongoose = require("mongoose");

const Subcategory = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true,
    }, 
    photo: {
        type: String,
        required: true,
    },
    sections: {
        type: [String],
        default: [],
    },
})

const Category = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true,
    }, 
    subcategories: {
        type: [Subcategory],
        required: true,
    },
})

module.exports = mongoose.model("categories", Category);