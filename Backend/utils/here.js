const axios = require("axios").default;

const HERE_BASE_URL = "https://router.hereapi.com/v8";
const ROUTE_URL = `${HERE_BASE_URL}/routes`;

// Contains the query params used to authenticate on HERE platform
const CREDENTIALS = {
    apiKey: process.env.HERE_API_KEY
}

/**
 * 
 * @param {RoutesOptions} options 
 * @returns 
 */
const getRoutes = async (options) => {
    const queryParams = {
        ...options,
        return: 'polyline',
        ...CREDENTIALS,
    }

    try {
        const response = await axios.get(ROUTE_URL, { params: queryParams });
        return response.data;
    } catch (error) {
        console.error(error.response.data);
        return [];
    }
}

module.exports = { getRoutes };

/**
 * @typedef {Object} RoutesOptions 
 * @property {"car" | "pedestrian"} transportMode The way in which the user want to reach the destination
 * @property {string} origin The starting point of your travel
 * @property {string} destination The arrival point of your travel
 */