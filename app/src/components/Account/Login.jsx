import { useState } from 'react';
import Form from '../Form';
import { apiCall } from '../useApi';
import ErrorAlert from '../ErrorAlert';
import ErrorPage from '../../pages/ErrorPage';

export default function()
{
    const [error, setError] = useState(null);

    const send = async (formData) => {
        const partial = {
            email: formData.get('Email'),
            password: formData.get('Password')
        }
        const {data, error} = await apiCall('/auth', {
            method: 'POST',
            body: new URLSearchParams(partial),
            credentials: 'include'
        })

        if (error)
        {
            setError(error)
            return;
        }

        window.location = '/account';
    }

    if (error) return <ErrorPage data={error} />

    return (
        <div className='container-lg m-1 p-5'>
            <h2>Account Login</h2>
            <p className='text-muted'>Login to your account, or <a href='/account/create'>Create an account</a>.</p>
            <Form fields={['Email', 'Password']} submit={send} />
        </div>
    )
}