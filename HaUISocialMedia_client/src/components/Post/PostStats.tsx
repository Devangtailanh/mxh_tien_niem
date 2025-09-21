import { IPost } from "@/types";
import { Heart, Loader, MessagesSquare } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LocalStorage from "@/services/LocalStorageService";
import { useStore } from "@/stores";

type PostStatsProps = {
  post: IPost;
};
const PostStats = ({ post }: PostStatsProps) => {
  const navigate = useNavigate();
  const currentUser = LocalStorage.getLoggedInUser();
  const [isLiking, setIsLiking] = useState(false);
  const { likeStore } = useStore();
  const { likePost, dislikePost } = likeStore;

  const likesList = post?.likes?.map((user: any) => user.userLike.id) || [];
  const [likes, setLikes] = useState<string[]>(likesList);

  const handleLike = async () => {
    setIsLiking(true);
    try {
      let likesArray = [...likes];

      if (likesArray.includes(currentUser?.id as string)) {
        likesArray = likesArray.filter((Id) => Id !== currentUser?.id);
      } else {
        likesArray.push(currentUser?.id as string);
      }

      setLikes(likesArray);
      await likePost(post.id);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLiking(false);
    }
  };

  const checkIsLiked = (likeList: string[], userId: string) => {
    return likeList?.includes(userId);
  };
  const handleDislike = async () => {
    let likesArray = [...likes];

    if (likesArray.includes(currentUser?.id as string)) {
      likesArray = likesArray.filter((Id) => Id !== currentUser?.id);
    } else {
      likesArray.push(currentUser?.id as string);
    }

    setLikes(likesArray);
    await dislikePost(post.id);
  };

  return (
    <div
      className={`flex justify-start items-center z-20 border-t border-slate-300 py-2`}
    >
      <div className="flex gap-2 mr-5">
        {checkIsLiked(likes, currentUser?.id as string) ? (
          <button onClick={handleDislike}>
            {isLiking ? <Loader /> : <Heart fill="red" stroke="red" />}
          </button>
        ) : (
          <button onClick={handleLike}>
            <Heart />
          </button>
        )}
        <p className="small-medium lg:base-medium">{likes?.length || 0}</p>
      </div>

      <div className="flex gap-2">
        <button onClick={() => navigate(`/post/${post.id}`)}>
          <MessagesSquare />
        </button>
        <p className="small-medium lg:base-medium">{post?.comments?.length}</p>
      </div>
    </div>
  );
};

export default PostStats;
