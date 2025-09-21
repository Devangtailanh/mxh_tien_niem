import { dislikeAPostRequest, likeAPostRequest } from "@/services/LikeService";

import { makeAutoObservable } from "mobx";

class LikeStore {
  constructor() {
    makeAutoObservable(this);
  }

  likePost = async (postId: string) => {
    try {
      const { data } = await likeAPostRequest(postId);
      return data;
    } catch (error) {}
  };
  dislikePost = async (postId: string) => {
    try {
      const { data } = await dislikeAPostRequest(postId);
      return data;
    } catch (error) {}
  };
}

export default LikeStore;
