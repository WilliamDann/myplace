import { Outlet } from "react-router-dom";
import SideBar from "../components/SideBar";

export default function() {
  return (
    <div className="d-flex vh-100">
      <div className="bg-dark text-white" style={{ width: '215px' }}>
        <SideBar />
      </div>

      {/* Flexible main content */}
      <div className="flex-grow-1 p-4">
        <Outlet />
      </div>
    </div>
  );
}