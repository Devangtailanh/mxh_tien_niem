import { memo, useEffect } from "react";
import { Button } from "@/components/ui/button";
import TableSkeleton from "@/components/skeleton/TableSkeleton";
import { useStore } from "@/stores";
import { Input } from "../ui/input";
import Pagination from "@mui/material/Pagination";
import { observer } from "mobx-react";
import DashBoardItem from "./DashBoardItem";
import "../../common/CommonStyles.scss";
import { Formik, Form } from "formik";
import SearchIcon from "@mui/icons-material/Search";

type PagingType = {
  pageSize: number;
  pageIndex: number;
};

function LeaderBoard() {
  const { leaderBoardStore } = useStore();
  const {
    getLeadingDashBoard,
    resetStore,
    isLoading,
    dashboardData,
    totalPages,
    pageIndex,
    pageSize,
    handleChangePage,
    handleSearchingWithKeyword,
  } = leaderBoardStore;

  useEffect(function () {
    getLeadingDashBoard();

    return resetStore;
  }, []);

  return (
    <Formik
      onSubmit={handleSearchingWithKeyword}
      enableReinitialize
      initialValues={{
        keyword: null,
      }}
    >
      {(formProps: any) => {
        const { values, setFieldValue } = formProps;

        function handleChangeSearchInput(e: any) {
          setFieldValue("keyword", e?.target?.value);
        }

        return (
          <Form className="calendar-form flex justify-center p-4 w-100">
            <div className="bg-white p-3 shadow-md rounded-md w-100">
              <p className="text-heading3-bold">Bảng xếp hạng thành tích</p>
              <div className="mt-2 flex justify-right">
                <Input
                  name="keyword"
                  placeholder="Tìm kiếm ..."
                  className="px-4 py-2 rounded-xl w-1/3  outline-none border border-blue-500"
                  onChange={handleChangeSearchInput}
                />
                {/* <div className="flex gap-3 items-center">
          <Button className="flex gap-3 items-center" disabled>
            <Icon name="Filter" />
            <span>Lọc</span>
          </Button>
        </div> */}

                <div className="flex items-center pl-2">
                  <Button
                    className="flex items-center"
                    type="submit"
                    style={{ backgroundColor: "#2d74ff" }}
                  >
                    <SearchIcon />
                    <span className="pl-2">Tìm kiếm</span>
                  </Button>
                </div>
              </div>

              <div className="w-full overflow-hidden rounded-lg shadow-xs mt-5">
                <div className="w-full overflow-x-auto ">
                  {isLoading && <TableSkeleton length={5} styles="" />}

                  {!isLoading && (
                    <>
                      <table className="w-full whitespace-nowrap">
                        <DashboardHeader />

                        <tbody className="bg-white divide-y ">
                          {dashboardData?.map((data: any, index: number) => (
                            <DashBoardItem
                              key={data?.id}
                              data={data}
                              stt={(pageIndex - 1) * pageSize + index + 1}
                            />
                          ))}
                        </tbody>
                      </table>

                      {(!dashboardData || dashboardData?.length === 0) && (
                        <span className="flex justify-center mt-5">
                          Chưa có dữ liệu
                        </span>
                      )}

                      <div className="flex justify-right">
                        <Pagination
                          count={totalPages}
                          page={pageIndex}
                          shape="rounded"
                          onChange={handleChangePage}
                          boundaryCount={1}
                          siblingCount={1}
                          showFirstButton
                          showLastButton
                        />
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}

export default memo(observer(LeaderBoard));


function DashboardHeader() {
  return (
    <thead>
      <tr className="text-xs tracking-wide font-bold text-left text-gray-500 uppercase border-b ">
        <td className="px-4 py-3 text-center">STT</td>
        <td className="px-4 py-3 text-center">Ảnh</td>
        <td className="px-4 py-3 text-center">Mã SV</td>
        <td className="px-4 py-3 text-center">Họ</td>
        <td className="px-4 py-3 text-center">Tên</td>
        <td className="px-4 py-3 text-center">
          Tên người dùng
        </td>
        <td className="px-4 py-3 text-center">A</td>
        <td className="px-4 py-3 text-center">B+</td>
        <td className="px-4 py-3 text-center">B</td>
        <td className="px-4 py-3 text-center">C+</td>
        <td className="px-4 py-3 text-center">C</td>
        <td className="px-4 py-3 text-center">D+</td>
        <td className="px-4 py-3 text-center">D</td>
        <td className="px-4 py-3 text-center">Trung bình</td>
      </tr>
    </thead>
  );
}
