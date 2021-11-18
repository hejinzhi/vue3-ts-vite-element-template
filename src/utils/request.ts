import axios from "axios";
import { ElMessageBox, ElMessage } from "element-plus";
import store from "@/store";
import { getToken } from "@/utils/auth";

// create an axios instance
const service = axios.create({
  baseURL: "", // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 120 * 1000, // request timeout
});

// request interceptor
service.interceptors.request.use(
  (config) => {
    if (store.getters.token) {
      config.headers["Authorization"] = "bearer " + getToken();
    }
    return config;
  },
  (error) => {
    // do something with request error
    console.log(error); // for debug
    return Promise.reject(error);
  }
);

// response interceptor
service.interceptors.response.use(
  (response) => {
    const res = response.data;
    if (!res.data) {
      // ElMessage({
      //   message: res.message || res.data.message || "Error",
      //   type: "error",
      //   duration: 5 * 1000,
      // });
      return Promise.reject(
        new Error(res.message || res.data.message || "Error")
      );
    } else {
      return res;
    }
  },
  (error) => {
    ElMessage({
      message: error.response.data.message,
      type: "error",
      duration: 5 * 1000,
    });
    return Promise.reject(error);
    // console.log(error.response); // for debug
    // const code = error.response.status;
    // if (code === 404 || code === 403) {
    //   let title = "因系统长时间没有使用，已自动退出登录";
    //   if (code === 403) {
    //     title = "您的身份信息已过期，请重新登录";
    //   }
    //   ElMessageBox.confirm(title, "重新登录", {
    //     confirmButtonText: "重新登录",
    //   }).then(() => {
    //     store.dispatch("user/resetToken").then(() => {
    //       location.reload();
    //     });
    //   });
    // } else {
    //   ElMessage({
    //     message: error.response.data.message,
    //     type: "error",
    //     duration: 5 * 1000,
    //   });
    //   return Promise.reject(error);
    // }
  }
);

export default service;
