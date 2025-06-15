import { useParams } from 'react-router-dom';
import Table from './Table';
import { useEffect, useState } from "react";

export default function()
{
    const {account_id}          = useParams()
    const [account, setAccount] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error  , setError]   = useState(null);

    // load requested data upon component creation
    useEffect(() => {
        (async () => {
            // set state to loading
            setLoading(true);

            try {
                // make request
                const response = await fetch(`${import.meta.env.VITE_BASE_API}/account?account_id=${account_id}`);
                if (!response.ok)
                    throw new Error((await response.json()).error.message);

                // get json response
                const result = await response.json();
                if (result.error)
                    throw new Error(result.error.message);

                // set state
                setAccount(result);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    if (loading) return <p>loading...</p>
    if (error)   return <p>Error: {error.message}</p>

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