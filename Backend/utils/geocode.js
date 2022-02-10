const axios = require("axios").default;

const HERE_BASE_URL_GEOCODE = "https://geocode.search.hereapi.com/v1";
const GEOCODE_URL = `${HERE_BASE_URL_GEOCODE}/geocode`;

/**
 * 
 * @param {GeocodeOptions} options
 * @returns 
 */
const getCoordinatesByAddress = async (options) => {
    const queryParams = {
        ...options,
        apiKey: process.env.HERE_API_KEY
    }

    try {
        const response = await axios.get(GEOCODE_URL, { params: queryParams });
        return response.data;
    } catch (error) {
        console.error(error.response.data);
        return [];
    }
}

module.exports = { getCoordinatesByAddress };

/**
 * @typedef {Object} GeocodeOptions
 * @property {string} q Address of the report
 */