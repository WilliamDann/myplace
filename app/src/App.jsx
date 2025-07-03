import Cookies from 'js-cookie'
import Signin  from './components/Signin';
import { useState } from 'react';

export default function()
{
    const [token, setToken] = useState();
    const [error, setError] = useState();

    if (!token) {
        const cookie = Cookies.get('token')
        if (cookie)
            setToken(cookie)
        else
            return <Signin onSignIn={setToken} />
    }

    return <></>
}