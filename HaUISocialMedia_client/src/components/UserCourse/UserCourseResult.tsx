import { Input } from "@mui/material";
import { Search } from "lucide-react";

import Pagination from "./ui/Pagination";

import { useStore } from "@/stores";
import { useGetDataPagination } from "@/lib";
import { useState } from "react";
import { SearchObjectType } from "@/types";
import TableUserCourseResult from "./ui/TableUserCourseResult";
import NoData from "../shared/NoData";
import TableSkeleton from "../skeleton/TableSkeleton";

const UserCourseResult = () => {
  const [paging, setPaging] = useState<SearchObjectType>({
    pageSize: 5,
    pageIndex: 0,
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
    }));
    // Thực hiện các thao tác khác với giá trị searchValue ở đây
  };
  const { userCourseStore } = useStore();
  const { getAllUserCourseNotYetAllow } = userCourseStore;

  const {
    res: dataCourseResult,
    isLoading,
    isLeftDisable,
    isRightDisable,
  } = useGetDataPagination({
    getRequest: getAllUserCourseNotYetAllow,
    paging: paging,
  });

  if (isLoading) return <TableSkeleton length={5} styles="" />;

  return (
    <div className="px-5 bg-blue-2 h-screen w-full mr-5 rounded-md">
      <div className="flex flex-col w-full">
        <div className="mt-5 w-full px-5">
          <h2 className="text-body-medium capitalize">
            Danh sách kết quả cần duyệt
          </h2>
          <div className="w-full flex justify-between mt-2"></div>
        </div>
        {!dataCourseResult || dataCourseResult.length === 0 ? (
          <NoData title="Chưa có kết quả nào cần duyệt" />
        ) : (
          <>
            <div className="mt-10 px-10 bg-white shadow-lg py-10 rounded-sm">
              <TableUserCourseResult dataCourseResult={dataCourseResult} />
            </div>

            <Pagination
              isLeftDisable={paging.pageIndex === 0}
              isRightDisable={isRightDisable}
              setPaging={setPaging}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default UserCourseResult;
