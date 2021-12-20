const mongoose = require("mongoose");
const Section = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    }
})

const Subcategory = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    }, 
    photo: {
        type: String,
        required: true,
    },
    section: {
        type: [Section],
        required: true,
    },
})

const Category = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    }, 
    subcategory: {
        type: [Subcategory],
        required: true,
    },
})

module.exports = mongoose.model("categories", Category);