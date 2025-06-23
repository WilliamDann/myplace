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
            upc: formData.get('UPC Code'),
            display_name: formData.get('Display Name'),
            description: formData.get('Description'),
        }

        const {result, error} = await apiCall(
            '/item',
            {
                method: 'POST',
                body: new URLSearchParams(partial),
                credentials: 'include'
            }
        );
        if (error)
            return setError(error)

        window.location = '/item';
    }

    if (error)
        return <ErrorPage data={error} />

    return (
        <div className="container-lg m-1 p-5">
            
            <h2>Create Item</h2>
            <p className='text-muted'>Create a new item, or <a href='#'>Search for an existing item</a></p>

            <br />
            <Form fields={['UPC Code', 'Display Name', 'Description']} submit={submit} />
            <br />
        </div>
    );
}