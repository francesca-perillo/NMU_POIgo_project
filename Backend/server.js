const express = require('express');

// Import the routes
const categoryRoute = require('./routes/category');
const poiRoute = require('./routes/poi');
const userRoute = require('./routes/user');
const alertRoute = require('./routes/alert');
const eventRoute = require('./routes/event');
const cloudinaryRoute = require('./routes/cloudinary');

const app = express();

app.use('/cloudinary', express.json({ limit: '50mb' }), express.urlencoded({extended:true, limit: '50mb' }), cloudinaryRoute);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Register your routes here
app.use('/categories', categoryRoute);
app.use('/pois', poiRoute);
app.use('/user', userRoute);
app.use('/alerts', alertRoute);
app.use('/events', eventRoute);
app.use('/cloudinary', cloudinaryRoute);
app.use('/assets', express.static('assets'));


module.exports = app;