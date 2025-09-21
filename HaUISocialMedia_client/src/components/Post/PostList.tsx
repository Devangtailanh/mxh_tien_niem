import PostCard from "./PostCard";
import { IPost } from "@/types";
import PostSkeleton from "../skeleton/PostSkeleton";

type PostListProps = {
  posts: IPost[];
  isLoading?: boolean;
  isError?: boolean;
  lastId?: string;
  endOfListRef?: any;
};

export const LoadingPost = () => {
  return (
    <div>
      {"1234567".split("").map((i) => (
        <PostSkeleton key={i} />
      ))}
    </div>
  );
};

const PostList = ({
  posts,
  isLoading,
  isError,
  lastId,
  endOfListRef,
}: PostListProps) => {
  if (isLoading) return <LoadingPost />;
  if (isError)
    return <span className="text-red-500 text-center">Có lỗi xảy ra</span>;
  return (
    <div className="">
      {posts?.map((post: IPost) => (
        <PostCard
          key={post.id}
          post={post}
          lastId={lastId as string}
          endOfListRef={endOfListRef}
        />
      ))}
    </div>
  );
};

export default PostList;
