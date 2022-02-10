const express = require('express');
const { isValidObjectId } = require('mongoose');
const Event = require('../models/Event');
const router = express.Router();

// Retrieve all the events
router.get('/', async (req, res) => {
    const events = await Event.find();
    res.send(events);
});

// Retrieve a events by id
router.get('/:id', async (req, res) => {
    // Retrieve params from the request
    const { id } = req.params;

    // Check if the id is valid
    if (!isValidObjectId(id))
        return res.status(400).send({ error: "Invalid id" });

    // Retrieve the poi with the given id
    const event = await Event.findById(id);
    if (!event)
        return res.status(404).send({ error: "Event not found" });

    res.send(event);
});

// Create a new event
router.post('/', async (req, res) => {
    // Retrieve values from the request body
    const { description, date, address, hours, createdBy } = req.body;

    if (!description)
        return res.status(400).send("The 'description' field is required");
    if (!date)
        return res.status(400).send("The 'date' field is required");
    if (!address)
        return res.status(400).send("The 'address' field is required");
    if (!hours)
        return res.status(400).send("The 'hours' field is required");
    if (!createdBy)
        return res.status(400).send("The 'createdBy' field is required");

    // Create a new event
    const event = await Event.create({ description, date, address, hours, createdBy });
    res.send(event);
});

// Update a poi by its id
router.put('/:id', async (req, res) => {
    // Retrieve params from the request
    const { id } = req.params;
    // Retrieve values from the request body
    const { description, date, address, hours, createdBy } = req.body;

    // Check if the id is valid
    if (!isValidObjectId(id))
        return res.status(400).send('Invalid id');

    if (!description)
        return res.status(400).send("The 'description' field is required");
    if (!date)
        return res.status(400).send("The 'date' field is required");
    if (!address)
        return res.status(400).send("The 'address' field is required");
    if (!hours)
        return res.status(400).send("The 'hours' field is required");
    if (!createdBy)
        return res.status(400).send("The 'createdBy' field is required");

    // Try to update the event with the given id
    const event = await Event.findByIdAndUpdate(id, { description, date, address, hours, createdBy }, { new: true });
    if (!event)
        return res.status(404).send('Event not found');

    res.send(event);
});

// Update a event by id
// Same as PUT, but not all the values are required
router.patch('/:id', async (req, res) => {
    // Retrieve params from the request
    const { id } = req.params;
    // Retrieve values from the request body
    const { description, date, address, hours, createdBy } = req.body;

    // Check if the id is valid
    if (!isValidObjectId(id))
        return res.status(400).send('Invalid id');

    // Try to update the event with the given id
    const event = await Event.findByIdAndUpdate(id, req.body, { new: true });
    if (!event)
        return res.status(404).send('Event not found');

    res.send(event);
});

// Delete a event by its id
router.delete('/:id', async (req, res) => {
    // Retrieve params from the request
    const { id } = req.params;

    // Check if the id is valid
    if (!isValidObjectId(id))
        return res.status(400).send('Invalid id');

    // Try to delete the event with the given id
    const event = await Event.findByIdAndDelete(id);
    if (!event)
        return res.status(404).send('Event not found');

    res.send(event);
});

module.exports = router;