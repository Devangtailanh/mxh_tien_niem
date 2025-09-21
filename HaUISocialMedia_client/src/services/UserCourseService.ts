import ConstantList from "@/appConfig";
import httpService from "./HttpService";

const API_PATH = ConstantList.API_ENPOINT + "/api/userCourse";
const _axios = httpService.getAxiosClient();

export function createUserCourseRequest(formData: any) {
  const url = API_PATH;
  return _axios.post(url, formData);
}

export function allowUserCourseRequest(userCourseId: string) {
  const url = API_PATH + `/allow-userCourse/${userCourseId}`;
  return _axios.get(url);
}
export function deleteUserCourseByIdRequest(userCourseId: string) {
  const url = API_PATH + `/${userCourseId}`;
  return _axios.delete(url);
}

export function getAllCourseAdminAllowRequest(userId: string) {
  const url = API_PATH + `/all-course-admin-allow/${userId}`;
  return _axios.get(url);
}
export function getAllUserCourseNotYetAllowRequest(searchObject: any) {
  const url = API_PATH + `/get-all-user-course-not-yet-allow`;
  return _axios.post(url, searchObject);
}
