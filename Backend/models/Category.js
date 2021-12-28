const mongoose = require("mongoose");

const Section = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true,
    }, 
})

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
        type: [Section],
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
        default: [],
    },
})

module.exports = mongoose.model("categories", Category);