import { Ellipsis, Eraser, Pencil } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import PostForm from "./PostForm";
import PostStats from "./PostStats";
import React, { useState } from "react";
import Delete from "./Delete";
import { IImage, IPost } from "@/types";

import { multiFormatDateString } from "@/lib/utils";
import LocalStorage from "@/services/LocalStorageService";
import { useStore } from "@/stores";
import { toast } from "react-toastify";

type PostProps = {
  post: IPost | any;
  lastId?: string;
  endOfListRef?: any;
};

const PortCard = ({ post, lastId, endOfListRef }: PostProps) => {
  const [dropdown, setdropDowm] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const currentUser = LocalStorage.getLoggedInUser();
  const images: string[] =
    (post && post?.images?.map((i: IImage) => i.image)) || [];
  const navigate = useNavigate();
  const { postStore } = useStore();
  const { deletePost } = postStore;
  const handleDeletePost = async (postId: string) => {
    setIsDeleting(true);
    try {
      await deletePost(postId);
      toast.success("Đã xoá bài viết");
      window.location.reload();
    } catch (error) {
      console.log(error);
    } finally {
      setIsDeleting(false);
    }
  };
  return (
    <div
      className="bg-white rounded-xl p-4 my-4 text-base"
      ref={post?.id === lastId ? endOfListRef : undefined}
    >
      <div className="relative flex-between">
        <div className="  flex items-center gap-3">
          <Link to={`/profile/${post.creator.id}`} className="profile-photo">
            <img
              src={post.creator.avatar || "/person.jpg"}
              alt="creator"
              className=" w-10 h-10 object-cover rounded-full"
            />
          </Link>

          <div className="flex flex-col">
            {post?.group && (
              <Link
                to={`/group/${post?.group?.id}`}
                className="base-medium text-primary hover:underline"
              >
                {post?.group?.name}
              </Link>
            )}
            <Link
              to={`/profile/${post?.creator?.id}`}
              className="base-medium lg:body-bold text-dark-1"
            >
              {post.creator.lastName} {post.creator.firstName}
            </Link>
            <div className="flex gap-3 text-light-3">
              <p className="subtle-semibold lg:small-regular ">
                {multiFormatDateString(post.createDate.toString())}
              </p>
              •
            </div>
          </div>
        </div>
        {post.creator.id === currentUser?.id && (
          <div>
            <button onClick={() => setdropDowm((prev) => !prev)}>
              {" "}
              <Ellipsis />
            </button>
            <>
              {dropdown && (
                <div className="absolute right-2 flex flex-col gap-2 bg-white shadow-2xl p-5 z-20 rounded-lg">
                  <PostForm post={post}>
                    <button
                      className="flex gap-2 items-center"
                      onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                        e.stopPropagation()
                      }
                    >
                      <div className="flex gap-3 items-center hover:bg-blue-2 px-5 py-2 rounded-md">
                        <Pencil />
                        Chỉnh sửa
                      </div>
                    </button>
                  </PostForm>
                  <Delete
                    handleDelete={() => handleDeletePost(post.id)}
                    isDisable={isDeleting}
                  >
                    <div className="flex gap-3 items-center hover:bg-blue-2 px-5 py-2 rounded-md">
                      <Eraser /> Xoá
                    </div>
                  </Delete>
                </div>
              )}
            </>
          </div>
        )}
      </div>

      <div className="small-normal text-balance py-5">
        <p>{post.content}</p>
      </div>

      {images && images.length > 0 && (
        <div className="rounded-xl overflow-hidden my-2 gap-2 flex relative">
          {" "}
          {/* Đặt position: relative */}
          <div className={`${images.length === 1 ? "flex-1" : "basis-2/3"}`}>
            <img
              src={images[0]}
              alt="post-image"
              className="post-card_img"
              onClick={() => navigate(`/post/${post.id}`)}
            />
          </div>
          {images.length > 1 && (
            <div className="flex flex-col justify-start gap-3 basis-1/3">
              {images.slice(1, 3)?.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt="post-image"
                  className="h-[150px] object-cover w-full rounded-[10px]"
                  onClick={() => navigate(`/post/${post.id}`)}
                />
              ))}
              {images.length >= 4 && (
                <div className="h-[150px] w-full bg-gray-200 flex items-center justify-center text-gray-500 font-semibold rounded-[10px] cursor-pointer">
                  <img
                    src={images[3]}
                    alt="post-image"
                    className="h-[150px] object-cover w-full rounded-[10px]"
                    onClick={() => navigate(`/post/${post.id}`)}
                  />
                </div>
              )}
              {images.length >= 5 && (
                <div className="absolute bg-blue-2 bottom-10 right-1 bg-gray-200 text-gray-500 px-2 py-1 rounded-[10px] cursor-pointer">
                  +{images.length - 4} ảnh khác
                </div>
              )}
            </div>
          )}
        </div>
      )}

      <PostStats post={post} />
    </div>
  );
};

export default PortCard;
