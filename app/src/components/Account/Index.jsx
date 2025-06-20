import Read from "./Read";
import useApi from "../useApi";
import InfoAlert from "../InfoAlert";

export default function()
{
    // make api request
    const {data, loading, error}  = useApi(
        {
            endpoint: `/account/my`,
            opts:
            {
                credentials: 'include'
            }
        }
    )
    
    // on logout button press
    const logout = () => {
        if (!confirm("LOGOUT: are you sure you want to log out?"))
            return;
        
        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";        
        document.location.reload();
    }

    // handle request error
    if (error)
    {
        window.location = '/account/login';
        return;
    }

    // don't render until load complete
    if (loading)
        return <InfoAlert data={loading ? 'loading...': false} />

    return (
        <div className='container-lg m-1'>
            <Read id={data.id} />
            <a className="btn btn-primary m-1" href={`/account/update/${data.id}`}>Update</a>
            <a className="btn btn-primary  m-1" href={`/account/delete/${data.id}`}>Delete</a>
            <br />
            <br />
            <a className="btn btn-danger m-1" onClick={logout}>Logout</a>
        </div>
    );
}