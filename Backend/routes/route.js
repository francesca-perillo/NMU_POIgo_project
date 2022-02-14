const express = require('express');
const { isValidObjectId } = require('mongoose');
const Route = require('../models/Route');

const router = express.Router();

router.get('/', async (req, res) => {
    const routes = await Route.find();
    res.send(routes);
});

router.get('/category', async (req, res) => {
    const { category } = req.query;

    if (!isValidObjectId(category))
        return res.status(400).send({ error: "Invalid category" });

    //Find the route with the given category
    const route = await Route.find({ category });
    if (!route)
        return res.status(404).send({ error: "Route not found" });

    res.send(route);
});

module.exports = router;