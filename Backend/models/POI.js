const mongoose = require("mongoose");

const Activity = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    surname: {
        type: String,
        required: true,
    },
    partita_iva:{
        type: Number,
        required: true,
    },
    tel_number:{
        type: Number,
        required: true,
    }
})

const pointSchema = new mongoose.Schema({
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
});

const POI = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    }, 
    photo: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    opening_hours: {
        type: String,
        required: true,
    },
    activity: {
        type: Activity,
        required: true,
    },
    is_Validate: {
        type: Boolean,
        required: true,
    },
    location: {
        type: pointSchema,
        required: true,
    },
    sections: {
        type: [mongoose.Types.ObjectId],
        ref: 'categories',
        required: true, 
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true, 
    }
})

module.exports = mongoose.model("POI", POI);