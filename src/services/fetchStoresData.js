import { getListOfCoffeeStoresPhotos } from "./fetchStoresPhoto";

export const options = {
    method: 'GET',
    headers: {
    accept: 'application/json',
    Authorization: process.env.FOURSQUARE_API_KEY
    }
};

function getUrlForCoffeeStores (query, latLong, limit) {
    return `https://api.foursquare.com/v3/places/search?query=${query}&ll=${latLong}&radius=5500&sort=DISTANCE&limit=${limit}`
};


export async function fetchCoffeeStores (
    latLong = "48.87137631527475,2.3025246543521893",
    limit = 18
) {
    try {       
        const response = await fetch(getUrlForCoffeeStores("coffee", latLong, limit), options);
        const data = await response.json();
        return await Promise.all(
            data.results.map(async (result) => {
                const photos = await getListOfCoffeeStoresPhotos(result.fsq_id, 3)
                return {
                    id: result.fsq_id,
                    name: result.name,
                    address: result.location.address,
                    crossStreet: result.location.cross_street? result.location.cross_street: null,
                    postcode: result.location.postcode,
                    city: result.location.locality,
                    country: result.location.country,
                    imgUrl: photos? photos : "",
                }
            }) 
        );
    } catch (error) {
        console.error(error)
    }
};