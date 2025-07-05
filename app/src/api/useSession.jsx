// useSession.js
import { useEffect, useState } from 'react'
import Cookies from 'js-cookie'

export default function useSession() {
    const [token, setTokenState] = useState(() => Cookies.get('token') || null)

    // Update cookies whenever state changes
    const setToken = (value) => {
        setTokenState(value)
        if (value) Cookies.set('token', value)
        else Cookies.remove('token')
    }

    return [ token, setToken ]
}
