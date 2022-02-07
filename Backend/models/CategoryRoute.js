const mongoose = require("mongoose");

const CategoryRoute = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true,
    },
    photo: {
        type: String,
        required: true,
    },
})

module.exports = mongoose.model("categoriesRoute", CategoryRoute);