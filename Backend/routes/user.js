const express = require('express');
const { isValidObjectId } = require('mongoose');
const User = require('../models/User');

const router = express.Router();

// Retrieve all the users
router.get('/', async (req, res) => {
    const user = await User.find();
    res.send(user);
});

// Retrieve a user by id
router.get('/:id', async (req, res) => {
    // Retrieve params from the request
    const { id } = req.params;

    // Check if the id is valid
    if (!isValidObjectId(id))
        return res.status(400).send('Invalid id');

    // Retrieve the users with the given id
    const user = await User.findById(id);
    if (!user)
        return res.status(404).send('User not found');

    res.send(user);
});

// Create a new user
router.post('/', async (req, res) => {
    // Retrieve values from the request body
    const {email, password, credit_cart, activity, is_paid, is_active, is_qualified, type} = req.body;

    if (!email)
        return res.status(400).send("The 'email' field is required");
    if(!password)
        return res.status(400).send("The 'password' field is required");
    if(!type)
        return res.status(400).send("The 'type' field is required");

    // Create a new user
    const user = await User.create({ email, password, credit_cart, activity, is_paid, is_active, is_qualified, type });
    res.send(user);
});

// Update a user by its id
router.put('/:id', async (req, res) => {
    // Retrieve params from the request
    const { id } = req.params;
    // Retrieve values from the request body
    const { email, password, credit_cart, activity, is_paid, is_active, is_qualified, type } = req.body;

    // Check if the id is valid
    if (!isValidObjectId(id))
        return res.status(400).send('Invalid id');
    
    if (!email)
        return res.status(400).send("The 'email' field is required");
    if(!password)
        return res.status(400).send("The 'password' field is required");
    if(!type)
        return res.status(400).send("The 'type' field is required");

    // Try to update the user with the given id
    const user = await User.findByIdAndUpdate(id, {email, password, credit_cart, activity, is_paid, is_active, is_qualified, type }, { new: true });
    if (!user)
        return res.status(404).send('User not found');

    res.send(user);
});

// Update a user by id
// Same as PUT, but not all the values are required
router.patch('/:id', async (req, res) => {
    // Retrieve params from the request
    const { id } = req.params;
    // Retrieve values from the request body
    const { email, password, credit_cart, activity, is_paid, is_active, is_qualified, type } = req.body;

    // Check if the id is valid
    if (!isValidObjectId(id))
        return res.status(400).send('Invalid id');

    // Try to update the user with the given id
    const user = await User.findByIdAndUpdate(id, req.body, { new: true });
    if (!user)
        return res.status(404).send('User not found');

    res.send(user);
});

// Delete a user by its id
router.delete('/:id', async (req, res) => {
    // Retrieve params from the request
    const { id } = req.params;

    // Check if the id is valid
    if (!isValidObjectId(id))
        return res.status(400).send('Invalid id');

    // Try to delete the user with the given id
    const user = await User.findByIdAndDelete(id);
    if (!user)
        return res.status(404).send('User not found');

    res.send(user);
});

module.exports = router;