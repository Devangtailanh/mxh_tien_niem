import { makeAutoObservable } from "mobx";
import { toast } from "react-toastify";
import LocalStorage from "@/services/LocalStorageService";
import {
  searchJoinedRooms,
  createGroupChat,
  updateRoomInfo,
  unjoinAnGroupChat,
  addSingleUserIntoGroupChat,
  getListFriendNotInRoom,
  addMultipleUsersIntoGroupChat,
  getAllJoinedRooms,
} from "@/services/RoomService";
import {
  sendMessage,
  findTop20PreviousByMileStone,
} from "@/services/MessageService";

class ChatStore {
  isLoading: boolean = true;

  setIsLoading = (state: boolean) => {
    if (this.isLoading != state) this.isLoading = state;
  };

  constructor() {
    makeAutoObservable(this);
  }

  sendMessage = async (messageContent: string) => {
    if (
      !messageContent ||
      messageContent.length === 0 ||
      messageContent.trim().length <= 0
    ) {
      return;
    }
    try {
      const currentUser = LocalStorage.getLoggedInUser();

      const chatMessage = {
        content: messageContent,
        room: { id: this?.chosenRoom?.id },
        messageType: { name: "chat" },
        user: currentUser,
      };
      console.log("msg content: " + messageContent);

      //send message via stompclient
      // this?.stompClient?.send(
      //   "/messenger/privateMessage",
      //   {},
      //   JSON.stringify(chatMessage)
      // );

      //send message via api
      const { data: sentMessage } = await sendMessage(chatMessage);
      console.log("sent message: ", sentMessage);
    } catch (err: any) {
      if (err?.response?.status === 401)
        toast.error("Bạn không còn quyền truy cập vào cuộc hội thoại này");
      else {
        console.log(err);
        toast.error("Có lỗi xảy ra khi gửi tin nhắn, vui lòng thử lại sau");
      }
      throw new Error(err);
    }
  };
  sendSticker = async (messageContent: string) => {
    if (
      !messageContent ||
      messageContent.length === 0 ||
      messageContent.trim().length <= 0
    ) {
      return;
    }
    try {
      const currentUser = LocalStorage.getLoggedInUser();

      const chatMessage = {
        content: messageContent,
        room: { id: this?.chosenRoom?.id },
        messageType: { name: "sticker" },
        user: currentUser,
      };
      console.log("msg content: " + messageContent);

      //send message via stompclient
      // this?.stompClient?.send(
      //   "/messenger/privateMessage",
      //   {},
      //   JSON.stringify(chatMessage)
      // );

      //send message via api
      const { data: sentMessage } = await sendMessage(chatMessage);
      console.log("sent message: ", sentMessage);
    } catch (err: any) {
      if (err?.response?.status === 401)
        toast.error("Bạn không còn quyền truy cập vào cuộc hội thoại này");
      else {
        console.log(err);
        toast.error("Có lỗi xảy ra khi gửi tin nhắn, vui lòng thử lại sau");
      }
      throw new Error(err);
    }
  };

  resetStore = () => {
    this.joinedRooms = [];
    this.chosenRoom = null;
    this.isLoadingMore = false;
    this.canLoadMore = true;
  };

   onReceiveRoomMessage = (payload: any) => {
    const payloadData = JSON.parse(payload.body);
    const roomId = payloadData?.room?.id;
    if (!roomId) {
      toast.error("Tin nhắn nhận được không hợp lệ!");
      return;
    }

    let isExisted: any = null;
    for (let i = 0; i < this.joinedRooms.length; i++) {
      const currentRoom = this.joinedRooms[i];
      if (currentRoom?.id === roomId) {
        if (!currentRoom.messages) currentRoom.messages = [];
        currentRoom.messages.push(payloadData);
        this.joinedRooms[i] = { ...currentRoom };
        isExisted = i;

        if (currentRoom?.id === this?.chosenRoom?.id) {
          this.chosenRoom = { ...currentRoom };
        }
      }
    }

    if (isExisted || isExisted == 0) {
      const temp = this.joinedRooms[isExisted];
      for (let i = isExisted; i >= 1; i--) {
        this.joinedRooms[i] = this.joinedRooms[i - 1];
      }
      this.joinedRooms[0] = temp;
      this.joinedRooms = [...this.joinedRooms];
    } else {
      const newRoom = payloadData.room;
      const firstMessage = {
        ...payloadData,
        room: null,
      };
      newRoom.messages = [firstMessage];
      this.joinedRooms.unshift(newRoom);
      this.joinedRooms = [...this.joinedRooms];
    }
  };

  onError = (err: any) => {
    console.log(err);
    toast.error("Không kết nối được với hệ thống tin nhắn!");
  };

  chosenRoom: any = null;
  setChosenRoom = (chosenRoom: any) => {
    this.chosenRoom = chosenRoom;
  };

  joinedRooms: any = [];
  getAllJoinedRooms = async () => {
    this.joinedRooms = [];
    this.chosenRoom = null;

    try {
      const { data } = await getAllJoinedRooms();
      this.joinedRooms = data;
      this.chosenRoom = data[0];
    } catch (error) {
      console.log(error);
      toast.error(
        "Tải thông tin cuộc các cuộc trò chuyện có lỗi, vui lòng thử lại sau"
      );
    }
  };

