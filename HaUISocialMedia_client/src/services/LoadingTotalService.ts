import ConstantList from "@/appConfig";
import httpService from "./HttpService";

const API_PATH = ConstantList.API_ENPOINT + "/api/loadingTotal";
const _axios = httpService.getAxiosClient();

export function pagingPostByKeywordRequest(searchObject: any) {
  const url = API_PATH + "/search-post";
  return _axios.post(url, searchObject);
}
export function pagingUserByKeywordRequest(searchObject: any) {
  const url = API_PATH + "/search-user";
  return _axios.post(url, searchObject);
}
export function pagingGroupByKeywordRequest(searchObject: any) {
  const url = API_PATH + "/search-group";
  return _axios.post(url, searchObject);
}
export function pagingTotalByKeywordRequest(searchObject: any) {
  const url = API_PATH + "/search-total";
  return _axios.post(url, searchObject);
}
