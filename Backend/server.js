const express = require('express');

// Import the routes
const categoryRoute = require('./routes/category');

const app = express();

// Enable support for parsing JSON
app.use(express.json());
// Enable support for parsing URL encoded data
app.use(express.urlencoded({ extended: true }));

// Register your routes here
app.use('/categories', categoryRoute);

module.exports = app;