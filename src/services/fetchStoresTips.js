import { options } from "./fetchStoresData";


export async function getCoffeeStoreTips (fsqId, limit) {
    try {
        const response = await fetch(`https://api.foursquare.com/v3/places/${fsqId}/tips?limit=${limit}`
        , options);
        if(response.ok) {
            const data = await response.json();
            return data[0].text   
        }
    } catch (error) {
        console.error(`Error when retrieve tips: ${error}`)
    }
};