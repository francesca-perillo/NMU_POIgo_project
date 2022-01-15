import { BASE_URL } from "../config/api"

export const getAllAlertsApproved = async () => {
    let response = await fetch(
       `${BASE_URL}/alerts?approval=true`,
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
