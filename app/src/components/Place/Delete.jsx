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
        if (!confirm("are you sure you want to delete this place?"))
            return;

        const {result, error} = await apiCall(
            '/place?place_id='+place_id,
            {
                method: 'DELETE',
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
            
            <h2 className='text-danger'>Delete Place</h2>
            <p className='text-muted'>Delete a place.</p>

            <br />
            <Form fields={['display_name', 'address']} defaults={data} submit={submit} disabled={true} />
            <br />
        </div>
    );
}