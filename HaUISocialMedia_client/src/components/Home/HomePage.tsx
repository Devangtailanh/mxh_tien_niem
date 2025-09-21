import RightSidebar from "@/components/layout/RightSidebar";
import Sidebar from "@/components/layout/Sidebar";
import PostList, { LoadingPost } from "@/components/Post/PostList";
import SessionCreatePost from "@/components/Post/SessionCreatePost";
import { useState } from "react";

import { SearchObjectType } from "@/types";
import { Loader } from "lucide-react";
import { useGetDataNewFeed } from "@/lib";
import { useStore } from "@/stores";
import NoData from "../shared/NoData";

export type newFeedPagination = {
  pageIndex: number;
  pageSize: number;
};
const HomePage = () => {
  const { postStore } = useStore();
  const { getNewFeed } = postStore;

  const [paging, setPaging] = useState<SearchObjectType>({
    pageIndex: 0,
    pageSize: 20,
    mileStoneId: "",
  });

  const {
    ref,
    res: posts,
    isLoading,
    showLoadMore,
    isError,
    endOfListRef,
  } = useGetDataNewFeed({
    getRequest: getNewFeed,
    paging: paging,
    setPaging: setPaging,
  });

  return (
    <div className="w-full grid grid-cols-[1fr_2fr_1fr] gap-x-8 relative mt-5">
      <Sidebar />
      <div className="">
        <SessionCreatePost />
        {isLoading ? (
          <LoadingPost />
        ) : (
          <>
            {!posts || posts.length === 0 ? (
              <div className="bg-white w-full rounded-md h-full mt-5">
                <NoData title="Bạn chưa có bài viết nào, hãy kết nối với bạn bè để cùng chia sẻ những khoản khắc !!!" />
              </div>
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
              <>
                {/* <div ref={endOfListRef} /> */}
                <div ref={ref} className="flex justify-center">
                  <Loader />
                </div>
              </>
            )}
          </>
        )}
      </div>
      <RightSidebar />
    </div>
  );
};

export default HomePage;
