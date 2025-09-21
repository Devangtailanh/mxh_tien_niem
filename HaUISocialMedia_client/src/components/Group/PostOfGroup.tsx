import { useStore } from "@/stores";
import NoData from "../shared/NoData";
import { useState } from "react";
import { SearchObjectType } from "@/types";
import useGetData, { useGetDataNewFeed } from "@/lib";
import PostList from "../Post/PostList";
import Loader from "../shared/Loader";
import PostSkeleton from "../skeleton/PostSkeleton";

const PostOfGroupSkeleton = () => {
  return (
    <div>
      {"1234567".split("").map((i) => (
        <PostSkeleton key={i} />
      ))}
    </div>
  );
};
const PostOfGroup = () => {
  const { groupStore } = useStore();
  const { getAllPostOfAllGroup } = groupStore;

  const [paging, setPaging] = useState<SearchObjectType>({
    pageIndex: 0,
    pageSize: 20,
  });

  const {
    ref,
    res: posts,
    isLoading,
    showLoadMore,
    isError,
  } = useGetData({
    getRequest: getAllPostOfAllGroup,
    paging: paging,
    setPaging: setPaging,
  });

  return (
    <div className="p-5 max-w-4xl mx-auto">
      <div>
        <h2 className="h3-bold my-5 ">Hoạt động gần đây</h2>
        {isLoading ? (
          <PostOfGroupSkeleton />
        ) : (
          <>
            {!posts || posts.length === 0 ? (
              <NoData title="Không có bài viết nào gần đây" />
            ) : (
              <>
                <PostList
                  posts={posts}
                  isLoading={isLoading}
                  isError={isError}
                />
              </>
            )}
            {showLoadMore && (
              <div ref={ref}>
                <Loader />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default PostOfGroup;
