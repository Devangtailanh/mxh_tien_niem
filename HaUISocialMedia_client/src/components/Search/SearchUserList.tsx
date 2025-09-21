import { useStore } from "@/stores";
import { useState } from "react";
import useGetData from "@/lib";
import { SearchObjectType } from "@/types";
import UserListSearch from "./ui/UserListSearch";
import Loader from "../shared/Loader";
import { useSearchParams } from "react-router-dom";
import NoData from "../shared/NoData";

const SearchUserList = () => {
  const [searchParams] = useSearchParams();
  const { loadingTotalStore } = useStore();
  const { pagingUserByKeyword } = loadingTotalStore;

  const [paging, setPaging] = useState<SearchObjectType>({
    pageIndex: 1,
    pageSize: 20,
    keyWord: searchParams.get("name") as string,
  });

  const {
    ref,
    resSearch: users,
    isLoading,
    showLoadMore,
    isError,
  } = useGetData({
    getRequest: pagingUserByKeyword,
    paging: paging,
    setPaging: setPaging,
  });
  return (
    <div className="">
      {users.length === 0 ? (
        <NoData title="Không có kết quả tìm kiếm người dùng này" />
      ) : (
        <UserListSearch users={users} isLoading={isLoading} />
      )}
      {showLoadMore && (
        <div ref={ref}>
          <Loader />
        </div>
      )}
    </div>
  );
};

export default SearchUserList;
