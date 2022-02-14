import { BASE_URL } from "../config/api"

export const getCoordinatesRoute = async (category) => {
    let response = await fetch(
        `${BASE_URL}/route/category?category=${category}`,
        {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        }
    );

    let json = await response.json();
    return json;
}