import {
  createCommentRequest,
  getParentCommentOfPostRequest,
  getSubCommentsRequest,
} from "@/services/CommentService";

import { makeAutoObservable } from "mobx";
import { toast } from "react-toastify";

class CommentStore {
  constructor() {
    makeAutoObservable(this);
  }

  createComment = async (formData: any) => {
    try {
      const { data } = await createCommentRequest(formData);
      return data;
    } catch (error) {
      toast.error("Something went wrong :(");
    }
  };
  getSubComments = async (commentId: string) => {
    try {
      const { data } = await getSubCommentsRequest(commentId);
      return data;
    } catch (error) {
      toast.error("Something went wrong :(");
    }
  };
  getParentCommentOfPost = async (postId: string) => {
    try {
      const { data } = await getParentCommentOfPostRequest(postId);
      return data;
    } catch (error) {
      toast.error("Something went wrong :(");
    }
  };
}

export default CommentStore;
