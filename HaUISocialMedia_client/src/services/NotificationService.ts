import ConstantList from "@/appConfig";
import httpService from "./HttpService";

const API_PATH = ConstantList.API_ENPOINT + "/api/notification";
const _axios = httpService.getAxiosClient();

export function pagingNotification(searchObject: any) {
  const url = API_PATH + "/paging";
  return _axios.post(url, searchObject);
}
