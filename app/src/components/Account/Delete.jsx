import { useParams } from "react-router-dom";
import useApi, { apiCall } from "../useApi";
import InfoAlert from "../InfoAlert";
import Form from "../Form";
import ErrorPage from "../../pages/ErrorPage";

export default function({id})
{
    const {account_id = id}       = useParams();
    const {data, loading, error}  = useApi(
        {
            endpoint: '/account?account_id='+account_id,
            opts:
            {
                credentials: 'include'
            }
        }
    );

    // submit update request
    const submit = async (formData) => {
        if (!confirm("are you sure you want to delete you account?"))
            return;

        const {result, error} = await apiCall(
            '/account?account_id='+account_id,
            {
                method: 'DELETE',
                credentials: 'include'
            }
        );
        if (error)
            alert('update failed: ' + error.message);

        window.location = '/account';
    }

    if (loading)
        return <InfoAlert data={loading ? 'loading...': false} />
    if (error)
        return <ErrorPage data={error} />

    return (
        <div className="container-lg m-1 p-5">
            
            <h2 className='text-danger'>Delete Account</h2>
            <p className='text-muted'>Delete a user account.</p>

            <br />
            <Form fields={['display_name', 'email']} defaults={data} submit={submit} disabled={true} />
            <br />
        </div>
    );
}