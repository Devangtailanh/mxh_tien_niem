import { Link, useLocation } from "react-router-dom";
import { sidebarLink } from "@/constant";
import LocalStorage from "@/services/LocalStorageService";
import Icon, { IconName } from "../shared/Icon";
const Sidebar = () => {
  const { pathname } = useLocation();
  const currentUser = LocalStorage.getLoggedInUser();
  return (
    <div className="sticky h-max top-[5.4rem] ">
      <Link
        to={`/profile/${currentUser?.id}`}
        className="flex items-center gap-x-4 w-full p-4 hover:bg-blue-2 rounded-2xl"
      >
        <div className="profile-photo">
          <img
            src={currentUser?.avatar || "/person.jpg"}
            alt="avartar"
            className="w-10 h-10 rounded-full object-cover"
          />
        </div>
        <p className="text-body-bold font-semibold">
          {currentUser?.lastName} {currentUser?.firstName}
        </p>
      </Link>

      <div className="rounded-xl">
        {sidebarLink.map((link) => (
          <Link
            key={link.route}
            to={link.route}
            className={`${link?.disabled && 'disableLeftSideBarItem'} flex items-center ml-3 h-16 cursor-pointer hover:bg-blue-2 relative rounded-md ${pathname === link.route && "sidebar-active"
              }`}
          >
            <div className={` bg-blue-2 rounded-full  p-3 text-slate-600 shadow-sm `}>
              <Icon name={link.icon as IconName} />
            </div>
            <h3 className="ml-6 text-body-medium relative">{link.label}</h3>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
