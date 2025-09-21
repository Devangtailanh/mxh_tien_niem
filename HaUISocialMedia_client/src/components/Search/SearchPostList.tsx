import useGetData, { useGetDataNewFeed } from "@/lib";
import { useStore } from "@/stores";
import { SearchObjectType } from "@/types";
import { useState } from "react";
import PostList, { LoadingPost } from "../Post/PostList";
import Loader from "../shared/Loader";
import { useSearchParams } from "react-router-dom";
import NoData from "../shared/NoData";

const SearchPostList = () => {
  const [searchParams] = useSearchParams();
  const { loadingTotalStore } = useStore();
  const { pagingPostByKeyword } = loadingTotalStore;

  const [paging, setPaging] = useState<SearchObjectType>({
    pageIndex: 0,
    pageSize: 20,
    mileStoneId: "",
    keyWord: searchParams.get("name") as string,
  });

  const {
    ref,
    res: posts,
    isLoading,
    showLoadMore,
    isError,
    endOfListRef,
  } = useGetDataNewFeed({
    getRequest: pagingPostByKeyword,
    paging: paging,
    setPaging: setPaging,
  });

  return (
    <>
      {isLoading ? (
        <LoadingPost />
      ) : (
        <div>
          {!posts || posts.length === 0 ? (
            <NoData title="Không có kết quả tìm kiếm bài viết" />
          ) : (
            <>
              <PostList
                posts={posts}
                isLoading={isLoading}
                isError={isError}
                lastId={paging?.mileStoneId}
                endOfListRef={endOfListRef}
              />
            </>
          )}
          {showLoadMore && (
            <div ref={ref}>
              <Loader />
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default SearchPostList;
