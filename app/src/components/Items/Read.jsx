import { useParams } from 'react-router-dom';
import useApi from '../useApi';

import InfoAlert  from '../InfoAlert';
import ErrorPage  from '../../pages/ErrorPage';
import Table      from '../Table';

export default function ({id})
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
    )

    if (error)
        return <ErrorPage data={error} />

    return (
        <div className="container-lg m-1 p-5">
            <InfoAlert data={loading ? 'loading...': false} />
            
            <h2>Read Item</h2>
            <p className='text-muted'>Read an item.</p>

            <br />
            <Table data={data} />
            <br />
        </div>
    )
}