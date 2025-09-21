import ConstantList from "@/appConfig";
import httpService from "./HttpService";

const API_PATH = ConstantList.API_ENPOINT + "/api/like";
const _axios = httpService.getAxiosClient();

export function likeAPostRequest(postId: string) {
  const url = API_PATH + `/${postId}`;
  return _axios.post(url);
}

export function dislikeAPostRequest(postId: string) {
  const url = API_PATH + `/${postId}`;
  return _axios.delete(url);
}
