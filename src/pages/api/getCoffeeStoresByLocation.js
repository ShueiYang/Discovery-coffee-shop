import { fetchCoffeeStores } from '@/services/services.index'


async function getCoffeeStoresByLocation(req, res) {
    try {
        const { latLong, limit } = req.query
        const response = await fetchCoffeeStores(latLong, limit);
        res.status(200).json(response);

    } catch (err) {
        console.error(`There is an error: ${err}`)
        res.status(500).json({message: `Oups something went wrong ${err}`})
    }
}

export default getCoffeeStoresByLocation;