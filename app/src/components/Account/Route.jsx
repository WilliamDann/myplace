import { Route }  from 'react-router-dom';
import Index  from './Index';
import Read   from './Read';
import Update from './Update';
import Delete from './Delete';
import Create from './Create'
import Login  from './Login';

export default function()
{
    return (
        <Route path='/account'>
            <Route index element={<Index />} />
            <Route path='create' element={<Create />} />
            <Route path='read/:account_id' element={<Read />} />
            <Route path='update/:account_id' element={<Update />} />
            <Route path='delete/:account_id' element={<Delete />} />
            <Route path='login' element={<Login  />} />
        </Route>
    )
}