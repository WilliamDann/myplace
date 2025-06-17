import { useEffect, useState }  from "react";
import { useParams } from "react-router-dom";

import InfoAlert from './InfoAlert';
import ErrorAlert from "./ErrorAlert";
import Table from "./Table";
import Form from "./Form";

export default function ({initalMode='read'})
{
    const {account_id}          = useParams();
    let [mode, setMode]         = useState(initalMode);
    let [account, setAccount]   = useState(null);
    let [loading, setLoading]   = useState(false);
    let [error  , setError]     = useState(null);

    // request helpers
    const getId          = () => account ? account.id : account_id;
    const getBaseApiUrl  = () => import.meta.env.VITE_BASE_API
    const getEndpointUrl = () => getId() ? `/account?account_id=${getId()}` : '/account/my';
    const getRequestUrl  = () => getBaseApiUrl() + getEndpointUrl();
    const getFetchOpts   = (method = 'GET', formData = null) => 
    {
        const base = { method: method, credentials: 'include' }
        if (formData)
            base['body'] = new URLSearchParams(formData);
        return base
    }

    // if a request should be sent
    const shouldRequest = () => !account && !error && !loading

    // read formData from create form
    const readFormData   = (formData) => {
        return {
            display_name : formData.get('display_name'),
            email        : formData.get('email'),
            password     : formData.get('password')
        };
    }

    // filter out given params on an object
    const filterOut = (params, obj) => {
        for (let param of params)
            delete obj[param]
        return obj
    }

    // send a fetch request
    const sendRequest = async (endpoint, opts) => 
    {
        setLoading(true);
        try
        {
            const response = await fetch(endpoint, opts);
            const result   = await response.json();
    
            if (result.error || !response.ok)
                throw new Error(result.error.message);

            return result;
        } catch (err) {
            setError(err);
            return null;
        } finally {
            setLoading(false);
        }
    }

    // create new user using api endpoint
    const create = async (formData) => 
    {
        setAccount(
            await sendRequest(
                getBaseApiUrl() + `/account`, 
                getFetchOpts('POST', readFormData(formData))
            )
        );
        setMode('read');
    }

    // read user from api endpoint
    const read = async () => setAccount(await sendRequest(getRequestUrl(), getFetchOpts()));

    // update user using api endpoint
    const update = async (formData) => 
    {
        setAccount(
            await sendRequest(
                getBaseApiUrl() + `/account?account_id=${account.id}`,
                getFetchOpts('PUT', filterOut(['password'], readFormData(formData)))
            )
        );
        setMode('read');
    }

    // delete user using api endpoint
    const del = async () => 
    {
        await sendRequest(
            getBaseApiUrl() + `/account?account_id=${account.id}`,
            getFetchOpts(method='delete'));

        if (!error)
            setAccount(null);

        setMode('login');
    }

    // set mode to read
    const login = async (formData) =>
    {
        await sendRequest(
            getBaseApiUrl() + '/auth',
            getFetchOpts('POST', readFormData(formData))
        );

        setMode('read');
    }

    // load user data first if reading
    useEffect(() => {
        if (mode == 'read' && shouldRequest())
            read();
    });

    // view modes
    const modes = {
        create: () => Form(['display_name', 'email', 'password'], {}, create),
        read: () => Table(account),
        update: () => Form(['display_name', 'email'], account, update),
        delete: () => Form(['display_name', 'email'], account, del, true),
        login: () => Form(['email', 'password'], {}, login)
    }

    
    // if we're loading wait
    if (loading) return <InfoAlert data={loading ? 'Loading...' : null} />
    if (mode == 'read' && error) 
    {
        console.log(error);
        mode = 'login';
        error = null
    }
    
    // show component
    return (
        <div className="container bg-body-tertiary p-4 text-center">
            <InfoAlert data={loading ? 'Loading...' : null} />
            <ErrorAlert data={error} />

            <h4>{mode} User Account</h4>
            <p>{mode} a user account.</p>

            {modes[mode]()}
        </div>
    )
}