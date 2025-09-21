import ConstantList from "@/appConfig";
import httpService from "./HttpService";

const API_PATH = ConstantList.API_ENPOINT + "/api/courseresult";
const _axios = httpService.getAxiosClient();

export function getAllCourseResultRequest() {
  const url = API_PATH + "/all";
  return _axios.get(url);
}
//  /api/courseresult/paging
export function pagingCourseResultRequest(searchObject: any) {
  const url = API_PATH + "/paging";
  return _axios.post(url, searchObject);
}