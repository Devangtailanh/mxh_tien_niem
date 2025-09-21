import {
  createClassRequest,
  deleteClassRequest,
  getAllClassroomRequest,
  getClassByIdRequest,
  pagingClassRequest,
  updateClassRequest,
} from "@/services/ClassService";
import { makeAutoObservable } from "mobx";
import { toast } from "react-toastify";

class ClassStore {
  constructor() {
    makeAutoObservable(this);
  }

  createClass = async (formData: any) => {
    try {
      const { data } = await createClassRequest(formData);
      return data;
    } catch (error) {
      toast.error("Có lỗi xảy ra");
      throw new Error("Có lỗi xảy ra");
    }
  };
  updateClass = async (formData: any) => {
    try {
      const { data } = await updateClassRequest(formData);
      return data;
    } catch (error) {
      toast.error("Có lỗi xảy ra");
      throw new Error("Có lỗi xảy ra");
    }
  };
  getClassById = async (classId: string) => {
    try {
      const { data } = await getClassByIdRequest(classId);
      return data;
    } catch (error) {
      toast.error("Có lỗi xảy ra");
      throw new Error("Có lỗi xảy ra");
    }
  };
  getAllClassroom = async () => {
    try {
      const { data } = await getAllClassroomRequest();
      return data;
    } catch (error) {
      toast.error("Có lỗi xảy ra");
      throw new Error("Có lỗi xảy ra");
    }
  };
  deleteClass = async (classId: string) => {
    try {
      const { data } = await deleteClassRequest(classId);
      return data;
    } catch (error) {
      toast.error("Có lỗi xảy ra");
      throw new Error("Có lỗi xảy ra");
    }
  };
  pagingClass = async (searchObject: any) => {
    try {
      const { data } = await pagingClassRequest(searchObject);
      return data;
    } catch (error) {
      toast.error("Có lỗi xảy ra");
      throw new Error("Có lỗi xảy ra");
    }
  };
}

export default ClassStore;
