import { useParams } from "react-router-dom";
import useApi, { apiCall } from "../useApi";
import InfoAlert from "../InfoAlert";
import Form from "../Form";
import ErrorPage from "../../pages/ErrorPage";

export default function({id})
{
    const {place_id = id}       = useParams();
    const {data, loading, error}  = useApi(
        {
            endpoint: '/place?place_id='+place_id,
            opts:
            {
                credentials: 'include'
            }
        }
    );

    // submit update request
    const submit = async (formData) => {
        const partial = {
            display_name: formData.get('display_name'),
            address: formData.get('address')
        }

        const {result, error} = await apiCall(
            '/place?place_id='+place_id,
            {
                method: 'PUT',
                body: new URLSearchParams(partial),
                credentials: 'include'
            }
        );
        if (error)
            alert('update failed: ' + error.message);

        window.location = '/place';
    }

    if (loading)
        return <InfoAlert data={loading ? 'loading...': false} />
    if (error)
        return <ErrorPage data={error} />

    return (
        <div className="container-lg m-1 p-5">
            
            <h2>Update Place</h2>
            <p className='text-muted'>Update a user place.</p>

            <br />
            <Form fields={['display_name', 'address']} defaults={data} submit={submit} />
            <br />
        </div>
    );
}