const express = require('express');
const { isValidObjectId } = require('mongoose');
const POI = require('../models/POI');

const router = express.Router();

router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Retrieve all the POIs
router.get('/', async (req, res) => {
    const pois = await POI.find();
    res.send(pois);
});

// Retrieve a poi by id
router.get('/:id', async (req, res) => {
    // Retrieve params from the request
    const { id } = req.params;

    // Check if the id is valid
    if (!isValidObjectId(id))
        return res.status(400).send('Invalid id');

    // Retrieve the poi with the given id
    const poi = await POI.findById(id);
    if (!poi)
        return res.status(404).send('POI not found');

    res.send(poi);
});

// Create a new poi
router.post('/', async (req, res) => {
    // Retrieve values from the request body
    const { name, photo, description, opening_hours, activity, is_Validate, location, categories, createdBy} = req.body;

    if (!name)
        return res.status(400).send("The 'name' field is required");
    if(!photo)
        return res.status(400).send("The 'photo' field is required");
    if(!description)
        return res.status(400).send("The 'description' field is required");
    if(!opening_hours)
        return res.status(400).send("The 'opening_hours' field is required");
    if(!activity)
        return res.status(400).send("The 'activity' field is required");
    if(!activity.email)
        return res.status(400).send("The 'activity.email' field is required");
    if(!activity.name)
        return res.status(400).send("The 'activity.name' field is required");
    if(!activity.surname)
        return res.status(400).send("The 'activity.surname' field is required");
    if(!activity.partita_iva)
        return res.status(400).send("The 'activity.partita_iva' field is required");
    if(!activity.tel_number)
        return res.status(400).send("The 'activity.tel_number' field is required");
    if(!is_Validate)
        return res.status(400).send("The 'is_Validate' field is required");
    if(!location)
        return res.status(400).send("The 'location' field is required");
    if(!categories)
        return res.status(400).send("The 'categories' field is required");
    if(!Array.isArray(categories))
        return res.status(400).send("The 'categories' field must be an array");
    if(!createdBy)
        return res.status(400).send("The 'createdBy' field is required");

    // Create a new poi
    const poi = await POI.create({ name, photo, description, opening_hours, activity, is_Validate, location, categories, createdBy });
    res.send(poi);
});

// Update a poi by its id
router.put('/:id', async (req, res) => {
    // Retrieve params from the request
    const { id } = req.params;
    // Retrieve values from the request body
    const { name, photo, description, opening_hours, activity, is_Validate, location, categories, createdBy } = req.body;

    // Check if the id is valid
    if (!isValidObjectId(id))
        return res.status(400).send('Invalid id');
    
    if (!name)
        return res.status(400).send("The 'name' field is required");
    if(!photo)
        return res.status(400).send("The 'photo' field is required");
    if(!description)
        return res.status(400).send("The 'description' field is required");
    if(!opening_hours)
        return res.status(400).send("The 'opening_hours' field is required");
    if(!activity)
        return res.status(400).send("The 'activity' field is required");
        if(!activity.email)
        return res.status(400).send("The 'activity.email' field is required");
    if(!activity.name)
        return res.status(400).send("The 'activity.name' field is required");
    if(!activity.surname)
        return res.status(400).send("The 'activity.surname' field is required");
    if(!activity.partita_iva)
        return res.status(400).send("The 'activity.partita_iva' field is required");
    if(!activity.tel_number)
        return res.status(400).send("The 'activity.tel_number' field is required");
    if(!is_Validate)
        return res.status(400).send("The 'is_Validate' field is required");
    if(!location)
        return res.status(400).send("The 'location' field is required");
    if(!categories)
        return res.status(400).send("The 'categories' field is required");
    if(!Array.isArray(categories))
        return res.status(400).send("The 'categories' field must be an array");
    if(!createdBy)
        return res.status(400).send("The 'createdBy' field is required");

    // Try to update the poi with the given id
    const poi = await POI.findByIdAndUpdate(id, { name, photo, description, opening_hours, activity, is_Validate, location, categories, createdBy }, { new: true });
    if (!poi)
        return res.status(404).send('POI not found');

    res.send(poi);
});

// Update a poi by id
// Same as PUT, but not all the values are required
router.patch('/:id', async (req, res) => {
    // Retrieve params from the request
    const { id } = req.params;
    // Retrieve values from the request body
    const { name, photo, description, opening_hours, activity, is_Validate, location, categories, createdBy } = req.body;

    // Check if the id is valid
    if (!isValidObjectId(id))
        return res.status(400).send('Invalid id');

    if (categories && !Array.isArray(categories))
        return res.status(400).send("The '' field must be an array");

    // Try to update the poi with the given id
    const poi = await POI.findByIdAndUpdate(id, req.body, { new: true });
    if (!poi)
        return res.status(404).send('POI not found');

    res.send(poi);
});

// Delete a poi by its id
router.delete('/:id', async (req, res) => {
    // Retrieve params from the request
    const { id } = req.params;

    // Check if the id is valid
    if (!isValidObjectId(id))
        return res.status(400).send('Invalid id');

    // Try to delete the poi with the given id
    const poi = await POI.findByIdAndDelete(id);
    if (!poi)
        return res.status(404).send('POI not found');

    res.send(poi);
});

module.exports = router;