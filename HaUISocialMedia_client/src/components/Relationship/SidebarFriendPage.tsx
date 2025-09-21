import { sidebarFriendPage } from "@/constant";
import { Link, useLocation } from "react-router-dom";

const SidebarFriendPage = () => {
  const { pathname } = useLocation();
  return (
    <div className="sticky h-screen top-[1rem] ">
      <div className="h-full  bg-white  rounded-r-md pl-3 shadow-sm">
        {sidebarFriendPage.map((link) => (
          <Link
            key={link.route}
            to={link.route}
            className={`flex items-center h-16 cursor-pointer relative  hover:bg-blue-2 ${
              pathname === link.route && "sidebar-active"
            }`}
          >
            <img src={link.icon} alt="icon" className="w-8 h-8 ml-8 relative" />
            <h3 className="ml-6 text-base relative">{link.label}</h3>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SidebarFriendPage;
