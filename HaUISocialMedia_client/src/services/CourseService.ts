import ConstantList from "@/appConfig";
import httpService from "./HttpService";

const API_PATH = ConstantList.API_ENPOINT + "/api/course";
const _axios = httpService.getAxiosClient();

export function getAllCourseRequest() {
  const url = API_PATH + "/all";
  return _axios.get(url);
}
