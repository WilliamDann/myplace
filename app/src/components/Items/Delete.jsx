import { useParams } from "react-router-dom";
import useApi, { apiCall } from "../useApi";
import InfoAlert from "../InfoAlert";
import Form from "../Form";
import ErrorPage from "../../pages/ErrorPage";

export default function({id})
{
    const {item_id = id}           = useParams();
    const {data, loading, error}  = useApi(
        {
            endpoint: '/item?item_id='+item_id,
            opts:
            {
                credentials: 'include'
            }
        }
    );

    // submit update request
    const submit = async (formData) => {
        if (!confirm("are you sure you want to delete this item?"))
            return;

        const {result, error} = await apiCall(
            '/item?item_id='+item_id,
            {
                method: 'DELETE',
                credentials: 'include'
            }
        );
        if (error)
            alert('update failed: ' + error.message);

        window.location = '/item';
    }

    if (loading)
        return <InfoAlert data={loading ? 'loading...': false} />
    if (error)
        return <ErrorPage data={error} />

    return (
        <div className="container-lg m-1 p-5">
            
            <h2 className='text-danger'>Delete Item</h2>
            <p className='text-muted'>Delete an item.</p>

            <br />
            <Form fields={['id', 'display_name', 'description', 'upc']} defaults={data} submit={submit} disabled={true} />
            <br />
        </div>
    );
}