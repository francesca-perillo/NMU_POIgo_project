import { BASE_URL } from "../config/api"
//Questo metodo serve per fare una richiesta al server per ottenere la lista delle categorie.
//Useremo useEffect per fare la richiesta al server e ottenere la lista delle categorie.
//Inoltre verrà chiamato ogni volta che la pagina verrà caricata.
export const getAllCategories = async () => {
    let response = await fetch(
       `${BASE_URL}/categories`,
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