import { Link, useLocation } from "react-router-dom";
import { sidebarAdmin } from "@/constant";
import LocalStorage from "@/services/LocalStorageService";

import { memo } from "react";
import { observer } from "mobx-react";
import LogoutButton from "../Auth/ui/LogoutButton";
import Icon, { IconName } from "../shared/Icon";

function AdminSidebar() {
  const { pathname } = useLocation();
  const currentUser = LocalStorage.getLoggedInUser();

  return (
    <div className="fixed top-0  bg-white h-screen basis-1/5 p-3">
      <div className="flex flex-col justify-between h-full">
        <div>
          <Link to="/admin" className="mt-5 flex items-center gap-5 mb-3">
            <div className="profile-image">
              <img src="/logo-haui.png" />
            </div>
            <span className="text-body-bold">HauiSocial</span>
          </Link>

          <div>
            <div className="flex items-center gap-x-4 w-full py-2 hover:bg-blue-2 px-3 rounded-md my-3">
              <div className="">
                <img
                  src={currentUser?.avatar || "/person.jpg"}
                  alt="avartar"
                  className="size-10 rounded-full object-cover"
                />
              </div>
              <p className="text-body-bold font-semibold">
                {currentUser?.lastName} {currentUser?.firstName}
              </p>
            </div>

            <div className="rounded-xl flex flex-col gap-3">
              {sidebarAdmin.map((link) => (
                <Link
                  key={link.route}
                  to={link.route}
                  className={`flex items-center px-4 h-12 cursor-pointer hover:bg-blue-2 rounded-md relative ${
                    pathname === link.route && "bg-grey-2 "
                  }`}
                >
                  <Icon name={link.icon as IconName} />
                  <h3 className="ml-2 text-base-medium relative">
                    {link.label}
                  </h3>
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="mb-5">
          <LogoutButton isAdminPage />
        </div>
      </div>
    </div>
  );
}

export default memo(observer(AdminSidebar));
