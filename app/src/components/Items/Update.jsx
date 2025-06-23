import { useParams } from "react-router-dom";
import useApi, { apiCall } from "../useApi";
import InfoAlert from "../InfoAlert";
import Form from "../Form";
import ErrorPage from "../../pages/ErrorPage";

export default function({id})
{
    const {item_id = id}          = useParams();
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
        const partial = {
            display_name: formData.get('display_name'),
            description: formData.get('description')
        }

        const {result, error} = await apiCall(
            '/item?item_id='+item_id,
            {
                method: 'PUT',
                body: new URLSearchParams(partial),
                credentials: 'include'
            }
        );
        if (error)
            alert('update failed: ' + error.message);

        window.location = '/item'
    }

    if (loading)
        return <InfoAlert data={loading ? 'loading...': false} />
    if (error)
        return <ErrorPage data={error} />

    return (
        <div className="container-lg m-1 p-5">
            
            <h2>Update Item</h2>
            <p className='text-muted'>Update an item.</p>

            <br />
            <Form fields={['display_name', 'description']} defaults={data} submit={submit} />
            <br />
        </div>
    );
}