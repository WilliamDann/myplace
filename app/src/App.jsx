import Cookies from 'js-cookie'
import Signin  from './pages/Signin';

export default function()
{
    const userToken = Cookies.get('token');
    if (!userToken) {
        return <Signin />
    }

    return <></>
}