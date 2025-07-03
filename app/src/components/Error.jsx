import Alert from 'react-bootstrap/Alert';

export default function({message}) {
    if (!message) return;

    return <Alert className="fixed-top m-2" variant='danger'>Error: {message}</Alert>
}