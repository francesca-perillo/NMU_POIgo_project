const express = require('express');
const { isValidObjectId } = require('mongoose');
const Alert = require('../models/Alert');

const router = express.Router();

// Retrieve all the alerts
router.get('/', async (req, res) => {
    const alert = await Alert.find();
    res.send(alert);
});

// Retrieve a alert by id
router.get('/:id', async (req, res) => {
    // Retrieve params from the request
    const { id } = req.params;

    // Check if the id is valid
    if (!isValidObjectId(id))
        return res.status(400).send('Invalid id');

    // Retrieve the alert with the given id
    const alert = await Alert.findById(id);
    if (!alert)
        return res.status(404).send('Alert not found');

    res.send(alert);
});

// Create a new alert
router.post('/', async (req, res) => {
    // Retrieve values from the request body
    const {title, description, photo, address, createdBy} = req.body;

    if (!title)
        return res.status(400).send("The 'title' field is required");
    if(!description)
        return res.status(400).send("The 'description' field is required");
    if(!address)
        return res.status(400).send("The 'address' field is required");
    if(!createdBy)
        return res.status(400).send("The 'createdBy' field is required");

    // Create a new alert
    const alert = await Alert.create({ title, description, photo, address, createdBy });
    res.send(alert);
});

// Update a alert by its id
router.put('/:id', async (req, res) => {
    // Retrieve params from the request
    const { id } = req.params;
    // Retrieve values from the request body
    const { title, description, photo, address, createdBy } = req.body;

    // Check if the id is valid
    if (!isValidObjectId(id))
        return res.status(400).send('Invalid id');
    
    if (!title)
        return res.status(400).send("The 'title' field is required");
    if(!description)
        return res.status(400).send("The 'description' field is required");
    if(!address)
        return res.status(400).send("The 'address' field is required");
    if(!createdBy)
        return res.status(400).send("The 'createdBy' field is required");


    // Try to update the alert with the given id
    const alert = await Alert.findByIdAndUpdate(id, {  title, description, photo, address, createdBy }, { new: true });
    if (!alert)
        return res.status(404).send('Alert not found');

    res.send(alert);
});

// Update a alert by id
// Same as PUT, but not all the values are required
router.patch('/:id', async (req, res) => {
    // Retrieve params from the request
    const { id } = req.params;
    // Retrieve values from the request body
    const { title, description, photo, address, createdBy } = req.body;

    // Check if the id is valid
    if (!isValidObjectId(id))
        return res.status(400).send('Invalid id');

    // Try to update the alert with the given id
    const alert = await Alert.findByIdAndUpdate(id, req.body, { new: true });
    if (!alert)
        return res.status(404).send('Alert not found');

    res.send(alert);
});

// Delete a alert by its id
router.delete('/:id', async (req, res) => {
    // Retrieve params from the request
    const { id } = req.params;

    // Check if the id is valid
    if (!isValidObjectId(id))
        return res.status(400).send('Invalid id');

    // Try to delete the alert with the given id
    const alert = await Alert.findByIdAndDelete(id);
    if (!alert)
        return res.status(404).send('Alert not found');

    res.send(alert);
});

module.exports = router;