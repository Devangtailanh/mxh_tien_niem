import { Input } from "@mui/material";
import { Search } from "lucide-react";
import Pagination from "./Pagination";
import { useStore } from "@/stores";
import { useState, useEffect } from "react";
import { SearchObjectType } from "@/types";
import TableCourseResult from "./TableCourseResult";

const AdminCourseResult = () => {
  const [paging, setPaging] = useState<SearchObjectType>({
    pageSize: 5,
    pageIndex: 0,
    keyWord: "",
  });
  const [dataCourseResult, setdataCourseResult] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLeftDisable, setIsLeftDisable] = useState(true);
  const [isRightDisable, setIsRightDisable] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const { courseResultStore } = useStore();
  const { getAllCourseResult } = courseResultStore;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const handleClick = () => {
    setPaging((prevPaging) => ({
      ...prevPaging,
      keyWord: searchValue,
    }));
    // Perform other operations with the searchValue here
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setIsLeftDisable(true);
      setIsRightDisable(false);
      // Gọi API hoặc xử lý dữ liệu theo từ khóa tìm kiếm searchValue
      const response = await getAllCourseResult();
      setdataCourseResult(response);
      setIsLoading(false);
      // Cập nhật trạng thái phân trang
      setIsLeftDisable(response.isFirstPage);
      setIsRightDisable(response.isLastPage);
    };
    fetchData();
  }, [paging, getAllCourseResult]);
  return (
    <div className="px-5 bg-blue-2  w-full mr-5 rounded-md">
      <div className="flex flex-col w-full">
        <div className="mt-5 w-full px-5">
          <h2 className="text-body-medium">Danh sách kết quả khóa học</h2>
          <div className="w-full flex justify-between mt-2">
            <div className="flex items-end">
              <Input
                type="search"
                className="px-5"
                placeholder="Tìm theo khóa học..."
                onChange={handleChange}
              />
              <button className="bg-primary p-2" onClick={handleClick}>
                <Search color="#fff" />
              </button>
            </div>
          </div>
        </div>

        <div className="mt-10 px-10 bg-white shadow-lg py-10 rounded-sm">
          <TableCourseResult
            classData={dataCourseResult}
            isLoading={isLoading}
          />
        </div>

        <Pagination
          isLeftDisable={isLeftDisable}
          isRightDisable={isRightDisable}
          setPaging={setPaging}
        />
      </div>
    </div>
  );
};

export default AdminCourseResult;
