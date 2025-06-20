import Table from "../Table";
import useApi from "../useApi";
import InfoAlert from "../InfoAlert";
import ErrorPage from "../../pages/ErrorPage";

export default function()
{
    // make api request
    const {data, loading, error}  = useApi(
        {
            endpoint: `/place/my`,
            opts:
            {
                credentials: 'include'
            }
        }
    )

    // handle request error
    if (error) return <ErrorPage data={error} />

    // don't render until load complete
    if (loading)
        return <InfoAlert data={loading ? 'loading...': false} />


    return (
        <div className='container-lg m-1'>
            <h2>My places</h2>
            <p className="text-muted">List of places you have created.</p>
            <a className="btn btn-primary mb-3" href="/place/create">New Place</a>

            {
                data.map(item => {
                    return (
                        <div className="container-lg border p-2 m-2" key={item.id}>
                            <Table data={item} />
                            <a className="btn btn-secondary m-1 pt-1 pb-1" href={`/place/read/${item.id}`}>View </a>
                            <a className="btn btn-secondary m-1 pt-1 pb-1" href={`/place/update/${item.id}`}>Update </a>
                            <a className="btn btn-secondary m-1 pt-1 pb-1" href={`/place/delete/${item.id}`}>Delete</a>
                        </div>
                    );
                })
            }
            <br />

        </div>
    );
}