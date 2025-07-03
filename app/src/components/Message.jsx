import Alert from 'react-bootstrap/Alert';

export default function({message, onDismiss}) {
    if (!message) return;

    return (
    <Alert className="fixed-top m-5 mt-2 d-flex justify-content-between align-items-center" variant="danger">
        <div>Error: {message}</div>
        <button type="button" className="btn-close ms-2" aria-label="Close" onClick={onDismiss}></button>
    </Alert>
    )
}