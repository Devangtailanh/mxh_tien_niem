import { useGetAllDataByKeyword } from "@/lib";
import { useStore } from "@/stores";
import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import NoData from "../shared/NoData";
import PostList from "../Post/PostList";
import UserListSearch from "./ui/UserListSearch";
import GroupListSearch from "./ui/GroupListSearch";
import { Skeleton } from "../ui/skeleton";

const Loading = () => {
  return (
    <div className="w-full h-screen flex flex-col gap-4 mt-5">
      {"1234567".split("").map((i) => (
        <div className="w-full h-10" key={i}>
          <Skeleton className="w-full h-full rounded-lg" />
        </div>
      ))}
    </div>
  );
};
const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const [paging, setPaging] = useState({
    keyWord: searchParams.get("name"),
  });
  const { loadingTotalStore } = useStore();
  const { pagingTotalByKeyword } = loadingTotalStore;
  const {
    res: dataSearch,
    isLoading,
    isError,
  } = useGetAllDataByKeyword({
    getRequest: pagingTotalByKeyword,
    paging: paging,
  });

  return (
    <div className="flex  flex-col  bg-white w-full mx-auto mt-3 rounded-lg">
      <div className="p-5">
        <h3 className="body-bold">
          Thông tin tìm kiếm:{" "}
          <span className="text-primary font-medium">
            {searchParams.get("name")}
          </span>
        </h3>

        {isLoading ? (
          <Loading />
        ) : (
          <>
            {!dataSearch ||
              (dataSearch.length === 0 && (
                <NoData title="Không có kết quả tìm kiếm" />
              ))}

            {dataSearch?.users?.length === 0 &&
            dataSearch?.posts?.length === 0 &&
            dataSearch?.groups?.length === 0 ? (
              <NoData title="Không có kết quả tìm kiếm" />
            ) : (
              <div className="mt-3">
                {dataSearch?.users?.length > 0 && (
                  <div className="mb-5">
                    <p className="body-bold">Mọi người</p>
                    <UserListSearch
                      users={dataSearch?.users}
                      isLoading={isLoading}
                    />
                    <Link
                      to={`/search/users?name=${searchParams.get("name")}`}
                      className="flex gap-2 justify-center bg-slate-300 text-black py-2 mt-5 rounded-md hover:bg-slate-200 font-semibold"
                    >
                      Xem thêm
                    </Link>
                  </div>
                )}
                {dataSearch?.posts?.length > 0 && (
                  <div className="mb-5">
                    <p className="body-bold">Bài viết</p>
                    <PostList
                      posts={dataSearch?.posts}
                      isLoading={isLoading}
                      isError={isError}
                    />
                    <Link
                      to={`/search/posts?name=${searchParams.get("name")}`}
                      className="flex gap-2 justify-center bg-slate-300 text-black py-2 mt-5 rounded-md hover:bg-slate-200 font-semibold"
                    >
                      Xem thêm
                    </Link>
                  </div>
                )}
                {dataSearch?.groups?.length > 0 && (
                  <div>
                    <p className="body-bold">Nhóm</p>
                    <GroupListSearch
                      groups={dataSearch?.groups}
                      isLoading={isLoading}
                    />
                    <Link
                      to={`/search/groups?name=${searchParams.get("name")}`}
                      className="flex gap-2 justify-center bg-slate-300 text-black py-2 mt-5 rounded-md hover:bg-slate-200 font-semibold"
                    >
                      Xem thêm
                    </Link>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
