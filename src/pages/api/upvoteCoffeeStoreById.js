import { findRecordByFilter, getRecordFields, table } from "@/services/services.index";


async function upvoteCoffeeStoreById (req, res) {
    try {
        const {id} = req.body;
        const records = await findRecordByFilter(id)
        if(!id) {
            return res.status(400).json({message: "Id is missing"})
        }
        if (records.length === 0) {
            return res.json({message: "id could not be found"})
        }
        const calculateVoting = parseInt(records[0].voting + 1) 
        const updateRecord = await table.update([
            {
                id: records[0].recordId, // Airtable need the recordID to be able to update the voting field. 
                fields: {
                    voting: calculateVoting
                }
            }
        ])
        const newUpvoteCount = getRecordFields(updateRecord)
        res.json({newUpvoteCount: newUpvoteCount[0].voting})
        
    } catch (err) {
        console.error(`Error updating or finding store: ${err}`)
        res.status(500).json({message: `Error updating or finding store: ${err}`})
    }
}

export default upvoteCoffeeStoreById;