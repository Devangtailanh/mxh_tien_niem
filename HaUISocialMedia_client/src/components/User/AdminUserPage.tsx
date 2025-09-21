import { Input } from "@mui/material";
import { Search } from "lucide-react";
import { useStore } from "@/stores";
import TableUser from "./TableUser";
import { useState } from "react";
import Pagination from "./Pagination";
import { SearchObjectType } from "@/types";
import { useGetDataPagination } from "@/lib";
import NoData from "../shared/NoData";
import TableSkeleton from "../skeleton/TableSkeleton";

const AdminUserPage = () => {
  const { loadingTotalStore } = useStore();
  const { pagingUserByKeyword } = loadingTotalStore;

  const [paging, setPaging] = useState<SearchObjectType>({
    pageSize: 10,
    pageIndex: 1,
    keyWord: "",
  });

  const [searchValue, setSearchValue] = useState("");

  const handleChange = (event: any) => {
    setSearchValue(event.target.value);
  };

  const handleClick = () => {
    setPaging((prevPaging) => ({
      ...prevPaging,
      keyWord: searchValue,
      pageIndex: 1, // Reset pageIndex to 0 when performing a new search
    }));
  };

  const {
    res: dataUser,
    isLoading,
    isLeftDisable,
    isRightDisable,
  } = useGetDataPagination({ getRequest: pagingUserByKeyword, paging: paging });

  if (isLoading) return <TableSkeleton length={5} styles="" />;

  return (
    <div className="px-5 bg-blue-2 w-full mr-5 rounded-md">
      <div className="flex flex-col w-full">
        <div className="mt-5 w-full px-5">
          <h2 className="text-body-medium">Danh sách Tài Khoản</h2>
          <div className="w-full flex justify-between mt-2">
            <div className="flex items-end">
              <Input
                type="search"
                className="px-5"
                placeholder="Tìm tài khoản..."
                onChange={handleChange}
                disabled
              />
              <button className="bg-primary p-2" onClick={handleClick}>
                <Search color="#fff" />
              </button>
            </div>
          </div>
        </div>

        {!dataUser || dataUser.length === 0 ? (
          <NoData title="Danh sách người dùng trống" />
        ) : (
          <>
            <div className="mt-10 px-10 bg-white shadow-lg py-10 rounded-sm">
              <TableUser userData={dataUser} isLoading={isLoading} />
            </div>

            <Pagination
              isLeftDisable={isLeftDisable}
              isRightDisable={isRightDisable}
              setPaging={setPaging}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default AdminUserPage;
