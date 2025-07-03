import BuildingsSticky from '../components/BuildingsSticky'
import PageGradient    from '../components/PageGradient'

import Form            from 'react-bootstrap/Form'
import Button          from 'react-bootstrap/Button'

import {apiCall} from '../useApi';

export default function()
{
    const submit = async (formData) => {
        const partial = {
            email: formData.get('email'),
            password: formData.get('password')
        }

        const {data, err} = await apiCall('/auth', {
            method: "POST",
            body: new URLSearchParams(partial),
            credentials: 'include'
        });

        if (err) {
            console.error(err);
            return;
        }
    }

    return (
        <>
            <BuildingsSticky />
            <PageGradient>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100vh',
                        width: '100vw',
                    }}>
                    <div
                    style={{
                        border: "1px solid grey",
                        borderRadius: "10px",
                        backgroundColor: "rgba(255, 255, 255, 0.1)",
                        backdropFilter: "blur(10px)",
                        WebkitBackdropFilter: "blur(10px)", // Safari support
                        width: "70%",
                        height: "70%"
                    }}
                    className="p-3 text-center text-white"
                    >

                        <h1>Sign In</h1>
                        <p className='text-white'>Sign in to your MyPlace account.</p>
                        <Form action={submit} className='text-white p-5'>
                        <Form.Group className="mb-3" controlId="email">
                            <Form.Control name="email" className="p-2" type="email" placeholder="Enter email" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="password">
                            <Form.Control name="password" className="p-2" type="password" placeholder="Password" />
                        </Form.Group>
                        <Form.Group className="mb-3 text-start" controlId="formBasicCheckbox">
                            <Form.Check type="checkbox" label="Remember me" />
                        </Form.Group>
                        <Button className="w-100 rounded m-2" type="submit">
                            Submit
                        </Button>

                        <Button className="text-white w-100 rounded m-2">
                            Or Create an Account
                        </Button>
                        </Form>
                    </div>
                </div>
            </PageGradient>
        </>
    )
}