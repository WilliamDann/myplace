import { useEffect, useState } from "react";

export async function apiCall(endpoint, opts)
{
    const baseApi = import.meta.env.VITE_BASE_API; 
    let data    = null;
    let error   = null;
    
    try {
        const response = await fetch(baseApi + endpoint, opts)
        const json     = await response.json();
        
        if (json.error)
            return {data: null, error: json.error};

        data = json;
    } catch (err) {
        err = err;
    }
    
    return {data, error};
}

export default function useApi({endpoint, opts})
{
    const [data, setData]        = useState(null);
    const [loading, setLoading]  = useState(true);
    const [error, setError]      = useState(null);
    
    const fetchData = async () => {
        setLoading(true);
        
        try {
            let {data, error} = await apiCall(endpoint, opts);

            if (error)
                return setError(error);
            setData(data);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };
    
    useEffect(() => {
        (async () => { await fetchData() })();
    }, []);
    
    return {data, loading, error};
}