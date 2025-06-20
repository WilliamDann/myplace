export default function({fields, defaults, submit, disabled=false})
{
    if (!defaults)
        defaults = {};

    const renderField = (field) => (
        <div key={field} className='form-group'>
            <label htmlFor={field}>{field}</label>
            <input type="text" disabled={disabled} className='form-control' name={field} placeholder={`${field}...`} defaultValue={defaults[field]} />
        </div>
    ) 

    return (
        <div className='container-lg'>
            <form action={submit}>
                {fields.map(renderField)}
                <br />
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}