import { options } from "./fetchStoresData";


export async function getListOfCoffeeStoresPhotos (fsqId, limit) {
    try {
        const response = await fetch(`https://api.foursquare.com/v3/places/${fsqId}/photos?limit=${limit}`
        , options);
        if(response.ok) {
            const data = await response.json();
            return `${data[0].prefix}360x220${data[0].suffix}`;   
        } 
    } catch (error) {
        console.error(`Error when retrieve photo: ${error}`)
    }
};