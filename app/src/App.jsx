import Cookies from 'js-cookie'
import Signin  from './components/Signin';
import Layout  from './Layout';

import { useEffect, useState } from 'react';

export default function()
{
    const [token, setToken] = useState();
    const [error, setError] = useState();

    // run once to check for 'remember me' sign-in
    useEffect(() => {
        const cookie = Cookies.get('token')
        if (cookie)
            setToken(cookie)
    });

    // show sign in page if user isn't signed in
    if (!token)
        return (
            <Layout error={error}>
                <Signin onError={setError} onSignIn={setToken}/>
            </Layout>
        );

    // show main page
    return (
        <Layout error={error}>
            <p>Page</p>
        </Layout>
    )
}