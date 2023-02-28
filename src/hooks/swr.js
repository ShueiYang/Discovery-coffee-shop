import useSWR from 'swr'

const fetcher = async (url) => {
    const response = await fetch(url)
    if(!response.ok) {
        throw new Error('Something went wrong with the request')
    }
    return response.json();
}

function useStoreDataFromAirtable (id) {
    const { data, error, isLoading } = useSWR(`/api/getCoffeeStoreById?id=${id}`, fetcher)
    
    return {
        data,
        isLoading,
        isError: error
    }
}
export default useStoreDataFromAirtable;