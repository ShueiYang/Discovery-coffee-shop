import { findRecordByFilter, getRecordFields, table } from "@/services/services.index";


async function createCoffeeStore(req, res) {
    try {
        const {
            id, 
            name,
            address,
            cross_street,
            postcode,
            city, 
            country, 
            imgUrl,
            voting 
        } = req.body;

        if(!id) {
            return res.status(400).json({message: "Id is missing"})
        }
        const records = await findRecordByFilter(id);
            //first check if a record exist  
        if(records.length !== 0) {
            res.json({message: "Records found, no need to create one"});
        } else {
            if(name) {
            //create a record
            const createRecords = await table.create([
                {   
                    fields: { //shorthand
                        id, 
                        name,
                        address,
                        cross_street,
                        postcode,
                        city, 
                        country, 
                        imgUrl,
                        voting,
                    }
                }                
            ])
            // const records = getRecordFields(createRecords);
            res.json({message: "Records created"});
            
            } else {
                res.status(400).json({message: "Name is missing"})
            }
        }
    } catch (err) {
        console.error(`Error creating or finding store: ${err}`)
        res.status(500).json({message: `Error creating or finding store: ${err}`})
    }
}

export default createCoffeeStore;