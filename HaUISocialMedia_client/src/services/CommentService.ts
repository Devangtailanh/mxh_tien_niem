import ConstantList from "@/appConfig";
import httpService from "./HttpService";

const API_PATH = ConstantList.API_ENPOINT + "/api/comment";
const _axios = httpService.getAxiosClient();

export function createCommentRequest(formData: any) {
  const url = API_PATH;
  return _axios.post(url, formData);
}

export function getSubCommentsRequest(commentId: string) {
  const url = API_PATH + `/children/${commentId}`;
  return _axios.get(url);
}
export function getParentCommentOfPostRequest(postId: string) {
  const url = API_PATH + `/forPost/${postId}`;
  return _axios.get(url);
}
