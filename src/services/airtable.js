import Airtable from 'airtable';

const base = new Airtable({
    apiKey: process.env.AIRTABLE_API_TOKEN 
}).base(process.env.AIRTABLE_BASE_KEY);


const table = base("Coffee-stores");

// extract only the recordID and the fields property in the object inside an array that we need to use
function getRecordFields (recordsArray) {
    return recordsArray.map(record => {
        return {
            recordId: record.id,
            ...record.fields,
        }
    })
};

// function to get the record by id with the right data from fields
async function findRecordByFilter (id) {
    const findCoffeeStoreRecords = await table.select({
        filterByFormula: `id="${id}"`
    }).firstPage();
    return getRecordFields(findCoffeeStoreRecords);
};

export {table, getRecordFields, findRecordByFilter};
    