export default function({data})
{
    if (!data) return;
    return (
        <div className="alert alert-info" role="alert">
            {''+data}
        </div>
    )
}