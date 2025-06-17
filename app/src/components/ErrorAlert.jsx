export default function({data})
{
    if (!data) return;
    return (
        <div className="alert alert-danger" role="alert">
            {''+data}
        </div>
    )
}