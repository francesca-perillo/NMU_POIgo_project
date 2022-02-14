const mongoose = require("mongoose");

const coordinatesRoute = new mongoose.Schema({
    lat: {
        type: Number,
        required: true,
    },
    lng: {
        type: Number,
        required: true,
    },
    typePoint: {
        type: String,
        required: true,
    },
});

const Route = new mongoose.Schema({
    category: {
        type: [mongoose.Types.ObjectId],
        ref: 'categoriesRoute',
        required: true,
    },
    coordinatesRoute: {
        type: [coordinatesRoute],
        required: true,
        default: [],
    },
})

module.exports = mongoose.model("Route", Route);