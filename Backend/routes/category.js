const express = require('express');
const { isValidObjectId } = require('mongoose');
const Category = require('../models/Category');

const router = express.Router();

// Retrieve all the categories
router.get('/', async (req, res) => {
    const categories = await Category.find();
    res.send(categories);
});

// Retrieve a category by id
router.get('/:id', async (req, res) => {
    // Retrieve params from the request
    const { id } = req.params;

    // Check if the id is valid
    if (!isValidObjectId(id))
        return res.status(400).send('Invalid id');

    // Retrieve the category with the given id
    const category = await Category.findById(id);
    if (!category)
        return res.status(404).send('Category not found');

    res.send(category);
});

// Create a new category
router.post('/', async (req, res) => {
    // Retrieve values from the request body
    const { name, subcategories } = req.body;

    if (!name)
        return res.status(400).send("The 'name' field is required");
    if (!subcategories)
        return res.status(400).send("The 'subcategories' field is required");
    if (!Array.isArray(subcategories))
        return res.status(400).send("The 'subcategories' field must be an array");

    // Create a new category
    const category = await Category.create({ name, subcategories });
    res.send(category);
});

// Update a category by its id
router.put('/:id', async (req, res) => {
    // Retrieve params from the request
    const { id } = req.params;
    // Retrieve values from the request body
    const { name, subcategories } = req.body;

    // Check if the id is valid
    if (!isValidObjectId(id))
        return res.status(400).send('Invalid id');

    if (!name)
        return res.status(400).send("The 'name' field is required");
    if (!subcategories)
        return res.status(400).send("The 'subcategories' field is required");
    if (!Array.isArray(subcategories))
        return res.status(400).send("The 'subcategories' field must be an array");

    // Try to update the category with the given id
    const category = await Category.findByIdAndUpdate(id, { name, subcategories }, { new: true });
    if (!category)
        return res.status(404).send('Category not found');

    res.send(category);
});

// Update a category by id
// Same as PUT, but not all the values are required
router.patch('/:id', async (req, res) => {
    // Retrieve params from the request
    const { id } = req.params;
    // Retrieve values from the request body
    const { name, subcategories } = req.body;

    // Check if the id is valid
    if (!isValidObjectId(id))
        return res.status(400).send('Invalid id');

    if (subcategories && !Array.isArray(subcategories))
        return res.status(400).send("The 'subcategories' field must be an array");

    // Try to update the category with the given id
    const category = await Category.findByIdAndUpdate(id, req.body, { new: true });
    if (!category)
        return res.status(404).send('Category not found');

    res.send(category);
});

// Delete a category by its id
router.delete('/:id', async (req, res) => {
    // Retrieve params from the request
    const { id } = req.params;

    // Check if the id is valid
    if (!isValidObjectId(id))
        return res.status(400).send('Invalid id');

    // Try to delete the category with the given id
    const category = await Category.findByIdAndDelete(id);
    if (!category)
        return res.status(404).send('Category not found');

    res.send(category);
});

module.exports = router;