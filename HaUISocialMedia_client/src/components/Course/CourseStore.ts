import { getAllCourseRequest } from "@/services/CourseService";
import { makeAutoObservable } from "mobx";
import { toast } from "react-toastify";

class CourseStore {
  constructor() {
    makeAutoObservable(this);
  }

  getAllCourse = async () => {
    try {
      const { data } = await getAllCourseRequest();
      return data;
    } catch (error) {
      toast.error("Something went wrong :(");
    }
  };
}

export default CourseStore;
