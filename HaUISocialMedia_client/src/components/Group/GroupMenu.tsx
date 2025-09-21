import { groupMenu } from "@/constant";
import { Plus, Search } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import ListGroupJoined from "./ui/ListGroupJoined";
import Icon, { IconName } from "../shared/Icon";
import { ChangeEvent, useState } from "react";

const GroupMenu = () => {
  const { pathname } = useLocation();
  const [search, setSearch] = useState("");

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleNavigateSearchPage = () => {
    window.location.href = `/group/search-group?name=${search}`;
  };
  return (
    <div className="sticky top-[88px] bg-white  max-h-screen h-screen basis-1/5 p-3 overflow-y-auto">
      <div className="flex flex-col h-full">
        <h1 className="h3-bold">Nhóm</h1>
        <div className="flex items-center my-3">
          <Input
            type="text"
            placeholder="Tìm kiếm nhóm"
            className="border border-blue-600 h-full rounded-s-full"
            onChange={handleSearchChange}
          />
          <Button
            onClick={handleNavigateSearchPage}
            className="rounded-e-full h-full bg-blue-600"
            disabled={search.length === 0}
          >
            <Search />
          </Button>
        </div>

        <div className="mt-5 ">
          {groupMenu.map((link) => (
            <Link
              key={link.route}
              to={link.route}
              className={`flex items-center h-12 cursor-pointer hover:bg-blue-2 relative px-3 ${
                pathname === link.route && "bg-blue-2"
              }`}
            >
              <div className="flex gap-3 items-center">
                <div>
                  <Icon name={link.icon as IconName} />
                </div>

                <h3 className="ml-2 text-base-medium relative">{link.label}</h3>
              </div>
            </Link>
          ))}

          <Link
            to={`/group/create`}
            className="flex gap-2 justify-center bg-blue-200 text-blue-700 py-2 mt-5 rounded-md hover:bg-blue-100 font-semibold"
          >
            <Plus />
            Tạo Nhóm
          </Link>
        </div>

        <div className="w-full border border-slate-500 my-5"></div>
        <div className="flex flex-col gap-3">
          <p className="text-base font-semibold">Nhóm đã tham gia</p>
          <ListGroupJoined />
        </div>
      </div>
    </div>
  );
};

export default GroupMenu;
