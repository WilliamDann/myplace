import Table from "../Table";
import useApi from "../useApi";
import InfoAlert from "../InfoAlert";
import ErrorPage from "../../pages/ErrorPage";

export default function()
{
    // make api request
    const {data, loading, error}  = useApi(
        {
            endpoint: `/item/my`,
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
            <h2>My items</h2>
            <p className="text-muted">List of items you have created.</p>
            <a className="btn btn-primary mb-3" href="/item/create">New Item</a>

            {
                data.map(item => {
                    return (
                        <div className="container-lg border p-2 m-2" key={item.id}>
                            <Table data={item} />
                            <a className="btn btn-secondary m-1 pt-1 pb-1" href={`/item/read/${item.id}`}>View </a>
                            <a className="btn btn-secondary m-1 pt-1 pb-1" href={`/item/update/${item.id}`}>Update </a>
                            <a className="btn btn-secondary m-1 pt-1 pb-1" href={`/item/delete/${item.id}`}>Delete</a>
                        </div>
                    );
                })
            }
            <br />

        </div>
    );
}