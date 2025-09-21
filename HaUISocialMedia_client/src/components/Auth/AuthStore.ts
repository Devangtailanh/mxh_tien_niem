import { makeAutoObservable } from "mobx";
import { toast } from "react-toastify";
import LocalStorage from "@/services/LocalStorageService";
import { registerUser, authenticateUser } from "../../services/AuthService";
import axios from "axios";
import { getCurrentLoginUser } from "@/services/UserService";
import SocketService from "@/services/SocketService";

class AuthStore {
  constructor() {
    makeAutoObservable(this);
  }

  getLoggedInUser() {
    return LocalStorage.getLoggedInUser();
  }

  signUpUser = async (user: any) => {
    try {
      const { data } = await registerUser(user);
      toast.success("Chúc mừng bạn đã đăng kí thành công, vui lòng đăng nhập lại!", {
        position: "top-left",
      });
      return data;
    } catch (error: any) {
      if (error?.response?.status === 409)
        toast.info("Tên người dùng đã tồn tại, vui lòng chọn tên khác!", {
          position: "top-left",
        });
      else {
        console.error(error);
        toast.error("Đăng kí tài khoản có lỗi :(", {
          position: "top-left",
        });
      }
      throw new Error(error);
    }
  };

  authenticateUser = async (user: any) => {
    try {
      const { data } = await authenticateUser(user);
      const userData = data?.loggedInUser;

      toast.dismiss();
      toast.success("Đăng nhập thành công, cùng trải nghiệm ứng dụng nào!", {
        position: "top-left",
      });

      this.setSession(data?.accessToken);
      this.setUser(userData);

      // this.connectToSocket();
      return data;
    } catch (error: any) {
      if (error?.response?.status === 401)
        toast.error("Tên tài khoản hoặc mật khẩu không chính xác!", {
          position: "top-left",
        });
      else if (error?.response?.status === 403) {
        toast.error(
          "Tài khoản của bạn đã bị khoá! Vui lòng liên hệ với Quản trị viên!",
          {
            position: "top-left",
          }
        );
      } else {
        toast.error("Lỗi kết nối!", {
          position: "top-left",
        });
      }
      throw new Error(error);
    }
  };

  logout = () => {
    this.setSession(null);
    this.removeUser();
    SocketService.disconnectStompClient();
    window.location.href = "/login";
  };

  setSession(token: any) {
    if (token) {
      LocalStorage.setItem("jwt_token", token);

      //add field to compatible with Thanh Thuan code
      localStorage.setItem("token", token);

      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    } else {
      LocalStorage.removeItem("jwt_token");

      //add field to compatible with Thanh Thuan code
      localStorage.removeItem("token");

      delete axios.defaults.headers.common["Authorization"];
    }
  }

  loadCurrentUserByApi = async () => {
    // debugger
    try {
      const { data } = await getCurrentLoginUser();

      this.setUser(data);
    } catch (error: any) {
      console.error(error);
      toast.error(
        "Có lỗi xảy ra khi tải dữ liệu người dùng, vui lòng thử lại sau"
      );
    }
  };

  setUser = (user: any) => {
    LocalStorage.setItem("auth_user", user);
    //add field to compatible with Thanh Thuan code
    localStorage.setItem("user", user);
  };
  removeUser = () => {
    LocalStorage.removeItem("auth_user");
    //add field to compatible with Thanh Thuan code
    localStorage.removeItem("user");
  };

  getAllClaimsFromJwt = (token: any) => {
    if (!token) {
      console.error("No valid token!");
      return;
    }

    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    return JSON.parse(jsonPayload);
  };
}

export default AuthStore;
