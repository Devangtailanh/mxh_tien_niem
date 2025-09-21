import useGetData, { useGetAllData } from "@/lib";
import { useStore } from "@/stores";
import React, { useState } from "react";
import GroupListSearch from "./ui/GroupListSearch";
import { useSearchParams } from "react-router-dom";
import { SearchObjectType } from "@/types";
import Loader from "../shared/Loader";
import NoData from "../shared/NoData";
import { Skeleton } from "../ui/skeleton";

const LoadingGroups = () => {
  return (
    <div className="flex gap-4 flex-col mt-5">
      {"1234567".split("").map((i) => (
        <Skeleton className="w-full h-20 rounded-lg" key={i} />
      ))}
    </div>
  );
};

const SearchGroupList = () => {
  const [searchParams] = useSearchParams();
  const { loadingTotalStore } = useStore();
  const { pagingGroupByKeyword } = loadingTotalStore;

  const [paging, setPaging] = useState<SearchObjectType>({
    pageIndex: 1,
    pageSize: 20,
    keyWord: searchParams.get("name") as string,
  });
  const {
    resSearch: dataGroup,
    isLoading,
    ref,
    showLoadMore,
  } = useGetData({
    getRequest: pagingGroupByKeyword,
    paging: paging,
    setPaging: setPaging,
  });

  if (isLoading) return <LoadingGroups />;
  console.log(dataGroup);
  return (
    <div className="mt-5">
      {!dataGroup || dataGroup.length === 0 ? (
        <NoData title="Không có kết quả tìm kiếm nhóm này" />
      ) : (
        <GroupListSearch groups={dataGroup} />
      )}
      {showLoadMore && (
        <div ref={ref}>
          <Loader />
        </div>
      )}
    </div>
  );
};

export default SearchGroupList;
