import ConstantList from "@/appConfig";
import httpService from "./HttpService";

const API_PATH = ConstantList.API_ENPOINT + "/api/message";
const _axios = httpService.getAxiosClient();

export function sendMessage(message: any) {
  const url = API_PATH;
  return _axios.post(url, message);
}

export function findTop20PreviousByMileStone(mileStoneId: any) {
  const url = API_PATH + '/pre20Message';
  const searchObject = {
    mileStoneId: mileStoneId,
  };
  return _axios.post(url, searchObject);
}
