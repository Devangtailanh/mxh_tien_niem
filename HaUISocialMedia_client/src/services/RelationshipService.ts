import ConstantList from "@/appConfig";
import httpService from "./HttpService";

const API_PATH = ConstantList.API_ENPOINT + "/api/relationship";
const _axios = httpService.getAxiosClient();

export function pagingCurrentFriends(searchObject: any) {
  const url = API_PATH + "/currentFriends";
  return _axios.post(url, searchObject);
}

export function getAllCurrentFriends() {
  const url = API_PATH + "/currentFriends";

  const searchObject = {
    pageSize: 1000000,
    pageIndex: 1,
  };

  return _axios.post(url, searchObject);
}

export function pagingPendingFriendRequests(searchObject: any) {
  const url = API_PATH + "/friendRequest/pending";
  return _axios.post(url, searchObject);
}
export function pagingNewUser(searchObject: any) {
  const url = API_PATH + "/suggesting-users";
  return _axios.post(url, searchObject);
}

export function pagingFriendsOfUser({
  searchObject,
  userId,
}: {
  searchObject: any;
  userId: String;
}) {
  const url = API_PATH + `/friends/${userId}`;
  return _axios.post(url, searchObject);
}

export function acceptFriendRequest(relationshipId: string) {
  const url = API_PATH + `/acceptRequest/${relationshipId}`;

  return _axios.post(url);
}

export function sendAddFriendRequest(receiverId: string) {
  const url = API_PATH + `/friendRequest/${receiverId}`;

  return _axios.post(url);
}

export function unAcceptFriendRequest(relationshipId: string) {
  const url = API_PATH + `/unAcceptFriend/${relationshipId}`;

  return _axios.delete(url);
}

export function unFriendRequest(relationshipId: string) {
  const url = API_PATH + `/unFriend/${relationshipId}`;

  return _axios.delete(url);
}
