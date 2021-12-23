const express = require('express');

// Import the routes
const categoryRoute = require('./routes/category');
const poiRoute = require('./routes/poi');
const userRoute = require('./routes/user');
const alertRoute = require('./routes/alert');
const eventRoute = require('./routes/event');

const app = express();

// Enable support for parsing JSON
app.use(express.json());
// Enable support for parsing URL encoded data
app.use(express.urlencoded({ extended: true }));

// Register your routes here
app.use('/categories', categoryRoute);
app.use('/pois', poiRoute);
app.use('/user', userRoute);
app.use('/alerts', alertRoute);
app.use('/events', eventRoute);

module.exports = app;