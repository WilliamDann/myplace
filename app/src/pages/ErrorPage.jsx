import Table from "../components/Table";

export default function({data})
{
    const goBack = () => {
      window.history.back()
    };

    const goTo = (location) => {
        window.location = location;
    }

    return (
        <div className="container-lg">
            <h4 className="text-danger">Sorry, we got this error:</h4>

            <br />
            <Table data={data} />
            <br />

            <button className="btn btn-primary m-2" onClick={goBack}>Go Back</button>
            <button className="btn btn-primary m-2" onClick={() => goTo('/dashboard')}>Dashboard</button>
        </div>
    );
}