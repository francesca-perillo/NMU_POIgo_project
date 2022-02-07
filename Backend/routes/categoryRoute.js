const express = require('express');
const { isValidObjectId } = require('mongoose');
const CategoryRoute = require('../models/CategoryRoute');

const router = express.Router();

// Retrieve all the categories
router.get('/', async (req, res) => {
    const categories = await CategoryRoute.find();
    res.send(categories);
});

module.exports = router;