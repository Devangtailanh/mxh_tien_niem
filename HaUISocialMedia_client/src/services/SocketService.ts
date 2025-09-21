import { over } from "stompjs";
import SockJS from "sockjs-client";
import LocalStorageService from "./LocalStorageService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { toastInfo } from "@/common/ToastNotification/ToastInfoNotification";

class SocketService {
    stompClient: any = null;

    constructor() {

    }

    initializeSocket = async (onReceiveRoomMessage: any) => {
        if (!this.stompClient) {

            //start connecting to socket
            const Sock = new SockJS("http://localhost:8000/ws");
            const cliStomp = over(Sock);
            this.stompClient = cliStomp;
            const _this = this;

            cliStomp.connect({}, function () {
                _this.subscribeChannels(onReceiveRoomMessage);
            }, this.onError);
        }
        else {
            console.log("Already has socket connection!")
        }
    }

    subscribeChannels = (onReceiveRoomMessage: any) => {
        const currentUser = LocalStorageService.getLoggedInUser();

        //subscribe channels...
        this.stompClient.subscribe(
            "/user/" + currentUser?.id + "/privateMessage", onReceiveRoomMessage
        );
        this.stompClient.subscribe(
            "/user/" + currentUser?.id + "/notification", this.onReceivedNotification
        );
    }

    disconnectStompClient = () => {
        if (this?.stompClient) {
            this?.stompClient.disconnect();
            this.stompClient = null;
            // toast.success("Disconnected from stomp");
        }
    }

    onReceivedNotification = (data: any) => {
        const currentLocation = window?.location?.href;
        const notification = JSON.parse(data?.body);
        console.log("notification: ", notification);

        //dont show chat notifiction when use is in messenger page
        if (currentLocation.includes("messenger-v2") && notification?.notificationType?.name == "Chat") return;
        // toast.info(data?.content);
        toastInfo(notification);
    }

    onError = (err: any) => {
        console.error(err);

        toast.error(
            "Không thể kết nối với hệ thống, tự động đăng xuất trong 5s...",
            { autoClose: 5000 }
        );

        setTimeout(function () {
            window.location.href = "/login";

            const navigate = useNavigate();
            navigate('/login');
        }, 5000);
    }
}

export default new SocketService();