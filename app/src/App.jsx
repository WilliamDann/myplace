import { useNavigate } from 'react-router-dom';

import Signin          from './components/Signin';
import Error           from './components/ui/Error'

import { useState }    from 'react';
import useSession      from './api/useSession';

export default function()
{
    const navigate = useNavigate();

    const [token, setToken] = useSession();
    const [error, setError] = useState();

    // show sign in page if no token is stored
    if (!token) {
        return (
            <>
                <Error message={error?.message} onDismiss={() => setError(null)} />
                <Signin onSignIn={setToken} onError={setError}/>
            </>
        );
    }
    
    navigate('/place/');

    return (
    <>
        <Error message={error?.message} onDismiss={() => setError(null)} />

        <p>You should be redirected to the editor shortly...</p>
        <a href="/place/">Or click here...</a>
    </>
    )
}