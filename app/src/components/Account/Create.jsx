import { apiCall } from "../useApi";
import InfoAlert from "../InfoAlert";
import Form from "../Form";
import ErrorPage from "../../pages/ErrorPage";
import { useState } from "react";

export default function()
{
    const [error, setError] = useState(null);

    // submit update request
    const submit = async (formData) => {
        const partial = {
            display_name: formData.get('Display Name'),
            email: formData.get('Email'),
            password: formData.get('Password')
        }

        const {result, error} = await apiCall(
            '/account',
            {
                method: 'POST',
                body: new URLSearchParams(partial),
                credentials: 'include'
            }
        );
        if (error)
            return setError(error)

        window.location = '/account/login';
    }

    if (error)
        return <ErrorPage data={error} />

    return (
        <div className="container-lg m-1 p-5">
            
            <h2>Create Account</h2>
            <p className='text-muted'>Create a user account, or <a href='/account/login'>login</a></p>

            <br />
            <Form fields={['Display Name', 'Email', 'Password']} submit={submit} />
            <br />
        </div>
    );
}