import { Outlet } from 'react-router-dom';
import AppNav from './components/AppNav';

export default function Layout() {
  return (
    <div className="container-lg w-100 h-100 m-0 p-0">
      <div className="row h-100">
        <div className="col-md-4 h-100">
          <AppNav />
        </div>

        <div className="col p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
}