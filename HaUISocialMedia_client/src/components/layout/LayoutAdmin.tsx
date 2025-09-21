import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";

const LayoutAdmin = () => {
  return (
    <div className="relative flex gap-5 overflow-y-auto">
      <AdminSidebar />
      <main className="flex-1 pr-5 ml-[20%]">
        <Outlet />
      </main>
    </div>
  );
};

export default LayoutAdmin;
