import { Route }  from 'react-router-dom';
import Index  from './Index';
import Read   from './Read';
import Update from './Update';
import Delete from './Delete';
import Create from './Create';

export default function()
{
    return (
        <Route path='/place'>
            <Route index element={<Index />} />
            <Route path='create' element={<Create />} />
            <Route path='read/:place_id' element={<Read />} />
            <Route path='update/:place_id' element={<Update />} />
            <Route path='delete/:place_id' element={<Delete />} />
        </Route>
    )
}