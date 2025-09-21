import {
  createPostRequest,
  deletePostRequest,
  adminPagingPostRequest,
  getById,
  pagingNewsFeed,
  pagingPostsOfUser,
  updateBackgroundUserRequest,
  updatePostRequest,
} from "@/services/PostService";
import { makeAutoObservable } from "mobx";
import { toast } from "react-toastify";

class PostStore {
  constructor() {
    makeAutoObservable(this);
  }

  getNewFeed = async (searchObject: any) => {
    try {
      const { data } = await pagingNewsFeed(searchObject);
      return data;
    } catch (error) {
      toast.error("Có lỗi xảy ra");
      throw new Error("Có lỗi xảy ra ");
    }
  };
  adminPagingPost = async (searchObject: any) => {
    try {
      const { data } = await adminPagingPostRequest(searchObject);
      return data;
    } catch (error) {
      toast.error("Có lỗi xảy ra");
      throw new Error("Có lỗi xảy ra ");
    }
  };

  getPostById = async (postId: string) => {
    try {
      const { data } = await getById(postId);
      return data;
    } catch (error) {
      toast.error("Có lỗi xảy ra");
      throw new Error("Có lỗi xảy ra ");
    }
  };

  getPostOfUser = async ({
    searchObject,
    userId,
  }: {
    searchObject: any;
    userId: string;
  }) => {
    console.log(userId);
    try {
      const { data } = await pagingPostsOfUser({
        searchObject: searchObject,
        userId: userId,
      });
      return data;
    } catch (error) {
      toast.error("Có lỗi xảy ra");
      throw new Error("Có lỗi xảy ra ");
    }
  };

  createPost = async (formData: any) => {
    try {
      const { data } = await createPostRequest(formData);
      return data;
    } catch (error) {
      toast.error("Có lỗi xảy ra");
      throw new Error("Có lỗi xảy ra ");
    }
  };

  updatePost = async (formData: any) => {
    try {
      const { data } = await updatePostRequest(formData);
      return data;
    } catch (error) {
      toast.error("Có lỗi xảy ra");
      throw new Error("Có lỗi xảy ra ");
    }
  };

  deletePost = async (postId: string) => {
    try {
      const { data } = await deletePostRequest(postId);
      return data;
    } catch (error) {
      toast.error("Có lỗi xảy ra");
      throw new Error("Có lỗi xảy ra ");
    }
  };
  updateBackgroundUser = async (backgroundUrl: string) => {
    try {
      const { data } = await updateBackgroundUserRequest(backgroundUrl);
      return data;
    } catch (error) {
      toast.error("Có lỗi xảy ra");
      throw new Error("Có lỗi xảy ra ");
    }
  };
}

export default PostStore;
