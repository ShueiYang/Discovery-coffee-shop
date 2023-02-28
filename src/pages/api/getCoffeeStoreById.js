import { findRecordByFilter } from "@/services/services.index";


async function getCoffeeStoreById (req, res) {
  try {
    const {id} = req.query; 
    if(!id) {
        return res.status(400).json([{errorMessage: "Id is missing"}])
    }
    const records = await findRecordByFilter(id);
    
    if (records.length === 0) {
        return res.json([{errorMessage: "id could not be found"}])
    }
    res.json(records); 
      
  } catch (err) {
    console.error(`Error finding store by id: ${err}`)
    res.status(500).json([{errorMessage: `Oups something went wrong ${err}`}])
  }
};

export default getCoffeeStoreById;