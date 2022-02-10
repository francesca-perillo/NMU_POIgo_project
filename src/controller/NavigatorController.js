import { BASE_URL } from "../config/api"

export const getPolyline = async (origin, destination) => {
    const originString = `${origin.latitude},${origin.longitude}`;
    const destinationString = `${destination.latitude}, ${destination.longitude}`;

    const response = await fetch(
        `${BASE_URL}/maps/polyline?transportMode=pedestrian&origin=${originString}&destination=${destinationString}`,
        {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
        }
    )

    return await response.json();
}