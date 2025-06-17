import { useParams } from 'react-router-dom';
import Table from '../Table';
import { useEffect, useState } from "react";

export default function({signedIn = false})
{
    const {account_id}          = useParams()
    const [account, setAccount] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error  , setError]   = useState(null);
    
    // submit a creation request to the api
    const create = async (formData) => 
    {
        if (loading)
            throw new Error('already loading another record');
        if (account_id)
            throw new Error('an account is already loaded')
        
        // load data from form
        const partial = {
            display_name: formData.get('display_name'),
            email: formData.get('email'),
            password: formData.get('password')
        }

        // validate data
        if (!partial.display_name || !partial.email || !partial.password)
            return setError(new Error("Invalid account info!"));


        // submit creation request
        setLoading(true);
        try {
            const response = await fetch(
                `${import.meta.env.VITE_BASE_API}/account`,
                {
                    method: 'POST',
                    body: new URLSearchParams(partial)
                }
            );

            // get json response
            const result = await json.response();
            if (result.error)
                throw new Error(result.error.message);

            // set account to created account
            setAccount(result);
       } catch (err) {
            setError(err);
       } finally {
            setLoading(false);
       }
    }

    // read 
    const read = async (account_id) =>
    {
        if (loading)
            throw new Error("already loading another record");
        
        setLoading(true);
        let url = `/account/my`;
        if (account_id)
            url = `/account?account_id=${account_id}`;
        
        try {
            const response = await fetch(`${import.meta.env.VITE_BASE_API}${url}`, { credentials: 'include' });
            const result   = await response.json();
            if (result.error)
                throw new Error(result.error.message);
            
            setAccount(result);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    }
    
    const update = async (account_id) =>
    {
    }
    
    const delete = async (account_id) =>
    {
        
    }
    
    // load requested data upon component creation
    useEffect(() => read);
    
    if (loading) return <p>loading...</p>
    if (error)   return window.location = '/account/login';
    
    return (
        <div className="container bg-body-tertiary p-4 text-center">
        <div className="row">
        <div className="col-sm"></div>
        <div className="col-lg">
        <h4>Account Info</h4>
        <p className="text-muted">User account data</p>
        
        <br />
        <Table data={account} />
        <br />
        
        <a className = "btn btn-primary m-2" href={`../update/${account_id}`}>Update</a>
        <a className = "btn btn-danger m-2" href={`../delete/${account_id}`}>Update</a>
        </div>
        <div className="col-sm"></div>
        </div>
        </div>
    )
}