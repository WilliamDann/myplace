import Signin  from './components/Signin';
import Error   from './components/Error'

import { useState } from 'react';
import PlaceSelect  from './components/PlaceSelect';
import useSession   from './useSession';
import Editor       from './Editor';

export default function()
{
    const [token, setToken, place, setPlace, clearSession] = useSession();
    const [error, setError]                                = useState();

    // show sign in page if no token is stored
    if (!token) {
        return (
            <>
                <Error message={error?.message} onDismiss={() => setError(null)} />
                <Signin onSignIn={setToken} onError={setError}/>
            </>
        );
    }

    console.log(token)
    console.log(place)

    // show place select if no placeid is stored
    if (!place) {
        return (
            <>
                <Error message={error?.message} onDismiss={() => setError(null)} />
                <PlaceSelect onSelect={setPlace} onError={setError} />
            </>
        )
    }
    

    return (
    <>
        <Error message={error?.message} onDismiss={() => setError(null)} />

        <Editor />
    </>
    )
}