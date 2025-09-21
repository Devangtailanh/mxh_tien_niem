import ConstantList from "@/appConfig";
import httpService from "./HttpService";

const API_PATH = ConstantList.API_ENPOINT + "/api/leadingDashboard";
const _axios = httpService.getAxiosClient();

export function getLeadingDashBoardRequest(searchObject: any) {
  const url = API_PATH;
  return _axios.post(url, searchObject);
}
export function getLeadingDashBoardOfUserRequest(userId: string) {
  const url = API_PATH + `/${userId}`;
  return _axios.get(url);
}
