import ConstantList from "@/appConfig";
import httpService from "./HttpService";

const API_PATH = ConstantList.API_ENPOINT + "/api/group";
const _axios = httpService.getAxiosClient();

export function createNewGroupRequest(formData: any) {
  const url = API_PATH;
  return _axios.post(url, formData);
}
export function updateGroupRequest(formData: any) {
  const url = API_PATH;
  return _axios.put(url, formData);
}
export function deleteGroupRequest(groupId: string) {
  const url = API_PATH + `/${groupId}`;
  return _axios.delete(url);
}
export function joinGroupRequest(groupId: string) {
  const url = API_PATH + `/join-request/${groupId}`;
  return _axios.get(url);
}
export function approveRequestJoinRequest(menberId: string) {
  const url = API_PATH + `/approve-request-join/${menberId}`;
  return _axios.get(url);
}
export function cancelRequestJoinRequest(menberId: string) {
  const url = API_PATH + `/cancel-request-join/${menberId}`;
  return _axios.delete(url);
}
export function leaveGroupRequest(groupId: string) {
  const url = API_PATH + `/leave-group/${groupId}`;
  return _axios.delete(url);
}
export function getAllJoinedGroupOfUserRequest(userId: string) {
  const url = API_PATH + `/get-all-joined-group/${userId}`;
  return _axios.get(url);
}
export function dutyAdminRequest(menberId: string) {
  const url = API_PATH + `/duty-admin/${menberId}`;
  return _axios.get(url);
}
export function cancelDutyAdminRequet(menberId: string) {
  const url = API_PATH + `/cancel-duty-admin/${menberId}`;
  return _axios.get(url);
}
export function getAllWaitRequest(groupId: string) {
  const url = API_PATH + `/get-all-wait/${groupId}`;
  return _axios.get(url);
}
export function kickMemberRequest(memberId: string) {
  const url = API_PATH + `/delete-member/${memberId}`;
  return _axios.delete(url);
}
export function findByIdRequest(groupId: string) {
  const url = API_PATH + `/${groupId}`;
  return _axios.get(url);
}
export function getAllGroupUserIsAdminRequest() {
  const url = API_PATH + `/get-all-group-user-is-admin`;
  return _axios.get(url);
}
export function getAllGroupUserNotYeJoinRequest() {
  const url = API_PATH + `/get-all-group-user-not-yet-join`;
  return _axios.get(url);
}
export function getAllPostOfAllGroupRequest(searchObject: any) {
  const url = API_PATH + `/get-all-post-of-all-group`;
  return _axios.post(url, searchObject);
}
export function getAllPostOfGroupRequest(groupId: any) {
  const url = API_PATH + `/get-all-post-in-group/${groupId}`;
  return _axios.get(url);
}
