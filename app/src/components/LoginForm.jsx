import { useState } from "react";
import ErrorAlert from './ErrorAlert';

export default function()
{
    const [token, setToken]   = useState(null);
    const [loading, setLoading] = useState(false);
    const [error  , setError]   = useState(null);

    // handle form submission
    const submit = async (formData) => {
        // get partial user account from form data
        const partial = {
            email        : formData.get('email'),
            password     : formData.get('password'),
        };

        if (!partial.email || !partial.password)
            return setError(new Error("Invalid login info!"))

        // submit request
        setLoading(true);
        try {
            const response = await fetch(
                `${import.meta.env.VITE_BASE_API}/auth`,
                {
                    method: 'POST',
                    body: new URLSearchParams(partial),
                    credentials: 'include'
                }
            );
    
            // get json response
            const result = await response.json();
            if (result.error) 
                throw new Error(result.error.message);
    
            // set state
            setToken(result)
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    }

    if (loading) return <p>loading...</p>
    if (token) window.location = '/'

    return (
        <div className="container bg-body-tertiary p-4 text-center">
            <ErrorAlert data={error} />
            <div className="row">
                <div className="col-sm"></div>
                <div className="col-lg">
                    <h4>Account Login</h4>
                    <p>Login to your account, or <a href="create">Create Account</a> </p>
                    <br />
                <form action={submit} >
                <div className="form-group text-start">
                    <label htmlFor="email">Email address</label>
                    <input type="email" className="form-control" name="email" aria-describedby="email" placeholder="Enter email" />
                </div>
                <br />

                <div className="form-group text-start">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" name="password" placeholder="Password" />
                </div>
                <br />

                <button type="submit" className="btn btn-primary">Login</button>
                </form>
                </div>
                <div className="col-sm"></div>
            </div>
        </div>
    )
}