import { BoxSeamFill, GeoAltFill, House, Person, Speedometer2 } from 'react-bootstrap-icons'


// applicaiton nav bar
export default function AppNav()
{
  return (
    <div className='d-flex flex-column flex-shrink-0 p-3 text-white bg-dark h-100' style={{width: '250px'}}>
      <br />
      <a className='text-white text-decoration-none text-center fs-4' href="/">
        <span>MyPlace</span>
      </a>
      <hr />

      <a className='d-block m-2 text-white text-decoration-none text-start fs-4' href="/">
        <House className='text-secondary m-2' size={22} />
        <span>Home</span>
      </a>
      
      <a className='d-block m-2 text-white text-decoration-none text-start fs-4' href="/dashboard">
        <Speedometer2 className='text-secondary m-2' size={22} />
        <span>Dashboard</span>
      </a>

      <a className='d-block m-2 text-white text-decoration-none text-start fs-4' href="/place">
      <GeoAltFill className='text-secondary m-2' size={22} />
        <span>Places</span>
      </a>

      <a className='d-block m-2 text-white text-decoration-none text-start fs-4' href="/item">
        <BoxSeamFill className='text-secondary m-2' size={22} />
        <span>Items</span>
      </a>
      

        <hr />
      <div className='fixed-bottom p-3 m-3'>
        <Person className='text-secondary m-2' size={22} />
        <a className="text-white text-decoration-none text-start" href='/account'>My Account</a>
      </div>
    </div>
  );
}