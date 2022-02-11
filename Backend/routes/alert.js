const express = require('express');
const { isValidObjectId } = require('mongoose');
const { getCoordinatesByAddress } = require("../utils/geocode");
const Alert = require('../models/Alert');

const router = express.Router();

// Retrieve a alert by approval
router.get('/', async (req, res) => {
    // Retrieve query params
    const { approval } = req.query;
    // Build the query
    const query = {
        // If approval is defined then check if it's true
        // If it's true we want to find only the alerts approved
        // Else we want to find the alerts not approved
        // If approval is not defined the approval filter will not be applied
        ...(approval && { approval: /true/i.test(approval) }),
    }
    const alert = await Alert.find(query);

    res.send(alert);
});

router.get('/geocode', async (req, res) => {
    const { q } = req.query;

    if (!q)
        return res.status(400).send({ error: "Address is required" });

    const response = await getCoordinatesByAddress(req.query);
    const { items } = response;

    const [address] = items.map(item => item.position);

    res.send(address);
})

// Retrieve a alert by id
router.get('/:id', async (req, res) => {
    // Retrieve params from the request
    const { id } = req.params;

    // Check if the id is valid
    if (!isValidObjectId(id))
        return res.status(400).send({ error: "Invalid id" });

    // Retrieve the alert with the given id
    const alert = await Alert.findById(id);
    if (!alert)
        return res.status(404).send({ error: "Alert not found" });

    res.send(alert);
});

// Create a new alert
router.post('/', async (req, res) => {
    // Retrieve values from the request body
    const { title, description, photo, address, approval, createdBy } = req.body;

    if (!title)
        return res.status(400).send({ error: 'Title is required' });
    if (!description)
        return res.status(400).send({ error: 'Description is required' });
    if (!photo)
        return res.status(400).send({ error: 'Photo is required' });
    if (!address)
        return res.status(400).send({ error: 'Address is required' });
    if (!approval)
        return res.status(400).send({ error: 'Approval is required' });
    if (!createdBy)
        return res.status(400).send(error.createdBy = 'CreatedBy is required');

    // Create a new alert
    const alert = await Alert.create({ title, description, photo, address, approval, createdBy, location});
    res.send(alert);
});

// Update a alert by its id
router.put('/:id', async (req, res) => {
    // Retrieve params from the request
    const { id } = req.params;
    // Retrieve values from the request body
    const { title, description, photo, address, approval, createdBy, location } = req.body;

    // Check if the id is valid
    if (!isValidObjectId(id))
        return res.status(400).send('Invalid id');

    if (!title)
        return res.status(400).send("The 'title' field is required");
    if (!description)
        return res.status(400).send("The 'description' field is required");
    if (!address)
        return res.status(400).send("The 'address' field is required");
    if (!approval)
        return res.status(400).send("The 'approval' field is required");
    if (!createdBy)
        return res.status(400).send("The 'createdBy' field is required");


    // Try to update the alert with the given id
    const alert = await Alert.findByIdAndUpdate(id, { title, description, photo, address, approval, createdBy, location }, { new: true });
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
    const { title, description, photo, address, approval, createdBy } = req.body;

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