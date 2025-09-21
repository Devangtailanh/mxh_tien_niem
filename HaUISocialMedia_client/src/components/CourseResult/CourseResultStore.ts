import { getAllCourseResultRequest, pagingCourseResultRequest } from "@/services/CourseResultServive";
import { makeAutoObservable } from "mobx";
import { toast } from "react-toastify";

class CourseResultStore {
  constructor() {
    makeAutoObservable(this);
  }

  getAllCourseResult = async () => {
    try {
      const { data } = await getAllCourseResultRequest();
      return data;
    } catch (error) {
      toast.error("Something went wrong :(");
    }
  };
  pagingCourseResult = async (searchObject: any) => {
    try {
      const { data } = await pagingCourseResultRequest(searchObject);
      return data;
    } catch (error) {
      toast.error("Có lỗi xảy ra");
      throw new Error("Có lỗi xảy ra");
    }
  };
}

export default CourseResultStore;