  searchJoinedRooms = async (keyword: string) => {
    try {
      const searchObject = {
        keyword: keyword,
      };
      const { data } = await searchJoinedRooms(searchObject);
      this.joinedRooms = data;
    } catch (err: any) {
      console.log(err);
      toast.error("Tìm kiếm cuộc trò chuyện có lỗi, vui lòng thử lại sau");
      throw new Error(err);
    }
  };

  createGroupChat = async (room: any) => {
    toast.info("Vui lòng đợi! Yêu cầu đang được xử lí");
    try {
      this.setIsLoading(true);
      const { data } = await createGroupChat(room);
      // console.log("new group chat: ", data);
      await this.getAllJoinedRooms();

      this.setIsLoading(false);
      return data;
    } catch (err: any) {
      console.log(err);
      toast.error(
        "Có lỗi xảy ra khi tạo cuộc trò chuyện mới! Vui lòng thử lại sau"
      );
      throw new Error(err);
    }
  };

  updateRoomInfo = async (room: any) => {
    try {
      this.setIsLoading(true);

      const incomingRoom = { ...this.chosenRoom };

      if (room?.color) incomingRoom.color = room.color;
      if (room?.name) incomingRoom.name = room.name;
      if (room?.description) incomingRoom.description = room.description;

      const { data } = await updateRoomInfo(incomingRoom);

      await this.getAllJoinedRooms();

      console.log("updated group chat: ", data);

      // await this.getAllJoinedRooms();
      this.setIsLoading(false);

      return data;
    } catch (err: any) {
      console.log(err);
      this.setIsLoading(false);
      toast.error(
        "Cập nhật thông tin cuộc trò chuyện có lỗi, vui lòng thử lại sau"
      );
      throw new Error(err);
    }
  };

  leaveConversation = async () => {
    try {
      this.setIsLoading(true);

      const { data } = await unjoinAnGroupChat(this.chosenRoom?.id);

      console.log("updated group chat: ", data);

      await this.getAllJoinedRooms();
      this.setIsLoading(false);

      return data;
    } catch (err: any) {
      console.log(err);
      this.setIsLoading(false);
      toast.error(
        "Cập nhật thông tin cuộc trò chuyện có lỗi, vui lòng thử lại sau"
      );
      throw new Error(err);
    }
  };

  addNewParticipant = async (userId: string) => {
    try {
      this.setIsLoading(true);

      const { data } = await addSingleUserIntoGroupChat(
        userId,
        this.chosenRoom?.id
      );

      await this.getAllJoinedRooms();
      this.setIsLoading(false);

      return data;
    } catch (err: any) {
      console.log(err);
      this.setIsLoading(false);
      toast.error(
        "Cập nhật thông tin cuộc trò chuyện có lỗi, vui lòng thử lại sau"
      );
      throw new Error(err);
    }
  };

  notJoinedFriends: any = [];
  getListFriendNotInRoom = async () => {
    try {
      const { data } = await getListFriendNotInRoom(this.chosenRoom?.id);

      this.notJoinedFriends = data;

      return data;
    } catch (err: any) {
      console.log(err);
      toast.error(
        "Có lỗi khi lấy danh sách bạn bè chưa tham gia, vui lòng thử lại sau"
      );
      throw new Error(err);
    }
  };

  addMultipleUsersIntoGroupChat = async (userIds: any) => {
    try {
      this.setIsLoading(true);

      const { data } = await addMultipleUsersIntoGroupChat(
        userIds,
        this.chosenRoom?.id
      );

      await this.getAllJoinedRooms();
      this.setIsLoading(false);

      return data;
    } catch (err: any) {
      console.log(err);
      this.setIsLoading(false);
      toast.error(
        "Cập nhật thông tin cuộc trò chuyện có lỗi, vui lòng thử lại sau!"
      );
      throw new Error(err);
    }
  };

  uploadRoomAvatar = async (image: any) => {
    try {
      this.setIsLoading(true);

      const incomingRoom = { ...this.chosenRoom };
      incomingRoom.avatar = image;

      const { data } = await updateRoomInfo(incomingRoom);
      await this.getAllJoinedRooms();
      console.log(data);
      this.setIsLoading(false);

      return null;
    } catch (error: any) {
      this.setIsLoading(false);
      console.error("Error updating user info in AccountStore:", error);
      // Xử lý lỗi nếu cần thiết
      throw error;
    }
  };

  getAvatarSrc = async (avatarUrl: string) => {
    if (!avatarUrl) return;

    try {
      return null;
    } catch (error: any) {
      console.error("Error getting avatar:", error);
      // Handle errors as needed
    }
  };

  // handle for loading more messsages
  isLoadingMore = false;
  canLoadMore = true;

  handleLoadMoreMessages = async () => {
    try {
      if (this.isLoadingMore || !this?.canLoadMore) return;
      this.isLoadingMore = true;

      const latestMessage = this.getLatestAvailableMessage();

      const { data } = await findTop20PreviousByMileStone(latestMessage?.id);
      if (data?.length < 20) this.canLoadMore = false;

      this.chosenRoom.messages = [...data, ...this.chosenRoom.messages];

      this.isLoadingMore = false;
    } catch (error: any) {
      toast.error("Có lỗi xảy ra khi tải tin nhắn cũ");
      console.log("cannot load more messages in this situation");
    }
  };

  getLatestAvailableMessage = () => {
    if (this.chosenRoom == null) return null;

    const availableMesssages = this?.chosenRoom?.messages;
    if (!availableMesssages || availableMesssages.length == 0) return null;

    const latestMessage = availableMesssages[0];

    return latestMessage;
  };
}

export default ChatStore;
