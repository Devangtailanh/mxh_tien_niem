import ConstantList from "@/appConfig";
import HttpService from "./HttpService";

const axios = HttpService.getAxiosClient();

const API_PATH = ConstantList.API_ENPOINT + "/api/room";

export function searchJoinedRooms(searchObject: any) {
    const url = API_PATH + '/search';
    return axios.post(url, searchObject);
}

export function createGroupChat(room: any) {
    const url = API_PATH + '/group';
    return axios.post(url, room);
}

export function updateRoomInfo(room: any) {
    const url = API_PATH;
    return axios.put(url, room);
}

export function getListFriendNotInRoom(roomId: string) {
    const url = API_PATH + "/group/not-in/" + roomId;
    return axios.get(url);
}

export function addSingleUserIntoGroupChat(userId: string, roomId: string) {
    const url = API_PATH + "/group/" + userId + "/" + roomId;
    return axios.post(url);
}

export function addMultipleUsersIntoGroupChat(userIds: any, roomId: string) {
    const url = API_PATH + "/group/" + roomId;
    return axios.post(url, userIds);
}

export function unjoinAnGroupChat(roomId: string) {
    const url = API_PATH + "/group/" + roomId;
    return axios.delete(url);
}

export function getAllJoinedRooms() {
    const url = API_PATH + "/joinedRooms";
    return axios.get(url);
}

export function getAllGroupRooms() {
    const url = API_PATH + "/joinedGroupRooms";
    return axios.get(url);
}

export function getAllPrivateRooms() {
    const url = API_PATH + "/joinedPrivateRooms";
    return axios.get(url);
}