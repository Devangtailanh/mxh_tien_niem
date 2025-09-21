import ConstantList from "@/appConfig";
import httpService from "./HttpService";

const API_PATH = ConstantList.API_ENPOINT + "/api/classroom";
const _axios = httpService.getAxiosClient();

export function createClassRequest(formData: any) {
  const url = API_PATH + "/save";
  return _axios.post(url, formData);
}
export function getAllClassroomRequest() {
  const url = API_PATH + "/all";
  return _axios.get(url);
}
export function updateClassRequest(formData: any) {
  const url = API_PATH + "/update";
  return _axios.put(url, formData);
}

export function getClassByIdRequest(classId: string) {
  const url = API_PATH + `/${classId}`;
  return _axios.get(url);
}
export function deleteClassRequest(classId: string) {
  const url = API_PATH + `/delete/${classId}`;
  return _axios.delete(url);
}
export function pagingClassRequest(searchObject: any) {
  const url = API_PATH + `/paging`;
  return _axios.post(url, searchObject);
}
