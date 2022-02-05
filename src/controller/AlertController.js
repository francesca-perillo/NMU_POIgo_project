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

    const alerts = json.map(alert => {
        return {
          id: alert._id,
          title: alert.title,
          description: alert.description,
          img: alert.photo,
          address: alert.address,
          createBy: alert.createdBy,
        }
      });

    return alerts;
};

export const insertAlert = async (title, description, photo, address) => { 
    let response = await fetch(
         `${BASE_URL}/alerts`,
         {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    title, 
                    description, 
                    photo,
                    address,
                    //Non essendoci la funzione di approvazione per gli Alert lato web per il momento 'approval' viene impostato 
                    //a true in modo tale da far visualizzare l'alert inserito.
                    approval: true,
                    //L'id è momentaneo
                    createdBy: '61c33f81031fa17dcf1e2abc',
                }
            )
         }
    );
    
    const json = await response.json();

    const alert = {
        id: json._id,
        title: json.title,
        description: json.description,
        img: json.photo,
        address: json.address,
        createdBy: json.createdBy,
    }

    return alert;
};