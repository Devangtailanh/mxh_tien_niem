import { useEffect, useState } from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import Icon, { IconName } from "../shared/Icon";

const searchMenu = [
  {
    route: "/search",
    label: "Tất Cả",
    icon: "GalleryHorizontalEnd",
  },
  {
    route: "/search/posts",
    label: "Bài viết",
    icon: "StickyNote",
  },
  {
    route: "/search/users",
    label: "Mọi Người",
    icon: "User",
  },
  {
    route: "/search/groups",
    label: "Nhóm",
    icon: "UsersRound",
  },
];

const MenuSearch = () => {
  const [searchParams] = useSearchParams();
  const [searchText, setSearchText] = useState(searchParams.get("name"));
  const { pathname } = useLocation();
  useEffect(() => {
    setSearchText(searchParams.get("name"));
  }, [searchParams]);
  return (
    <div className="sticky top-[88px] bg-white h-screen basis-1/5 p-3 ">
      <div className="flex flex-col h-full">
        <p className="small-medium my-2">Bộ lọc</p>
        <div className="rounded-xl flex flex-col gap-2">
          {searchMenu.map((item) => (
            <Link
              key={item.route}
              to={`${item.route}?name=${searchText}`}
              className={`flex gap-4 py-2 items-center h-12 cursor-pointer hover:bg-blue-2 relative ${
                pathname === item.route && "bg-light rounded-lg"
              }`}
            >
              <div className="bg-blue-2 rounded-full  p-3 text-slate-600">
                <Icon name={item.icon as IconName} />
              </div>
              <h3 className="ml-2 text-base-medium relative">{item.label}</h3>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MenuSearch;
