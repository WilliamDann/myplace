export default function()
{
    const goBack = () => {
      window.history.back()
    };

    const goTo = (location) => {
        window.location = location;
    }

    return (
        <div className="container-lg">
            <p>Sorry, this page was not found!</p>
            <br />
            <button className="btn btn-primary m-2" onClick={goBack}>Go Back</button>
            <button className="btn btn-primary m-2" onClick={() => goTo('/dashboard')}>Dashboard</button>
        </div>
    );
}