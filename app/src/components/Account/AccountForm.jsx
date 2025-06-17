import { useState } from "react";
import ErrorAlert from '../ErrorAlert';

export default function()
{
    const [account, setAccount] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error  , setError]   = useState(null);

    // handle form submission
    const submit = async (formData) => {
        // get partial user account from form data
        const partial = {
            display_name : formData.get('display_name'),
            email        : formData.get('email'),
            password     : formData.get('password'),
        };

        if (!partial.display_name || !partial.email || !partial.password)
            return setError(new Error("Invalid account info!"))

        // submit request
        setLoading(true);
        try {
            const response = await fetch(
                `${import.meta.env.VITE_BASE_API}/account`,
                {
                    method: 'POST',
                    body: new URLSearchParams(partial)
                }
            );
    
            // get json response
            const result = await response.json();
            if (result.error) 
                throw new Error(result.error.message);
    
            // set state
            setAccount(result)
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    }

    if (account) window.location = `/account/read/${account.id}`
    if (loading) return <p>loading...</p>

    return (
        <div className="container bg-body-tertiary p-4 text-center">
            <ErrorAlert data={error} />
            <div className="row">
                <div className="col-sm"></div>
                <div className="col-lg">
                    <h4>Create Account</h4>
                    <p>Create a new account, or <a href="login">Sign In</a> </p>
                    <br />
                <form action={submit} >
                <div className="form-group text-start">
                    <label htmlFor="email">Email address</label>
                    <input type="email" className="form-control" name="email" aria-describedby="email" placeholder="Enter email" />
                </div>
                <br />

                <div className="form-group text-start">
                    <label htmlFor="display_name">Display Name</label>
                    <input type="text" className="form-control" name="display_name" aria-describedby="display_name" placeholder="Enter Name" />
                    <small id="display_name" className="form-text text-muted">Your Display Name does not have to be unique.</small>
                </div>
                <br />

                <div className="form-group text-start">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" name="password" placeholder="Password" />
                </div>
                <br />

                <button type="submit" className="btn btn-primary">Create Account</button>
                </form>
                </div>
                <div className="col-sm"></div>
            </div>
        </div>
    )
}