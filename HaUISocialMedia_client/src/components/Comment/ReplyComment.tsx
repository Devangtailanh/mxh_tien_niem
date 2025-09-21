import CommentCard from "./CommentCard";
import { useStore } from "@/stores";
import { useEffect, useState } from "react";
import { IComment } from "@/types";

type ReplyCommentProps = {
  commentId: string;
};

const ReplyComment = ({ commentId }: ReplyCommentProps) => {
  const { commentStore } = useStore();
  const { getSubComments } = commentStore;

  const [subComment, setSubcomment] = useState<IComment[]>([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await getSubComments(commentId);
        setSubcomment(data);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);
  return (
    <div>
      {subComment?.map((comment) => (
        <CommentCard key={comment.id} comment={comment} />
      ))}
    </div>
  );
};

export default ReplyComment;
