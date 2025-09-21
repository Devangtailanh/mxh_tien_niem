import { makeAutoObservable } from "mobx";
import { toast } from "react-toastify";
import {
  pagingGroupByKeywordRequest,
  pagingPostByKeywordRequest,
  pagingTotalByKeywordRequest,
  pagingUserByKeywordRequest,
} from "@/services/LoadingTotalService";

class LoadingTotalStore {
  constructor() {
    makeAutoObservable(this);
  }

  pagingPostByKeyword = async (searchObject: any) => {
    try {
      const { data } = await pagingPostByKeywordRequest(searchObject);
      return data;
    } catch (error) {
      toast.error("Có lỗi xảy ra");
      throw new Error("Có lỗi xảy ra ");
    }
  };
  pagingUserByKeyword = async (searchObject: any) => {
    try {
      const { data } = await pagingUserByKeywordRequest(searchObject);
      return data;
    } catch (error) {
      toast.error("Có lỗi xảy ra");
      throw new Error("Có lỗi xảy ra ");
    }
  };
  pagingGroupByKeyword = async (searchObject: any) => {
    try {
      const { data } = await pagingGroupByKeywordRequest(searchObject);
      return data;
    } catch (error) {
      toast.error("Có lỗi xảy ra");
      throw new Error("Có lỗi xảy ra ");
    }
  };
  pagingTotalByKeyword = async (searchObject: any) => {
    try {
      const { data } = await pagingTotalByKeywordRequest(searchObject);
      return data;
    } catch (error) {
      toast.error("Có lỗi xảy ra");
      throw new Error("Có lỗi xảy ra ");
    }
  };
}

export default LoadingTotalStore;
