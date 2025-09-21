import { Input } from "@mui/material";
import { Search } from "lucide-react";
import Pagination from "./Pagination";
import { useStore } from "@/stores";
import { useGetDataPagination } from "@/lib";
import { useState } from "react";
import { SearchObjectType } from "@/types";
import TablePost from "./TablePost";
import NoData from "../shared/NoData";
import TableSkeleton from "../skeleton/TableSkeleton";

const AdminPostPage = () => {
  const [paging, setPaging] = useState<SearchObjectType>({
    pageIndex: 1,
    pageSize: 10,

    keyWord: "",
  });
  const { postStore } = useStore();
  const { adminPagingPost } = postStore;

  const {
    res: dataPost,
    isLoading,
    isLeftDisable,
    isRightDisable,
  } = useGetDataPagination({ getRequest: adminPagingPost, paging: paging });
  if (isLoading) return <TableSkeleton length={5} styles="" />;
  return (
    <div className="px-5 bg-blue-2 w-full mr-5 rounded-md">
      <div className="flex flex-col w-full">
        <div className="mt-5 w-full px-5">
          <h2 className="text-body-medium  capitalize">Danh sách bài đăng </h2>
          <div className="w-full flex justify-between mt-2">
            <div className="flex items-end">
              <Input
                type="search"
                className="px-5"
                placeholder="Tìm bài đăng..."
                disabled
              />
              <button className="bg-primary p-2">
                <Search color="#fff" />
              </button>
            </div>
          </div>
        </div>
        {dataPost?.length === 0 ? (
          <NoData title="Chưa có bài viết nào" />
        ) : (
          <>
            <div className="mt-10 px-10 bg-white shadow-lg py-10 rounded-sm">
              <TablePost postData={dataPost} isLoading={isLoading} />
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

export default AdminPostPage;
