import Comment from "../Comment/Comment";
import CommentCard from "../Comment/CommentCard";
import { multiFormatDateString } from "@/lib/utils";

import { useStore } from "@/stores";
import { IComment, IPost } from "@/types";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Skeleton } from "../ui/skeleton";
import NoData from "../shared/NoData";
import PostStats from "./PostStats";

const LoadingPostDetail = () => {
  return (
    <div className="max-w-[70%] mx-auto my-auto bg-white">
      <div className="grid grid-cols-2 overflow-hidden">
        <div className="sticky top-[88px] bg-white py-5 px-5 rounded-lg shadow-lg  max-h-[calc(100vh_-_88px)] overflow-y-auto">
          <div className=" flex gap-3">
            <div>
              <Skeleton className="w-10 h-10 rounded-full" />
            </div>

            <div className="flex flex-col">
              <Skeleton className="w-full h-4" />
            </div>
          </div>

          <div className="mt-2 max-w-[40vw]">
            <Skeleton className="w-full h-8" />
          </div>
          <div className="mt-10 relative">
            <div>
              <Skeleton className="post-card_img " />
            </div>
          </div>
        </div>

        <div className="flex-1 bg-white p-5 rounded-lg shadow-sm  h-[calc(100vh_-_88px)] overflow-y-auto">
          <div className="mt-7">
            <Skeleton className="w-full h-3" />
          </div>

          <div className="mt-3 max-w-[40vw] ">
            <Skeleton className="w-full h-4 my-5" />
            <div className="flex flex-col gap-3">
              {"123456".split("").map((i) => (
                <Skeleton className="w-full h-10 " key={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const PostDetail = () => {
  const { postStore, commentStore } = useStore();
  const { getPostById } = postStore;
  const { getParentCommentOfPost } = commentStore;
  const { postId } = useParams();

  const [isLoading, setIsLoading] = useState(false);
  const [postDetail, setPostDetail] = useState<IPost>();
  const [comments, setComments] = useState<IComment[]>([]);
  const [imageIndex, setImageIndex] = useState(0);
  const images = (postDetail && postDetail?.images.map((i) => i.image)) || [];
  useEffect(() => {
    const getPost = async () => {
      setIsLoading(true);
      try {
        const data = await getPostById(postId as string);
        const comment = await getParentCommentOfPost(postId as string);
        setPostDetail(data);
        setComments(comment);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    getPost();
  }, []);

  const changeSlide = (direction: string) => {
    if (direction === "left") {
      if (imageIndex === 0) {
        setImageIndex(images.length - 1);
      } else {
        setImageIndex(imageIndex - 1);
      }
    } else {
      if (imageIndex === images.length - 1) {
        setImageIndex(0);
      } else {
        setImageIndex(imageIndex + 1);
      }
    }
  };

  console.log(postDetail);
  if (isLoading) return <LoadingPostDetail />;
  if (!postDetail)
    return <NoData title="Bài viết không tồn tại" style="w-[80px] h-[80px]" />;
  return (
    <div className=" mx-auto my-auto bg-blue-2">
      <div
        className={`grid ${
          postDetail?.images.length > 0
            ? "grid-cols-[2fr_1fr]"
            : " place-items-center min-w-4xl"
        }  overflow-hidden`}
      >
        {postDetail?.images?.length > 0 && (
          <div className="sticky top-[88px] bg-white py-5 px-5 rounded-lg shadow-lg  max-h-[calc(100vh_-_88px)] overflow-y-auto">
            <div className="mt-10 relative">
              {postDetail.images.length > 1 && (
                <div className="absolute top-1/2 flex items-center bg-white rounded-full">
                  <img
                    src="/arrow-left.svg"
                    alt="arrow"
                    onClick={() => changeSlide("left")}
                    className="w-8 h-8"
                  />
                </div>
              )}
              <div>
                <img
                  src={images[imageIndex]}
                  alt="post-image"
                  className="post-card_img "
                />
              </div>

              {postDetail.images.length > 1 && (
                <div className="absolute right-0 top-1/2 flex items-center bg-white rounded-full">
                  <img
                    src="/arrow-right.svg"
                    alt="arrow"
                    className="w-8 h-8"
                    onClick={() => changeSlide("right")}
                  />
                </div>
              )}
            </div>
          </div>
        )}

        <div
          className={`${
            postDetail?.images.length === 0 && "w-3/5"
          } bg-white p-5 rounded-lg shadow-sm  h-[calc(100vh_-_88px)] overflow-y-auto `}
        >
          <div className=" flex gap-3">
            <Link to={`/profile/${postDetail?.creator?.id}`} className="">
              <img
                src={postDetail?.creator.avatar || "/person.jpg"}
                alt="creator"
                className="w-10 h-10 rounded-full"
              />
            </Link>

            <div className="flex flex-col">
              <Link
                to={`/profile/${postDetail?.creator?.id}`}
                className="base-medium lg:body-bold"
              >
                {postDetail?.creator.lastName} {postDetail?.creator.firstName}
              </Link>
              <div className="flex gap-2 ">
                <p className="subtle-semibold lg:small-regular ">
                  {multiFormatDateString(postDetail?.createDate.toString())}
                </p>
                •
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <div className="mt-2 max-w-[40vw]">{postDetail?.content}</div>
            <PostStats post={postDetail} />
            <div className="border-b border-slate-300" />
          </div>

          <div className="mt-3 max-w-[40vw] ">
            <p className="base-semibold mb-3">Bình luận gần đây</p>
            {postDetail?.comments.length === 0 ? (
              <span>Chưa có bình luận nào</span>
            ) : (
              <>
                {comments
                  ?.filter((item) => !item.repliedComment)
                  .map((comment: IComment) => (
                    <CommentCard key={comment.id} comment={comment} />
                  ))}
              </>
            )}
          </div>

          <div className="mt-2">
            <Comment postId={postDetail?.id || ""} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
