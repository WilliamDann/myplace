import { useParams } from 'react-router-dom';
import useApi from '../useApi';

import InfoAlert  from '../InfoAlert';
import ErrorPage  from '../../pages/ErrorPage';
import Table      from '../Table';

export default function ({id})
{
    const {place_id = id}         = useParams();
    const {data, loading, error}  = useApi(
        {
            endpoint: '/place?place_id='+place_id,
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
            
            <h2>Read Place</h2>
            <p className='text-muted'>Read place information.</p>

            <br />
            <Table data={data} />
            <br />
        </div>
    )
}