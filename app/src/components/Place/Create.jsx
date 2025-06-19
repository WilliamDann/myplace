import Form from "../Form";
import ErrorPage from "../../pages/ErrorPage";
import { apiCall } from "../useApi";
import { useState } from "react";

export default function()
{
    const [error, setError] = useState(null);

    // submit update request
    const submit = async (formData) => {
        const partial = {
            display_name : formData.get('Display Name'),
            address      : formData.get('Address'),
        }

        const {result, error} = await apiCall(
            '/place',
            {
                method: 'POST',
                body: new URLSearchParams(partial),
                credentials: 'include'
            }
        );

        if (error)
            return setError(error)

        window.location = '/place';
    }

    if (error)
        return <ErrorPage data={error} />

    return (
        <div className="container-lg m-1 p-5">
            
            <h2>Create Place</h2>
            <p className='text-muted'>Create a new place</p>

            <br />
            <Form fields={['Display Name', 'Address']} submit={submit} />
            <br />
        </div>
    );
}