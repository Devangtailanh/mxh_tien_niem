import ConstantList from "@/appConfig";
import httpService from "./HttpService";

const API_PATH = ConstantList.API_ENPOINT + "/api/post";
const _axios = httpService.getAxiosClient();

export function pagingPostsOfUser({
  searchObject,
  userId,
}: {
  searchObject: any;
  userId: string;
}) {
  console.log(searchObject);
  const url = API_PATH + `/newsfeed/${userId}`;
  return _axios.post(url, searchObject);
}

export function pagingNewsFeed(searchObject: any) {
  const url = API_PATH + "/newsfeed";
  return _axios.post(url, searchObject);
}
export function adminPagingPostRequest(searchObject: any) {
  const url = API_PATH + "/admin/posts";
  return _axios.post(url, searchObject);
}

export function getById(postId: string) {
  const url = API_PATH + `/${postId}`;
  return _axios.get(url);
}

export function createPostRequest(formData: any) {
  const url = API_PATH;
  return _axios.post(url, formData);
}

export function updatePostRequest(formData: any) {
  const url = API_PATH;
  return _axios.put(url, formData);
}

export function deletePostRequest(postId: any) {
  const url = API_PATH + `/${postId}`;
  return _axios.delete(url);
}
export function updateBackgroundUserRequest(backroundUrl: any) {
  const url = API_PATH + `/BackgroundImage?backgroundImage=${backroundUrl}`;
  return _axios.post(url);
}
