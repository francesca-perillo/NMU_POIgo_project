const express = require("express");
const { decode } = require("@liberty-rider/flexpolyline")
const { getRoutes } = require("../utils/here");
const router = express.Router();

router.get('/polyline', async (req, res) => {
    const { transportMode, origin, destination } = req.query;

    if (!transportMode)
        return res.status(400).send({ error: "TransportMode is required" });

    if (!origin)
        return res.status(400).send({ error: "Origin is required" });

    if (!destination)
        return res.status(400).send({ error: "Destination is required" });

    if (transportMode != "car" && transportMode != "pedestrian")
        return res.status(400).send({ error: "TransportMode must be equal to 'car' or 'pedestrian'" });

    const [originLat, originLng] = origin.split(",");
    if (isNaN(parseFloat(originLat)) || isNaN(parseFloat(originLng)))
        return res.status(400).send({ error: "Invalid origin coordinate" });

    const [destinationLat, destinationLng] = destination.split(",");
    if (isNaN(parseFloat(destinationLat)) || isNaN(parseFloat(destinationLng)))
        return res.status(400).send({ error: "Invalid destination coordinate" });

    const response = await getRoutes(req.query);

    const { routes } = response;
    const [routePolylines] = routes.map(route => route.sections.map(section => section.polyline));
    const [polyline] = routePolylines;
    const decodedPolyline = decode(polyline);
    const coordinates = decodedPolyline.polyline.map(step => {
        const [latitude, longitude] = step;
        return {
            latitude,
            longitude
        }
    })

    res.send(coordinates);
})

module.exports = router;