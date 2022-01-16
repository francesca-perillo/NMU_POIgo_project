import { BASE_URL } from "../config/api"

export const getAllEvents = async () => {
    let response = await fetch(
       `${BASE_URL}/events`,
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
};