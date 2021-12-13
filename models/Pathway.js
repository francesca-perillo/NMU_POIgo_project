const mongoose = require("mongoose");

const Pathway = new mongoose.Schema({
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
})

module.exports = mongoose.model("Pathways", Pathway);