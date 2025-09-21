import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Comment from "@/components/Comment/Comment";
import CommentCard from "@/components/Comment/CommentCard";
import { multiFormatDateString } from "@/lib/utils";

import { useStore } from "@/stores";
import { IComment, IPost } from "@/types";
import { ReactNode, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import NoData from "@/components/shared/NoData";

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

type Props = {
  children: ReactNode;
  postId: string;
};
const PostDetailModal = ({ children, postId }: Props) => {
  const { postStore, commentStore } = useStore();
  const { getPostById } = postStore;
  const { getParentCommentOfPost } = commentStore;

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

  if (isLoading) return <LoadingPostDetail />;
  if (!postDetail)
    return <NoData title="Bài viết không tồn tại" style="w-[80px] h-[80px]" />;
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle className="text-center">Bài Viết</DialogTitle>
        </DialogHeader>
        <div className=" mx-auto my-auto bg-white">
          <div className="grid grid-cols-2 overflow-hidden">
            <div className="sticky top-[88px] bg-white py-5 px-5 rounded-lg shadow-lg  max-h-[calc(100vh_-_88px)] overflow-y-auto">
              <div className=" flex gap-3">
                <Link to="/" className="">
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
                    {postDetail?.creator.lastName}{" "}
                    {postDetail?.creator.firstName}
                  </Link>
                  <div className="flex gap-2 ">
                    <p className="subtle-semibold lg:small-regular ">
                      {multiFormatDateString(postDetail?.createDate.toString())}
                    </p>
                    •
                  </div>
                </div>
              </div>

              <div className="mt-2 max-w-[40vw]">{postDetail?.content}</div>
              {postDetail?.images?.length > 0 && (
                <div className="mt-10 relative">
                  <div className="absolute top-1/2 flex items-center bg-white rounded-full">
                    <img
                      src="/arrow-left.svg"
                      alt="arrow"
                      onClick={() => changeSlide("left")}
                      className="w-8 h-8"
                    />
                  </div>
                  <div>
                    <img
                      src={images[imageIndex]}
                      alt="post-image"
                      className="post-card_img "
                    />
                  </div>

                  <div className="absolute right-0 top-1/2 flex items-center bg-white rounded-full">
                    <img
                      src="/arrow-right.svg"
                      alt="arrow"
                      className="w-8 h-8"
                      onClick={() => changeSlide("right")}
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="flex-1 bg-white p-5 rounded-lg shadow-sm  h-[calc(100vh_-_88px)] overflow-y-auto">
              <div className="mt-7">
                <p className="body-bold">Bình luận</p>
                <Comment postId={postDetail?.id || ""} />
              </div>

              <div className="mt-3 max-w-[40vw] ">
                <p className="body-bold mb-3">Bình luận gần đây</p>
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
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PostDetailModal;
