// useSession.js
import { useEffect, useState } from 'react'
import Cookies from 'js-cookie'

export default function useSession() {
    const [token, setTokenState] = useState(null)
    const [place, setPlaceState] = useState(null)

    // Read cookies on first load
    useEffect(() => {
        setTokenState(Cookies.get('token') || null)
        setPlaceState(Cookies.get('place') || null)
    }, [])

    // Update cookies whenever state changes
    const setToken = (value) => {
        setTokenState(value)
        if (value) Cookies.set('token', value)
        else Cookies.remove('token')
    }

    const setPlace = (value) => {
        setPlaceState(value)
        if (value) Cookies.set('place', value)
        else Cookies.remove('place')
    }

    const clearSession = () => {
        setToken(null)
        setPlace(null)
    }

    return [ token, setToken, place, setPlace, clearSession ]
}
