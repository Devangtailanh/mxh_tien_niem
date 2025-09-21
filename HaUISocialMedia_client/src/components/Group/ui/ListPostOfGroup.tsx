import PostList from "@/components/Post/PostList";
import NoData from "@/components/shared/NoData";
import PostSkeleton from "@/components/skeleton/PostSkeleton";
import { useGetAllData } from "@/lib";
import { useStore } from "@/stores";
import { useParams } from "react-router-dom";

type Props = {
  groupId: any;
};
const ListPostOfGroup = ({}: Props) => {
  const { groupId } = useParams();
  const { groupStore } = useStore();
  const { getAllPostOfGroup } = groupStore;

  const { res: posts, isLoading } = useGetAllData({
    requestId: groupId,
    getRequest: getAllPostOfGroup,
  });
  if (isLoading) return <PostSkeleton></PostSkeleton>;
  return (
    <>
      {!posts || posts.length === 0 ? (
        <NoData
          title="Chưa có bài viết nào trong nhóm"
          style="h-[100px] w-[100px]"
        />
      ) : (
        <>
          <PostList posts={posts} />
        </>
      )}
    </>
  );
};

export default ListPostOfGroup;
