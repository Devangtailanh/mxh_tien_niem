import { Input } from "@mui/material";
import { Search } from "lucide-react";
import TableClass from "./TableClass";
import Pagination from "./Pagination";
import CreateClass from "./CreateClass";
import { useStore } from "@/stores";
import { useGetDataPagination } from "@/lib";
import React, { useState, useEffect, useCallback, ChangeEvent, KeyboardEvent } from "react";
import { SearchObjectType } from "@/types";
import NoData from "../shared/NoData";
import TableSkeleton from "../skeleton/TableSkeleton";

const DEBOUNCE_MS = 400;

const AdminClassPage: React.FC = () => {
  const [paging, setPaging] = useState<SearchObjectType>({
    pageSize: 5,
    pageIndex: 1,
    keyWord: "",
  });

  const [searchValue, setSearchValue] = useState("");

  const { classStore } = useStore();
  const { pagingClass } = classStore;

  const {
    res: dataClass,
    isLoading,
    isLeftDisable,
    isRightDisable,
  } = useGetDataPagination({ getRequest: pagingClass, paging });

  // --- Handlers (memoized) ---
  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  }, []);

  const applySearch = useCallback(() => {
    setPaging(prev => ({
      ...prev,
      keyWord: searchValue.trim(),
      pageIndex: 1, // luôn về trang 1 khi đổi từ khóa
    }));
  }, [searchValue]);

  const handleKeyDown = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") applySearch();
  }, [applySearch]);

  // --- Debounce: tự tìm sau khi dừng gõ ---
  useEffect(() => {
    const id = setTimeout(applySearch, DEBOUNCE_MS);
    return () => clearTimeout(id);
  }, [searchValue, applySearch]);

  const hasData = Array.isArray(dataClass) && dataClass.length > 0;

  return (
    <div className="px-5 bg-blue-2 w-full mr-5 rounded-md">
      <div className="flex flex-col w-full">
        <div className="mt-5 w-full px-5">
          <h2 className="text-body-medium">Danh sách lớp học</h2>

          <div className="w-full flex justify-between mt-2">
            <div className="flex items-end gap-2">
              <Input
                type="search"
                value={searchValue}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                placeholder="Tìm lớp học..."
                aria-label="Tìm lớp học"
                className="px-5"
                autoComplete="off"
              />
              <button
                type="button"
                className="bg-primary p-2 rounded hover:opacity-90 transition-opacity"
                onClick={applySearch}
                disabled={isLoading}
                aria-label="Tìm kiếm"
                title="Tìm kiếm"
              >
                <Search color="#fff" />
              </button>
            </div>

            <CreateClass />
          </div>
        </div>

        <div className="mt-10 px-10 bg-white shadow-lg py-10 rounded-sm">
          {isLoading ? (
            <TableSkeleton length={paging.pageSize} styles="" />
          ) : !hasData ? (
            <NoData title="Danh sách lớp học đang trống" />
          ) : (
            <TableClass classData={dataClass} isLoading={isLoading} />
          )}
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

export default AdminClassPage;
