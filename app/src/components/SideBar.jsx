import { BoxSeam, BarChartLine, Receipt, House } from "react-bootstrap-icons"
import { Link }                                  from "react-router-dom"

export default function()
{
    return (
        <>
            <div className="d-flex flex-column flex-shrink-0 p-2 text-white bg-dark h-100" style={{width: '200px'}}>
                <Link to="/" className="d-flex text-white text-decoration-none">
                    <svg className="bi me-2" width="40" height="32"><use xlinkHref="#bootstrap"></use></svg>
                    <span className="fs-4">MyPlace</span>
                </Link>
                <br />
                <ul className="nav nav-pills flex-column mb-auto">

                <li>
                    <Link to="" className="nav-link text-white">
                        <BarChartLine />
                        <span> Dashboard</span>
                    </Link>
                </li>
                <li>
                    <Link to="inventory" className="nav-link text-white inline">
                       <BoxSeam />
                        <span> Inventory</span>
                    </Link>
                </li>
                <li>
                    <Link to="bills" className="nav-link text-white">
                        <Receipt />
                        <span> Bills</span>
                    </Link>
                </li>
                <li>
                    <Link to="place" className="nav-link text-white">
                        <House />
                        <span> Place</span>
                    </Link>
                </li>
                </ul>
                <hr />

                <Link to="#" className="d-flex align-items-center text-white text-decoration-none">
                    <strong>My Account</strong>
                </Link>
            </div>
        </>
    )
}