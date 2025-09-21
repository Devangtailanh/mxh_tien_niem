import { makeAutoObservable } from "mobx";
import { toast } from "react-toastify";
import {
  pagingCurrentFriends,
  getAllCurrentFriends,
  pagingPendingFriendRequests,
  acceptFriendRequest,
  sendAddFriendRequest,
  unAcceptFriendRequest,
  unFriendRequest,
  pagingFriendsOfUser,
  pagingNewUser,
} from "@/services/RelationshipService";

class RelationshipStore {
  currentFriends: any = null;
  pagingCurrentFriend: any = null;

  constructor() {
    makeAutoObservable(this);
  }

  getAllFriends = async () => {
    try {
      const { data } = await getAllCurrentFriends();

      this.currentFriends = data;

      return data;
    } catch (error) {
      toast.error("Có lỗi xảy ra");
      throw new Error("Có lỗi xảy ra ");
    }
  };

  getCurrentFriend = async (searchObject: any) => {
    try {
      const { data } = await pagingCurrentFriends(searchObject);

      return data;
    } catch (error) {
      toast.error("Có lỗi xảy ra");
      throw new Error("Có lỗi xảy ra ");
    }
  };
  getSuggestFriend = async (searchObject: any) => {
    try {
      const { data } = await pagingNewUser(searchObject);

      return data;
    } catch (error) {
      toast.error("Có lỗi xảy ra");
      throw new Error("Có lỗi xảy ra ");
    }
  };

  getFriendOfUser = async (searchObject: any, userId: string) => {
    try {
      const { data } = await pagingFriendsOfUser({
        searchObject: searchObject,
        userId: userId,
      });

      return data;
    } catch (error) {
      toast.error("Có lỗi xảy ra");
      throw new Error("Có lỗi xảy ra ");
    }
  };

  getPendingFriendRequests = async (searchObject: any) => {
    try {
      const { data } = await pagingPendingFriendRequests(searchObject);
      return data;
    } catch (error) {
      toast.error("Có lỗi xảy ra");
      throw new Error("Có lỗi xảy ra ");
    }
  };
  acceptFriend = async (relationshipId: string) => {
    try {
      const { data } = await acceptFriendRequest(relationshipId);
      return data;
    } catch (error) {
      toast.error("Có lỗi xảy ra");
      throw new Error("Có lỗi xảy ra ");
    }
  };

  addFriend = async (receiverId: string) => {
    try {
      const { data } = await sendAddFriendRequest(receiverId);
      return data;
    } catch (error) {
      toast.error("Có lỗi xảy ra");
      throw new Error("Có lỗi xảy ra ");
    }
  };
  unAcceptFriend = async (relationshipId: string) => {
    try {
      const { data } = await unAcceptFriendRequest(relationshipId);
      return data;
    } catch (error) {
      toast.error("Có lỗi xảy ra");
      throw new Error("Có lỗi xảy ra ");
    }
  };
  unFriend = async (relationshipId: string) => {
    try {
      const { data } = await unFriendRequest(relationshipId);
      return data;
    } catch (error) {
      toast.error("Có lỗi xảy ra");
      throw new Error("Có lỗi xảy ra ");
    }
  };
}

export default RelationshipStore;
