import {
  approveRequestJoinRequest,
  cancelDutyAdminRequet,
  cancelRequestJoinRequest,
  createNewGroupRequest,
  deleteGroupRequest,
  dutyAdminRequest,
  findByIdRequest,
  getAllGroupUserIsAdminRequest,
  getAllGroupUserNotYeJoinRequest,
  getAllJoinedGroupOfUserRequest,
  getAllPostOfAllGroupRequest,
  getAllPostOfGroupRequest,
  getAllWaitRequest,
  joinGroupRequest,
  kickMemberRequest,
  leaveGroupRequest,
  updateGroupRequest,
} from "@/services/GroupSevice";
import { makeAutoObservable } from "mobx";
import { toast } from "react-toastify";

class GroupStore {
  constructor() {
    makeAutoObservable(this);
  }

  createNewGroup = async (formData: any) => {
    try {
      const { data } = await createNewGroupRequest(formData);
      return data;
    } catch (error) {
      toast.error("Có lỗi xảy ra");
      throw new Error("Có lỗi xảy ra");
    }
  };
  updateGroup = async (formData: any) => {
    try {
      const { data } = await updateGroupRequest(formData);
      return data;
    } catch (error) {
      toast.error("Có lỗi xảy ra");
      throw new Error("Có lỗi xảy ra");
    }
  };
  deleteGroup = async (groupId: string) => {
    try {
      const { data } = await deleteGroupRequest(groupId);
      return data;
    } catch (error) {
      toast.error("Có lỗi xảy ra");
      throw new Error("Có lỗi xảy ra");
    }
  };
  joinGroup = async (groupId: string) => {
    try {
      const { data } = await joinGroupRequest(groupId);
      return data;
    } catch (error) {
      toast.error("Có lỗi xảy ra");
      throw new Error("Có lỗi xảy ra");
    }
  };
  approveRequestJoin = async (groupId: string) => {
    try {
      const { data } = await approveRequestJoinRequest(groupId);
      return data;
    } catch (error) {
      toast.error("Có lỗi xảy ra");
      throw new Error("Có lỗi xảy ra");
    }
  };
  cancelRequestJoin = async (menberId: string) => {
    try {
      const { data } = await cancelRequestJoinRequest(menberId);
      return data;
    } catch (error) {
      toast.error("Có lỗi xảy ra");
      throw new Error("Có lỗi xảy ra");
    }
  };
  leaveGroup = async (groupId: string) => {
    try {
      const { data } = await leaveGroupRequest(groupId);
      return data;
    } catch (error) {
      toast.error("Có lỗi xảy ra");
      throw new Error("Có lỗi xảy ra");
    }
  };
  getAllJoinedGroupOfUser = async (userId: string) => {
    try {
      const { data } = await getAllJoinedGroupOfUserRequest(userId);
      return data;
    } catch (error) {
      toast.error("Có lỗi xảy ra");
      throw new Error("Có lỗi xảy ra");
    }
  };
  dutyAdmin = async (menberId: string) => {
    try {
      const { data } = await dutyAdminRequest(menberId);
      return data;
    } catch (error) {
      toast.error("Có lỗi xảy ra");
      throw new Error("Có lỗi xảy ra");
    }
  };
  cancelDutyAdmin = async (menberId: string) => {
    try {
      const { data } = await cancelDutyAdminRequet(menberId);
      return data;
    } catch (error) {
      toast.error("Có lỗi xảy ra");
      throw new Error("Có lỗi xảy ra");
    }
  };
  getAllWait = async (groupId: string) => {
    try {
      const { data } = await getAllWaitRequest(groupId);
      return data;
    } catch (error) {
      toast.error("Có lỗi xảy ra");
      throw new Error("Có lỗi xảy ra");
    }
  };
  kickMember = async (memberId: string) => {
    try {
      const { data } = await kickMemberRequest(memberId);
      return data;
    } catch (error) {
      toast.error("Có lỗi xảy ra");
      throw new Error("Có lỗi xảy ra");
    }
  };
  findById = async (groupId: string) => {
    try {
      const { data } = await findByIdRequest(groupId);
      return data;
    } catch (error) {
      toast.error("Có lỗi xảy ra");
      throw new Error("Có lỗi xảy ra");
    }
  };
  getAllGroupUserIsAdmin = async () => {
    try {
      const { data } = await getAllGroupUserIsAdminRequest();
      return data;
    } catch (error) {
      toast.error("Có lỗi xảy ra");
      throw new Error("Có lỗi xảy ra");
    }
  };
  getAllGroupUserNotYeJoin = async () => {
    try {
      const { data } = await getAllGroupUserNotYeJoinRequest();
      return data;
    } catch (error) {
      toast.error("Có lỗi xảy ra");
      throw new Error("Có lỗi xảy ra");
    }
  };
  getAllPostOfAllGroup = async (paging: any) => {
    try {
      const { data } = await getAllPostOfAllGroupRequest(paging);
      return data;
    } catch (error) {
      toast.error("Có lỗi xảy ra");
      throw new Error("Có lỗi xảy ra");
    }
  };
  getAllPostOfGroup = async (groupId: string) => {
    try {
      const { data } = await getAllPostOfGroupRequest(groupId);
      return data;
    } catch (error) {
      toast.error("Có lỗi xảy ra");
      throw new Error("Có lỗi xảy ra");
    }
  };
}

export default GroupStore;
