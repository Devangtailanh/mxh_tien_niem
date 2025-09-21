import { Link } from "react-router-dom";
import reply from "/reply.svg";
import { useState } from "react";
import Comment from "./Comment";
import ReplyComment from "./ReplyComment";
import { IComment } from "@/types";

import { multiFormatDateString } from "@/lib/utils";

type CommentCardProps = {
  comment: IComment;
};

const CommentCard = ({ comment }: CommentCardProps) => {
  console.log(comment);
  const [openReply, setOpenReply] = useState(false);
  const [showReplyComment, setShowReplyComment] = useState(false);

  const handleOpenReply = () => {
    setOpenReply((prev) => !prev);
  };

  const handleShowReplyComment = () => {
    setShowReplyComment((prev) => !prev);
  };

  return (
    <article className={`flex w-full flex-col rounded-xl pr-1`}>
      <div className="flex items-start justify-between">
        <div className="flex w-full flex-1 flex-row gap-4">
          <div className="flex flex-col items-center">
            <Link to="/profile/1" className="relative ">
              <img
                src={comment?.commenter.avatar || "/person.jpg"}
                alt="profile-imge"
                className="size-10 cursor-pointer rounded-full"
              />
            </Link>
            <div className="thread-card_bar" />
          </div>

          <div className="flex w-full flex-col">
            <div className="w-fit flex flex-col gap-1 bg-blue-2 px-2 py-1 rounded-md">
              <p
                className="cursor-pointer  base-semibold"
                onClick={() =>
                  (window.location.href = `/profile/${comment?.commenter?.id}`)
                }
              >
                {comment?.commenter.lastName} {comment?.commenter?.firstName}
              </p>
              <span className="base-regular  text-balance ">
                {" "}
                {comment?.content}
              </span>
            </div>
            <p className="text-small-medium mt-0.5">
              {" "}
              {multiFormatDateString(comment?.createDate.toString())}
            </p>

            <div className={`my-1 flex flex-col gap-3`}>
              <div className="flex gap-2">
                <img
                  src={reply}
                  alt="reply-icon"
                  width={24}
                  height={24}
                  className="cursor-pointer object-contain"
                  onClick={handleOpenReply}
                />
                {comment.numsOfSubComments > 0 && (
                  <p
                    className="mt-1 text-subtle-medium text-gray-1 hover:text-primary cursor-pointer"
                    onClick={handleShowReplyComment}
                  >
                    {comment.numsOfSubComments} phản hồi
                  </p>
                )}
              </div>
              {showReplyComment && <ReplyComment commentId={comment.id} />}

              {openReply && (
                <Comment postId={comment.post.id} repliCommentId={comment.id} />
              )}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default CommentCard;
