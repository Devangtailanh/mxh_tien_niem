import { Outlet } from "react-router-dom";
import GroupMenu from "./GroupMenu";

const GroupLayout = () => {
  return (
    <div className="flex gap-5">
      <GroupMenu />
      <main className="flex-1 pr-3">
        <Outlet />
      </main>
    </div>
  );
};

export default GroupLayout;
