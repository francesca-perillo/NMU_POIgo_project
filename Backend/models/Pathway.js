const mongoose = require("mongoose");

const Pathway = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    }, 
    photo: {
        type: String,
        required: true,
    },
    poi: {
        type: [mongoose.Types.ObjectId],
        ref: 'POI',
        required: true, 
    }
})

module.exports = mongoose.model("Pathways", Pathway);