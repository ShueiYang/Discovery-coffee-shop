
export async function upsertStoreData(coffeeStore) {
    try {
        const {
            id, 
            name,
            address,
            crossStreet,
            postcode,
            city, 
            country, 
            imgUrl,
            voting 
        } = coffeeStore;
        const response = await fetch('/api/createCoffeeStore', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body:JSON.stringify({
                id, 
                name,
                address,
                cross_street: crossStreet || "",
                postcode: postcode || "",
                city, 
                country, 
                imgUrl,
                voting: voting || 0,
            })
        })
        return response.json();
        
    } catch (err) {
        console.error(`Error creating storeData: ${err}`)
    }
}


export async function upvoteCoffeeStore(coffeeStoreId) {
    try {
        const response = await fetch('/api/upvoteCoffeeStoreById', {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body:JSON.stringify({
               id: coffeeStoreId
            })
        })
        return response.json();
        
    } catch (err) {
        console.error(`Error upvoting the coffeeStore: ${err}`)
    }
}