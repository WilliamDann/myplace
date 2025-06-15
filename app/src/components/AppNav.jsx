
// applicaiton nav bar
export default function AppNav()
{
  return (
    <nav className="navbar navbar-expand-lg text-light bg-primary sticky-top">
      <div className="container-fluid">
        <a className="navbar-brand fw-bolder" href="/">MyPlace</a>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a href="/dashboard" className="nav-link fw-bold" aria-current="page">Dashboard</a>
            </li>

            <li className="nav-item">
              <a className="nav-link fw-bold" href="/account">Account</a>
            </li>

            <li className="nav-item">
              <a className="nav-link fw-bold" href="/place">Places</a>
            </li>

            <li className="nav-item">
              <a className="nav-link fw-bold" href="/item">Items</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}