import { BASE_URL } from "../config/api"
export const getAllPOI = async () => {
    let response = await fetch(
        `${BASE_URL}/pois`,
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

export const getPOIById = async ( id ) => {
    let response = await fetch(
        `${BASE_URL}/pois/${id}`,
        {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
        }
    );

    let json = await response.json();
    return json;
};