import axios from "axios";
import { toast } from "react-toastify";

const HttpMethods = {
  GET: 'GET',
  POST: 'POST',
  DELETE: 'DELETE',
};

const _axios = axios.create();

const configure = () => {
  // DIAYTI NOTE: VERY OLD CONFIG INTERCEPTER OF AXIOS
  // _axios.interceptors.request.use((config) => {
  //   const cb = () => {
  //     //config.header("Access-Control-Allow-Origin", "http://localhost:3000");
  //     //config.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  //     //config.headers['Access-Control-Allow-Origin']= "http://localhost:3000";
  //     //config.headers['Access-Control-Allow-Methods'] ="Origin, X-Requested-With, Content-Type, Accept";      
  //     config.headers.Authorization = `Bearer ${UserService.getToken()}`;
  //     return Promise.resolve(config);
  //   };

  //   return UserService.updateToken(cb);
  // });

  // Add a request interceptor
  _axios.interceptors.request.use(
    function (config) {
      // Get token from local storage or wherever it's stored
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      else {
        reForwardToLogin();
      }

      return config;
    },
    function (error) {
      // reForwardToLogin();

      return Promise.reject(error);
    }
  );

  // Add a response interceptor
  _axios.interceptors.response.use(
    function (response) {
      // Handle responses

      return response;
    },
    function (error) {
      // Handle errors
      // reForwardToLogin();

      return Promise.reject(error);
    }
  );
};

function reForwardToLogin() {
  toast.warning("Phiên đăng nhập hết hạn, vui lòng đăng nhập để sử dụng phần mềm!");
  window.location.href = "/login";
}

const getAxiosClient = () => _axios;

export default {
  HttpMethods,
  configure,
  getAxiosClient,
}
