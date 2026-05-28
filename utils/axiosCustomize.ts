import axios from "axios";
const instance = axios.create({
  baseURL: "http://localhost:3000/",
  // baseURL: "http://localhost:3000/",
  //   timeout: 1000,
  //   headers: { "X-Custom-Header": "foobar" }, gắn token vào (JWT)
});

// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent

    // assign token to req before sent
    const token = localStorage.getItem("accessToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  },
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
    // && response.data ? response.data : response;
    // response sẽ trả về data chứ không có mấy cái khác (cái nào dùng axios đều thế)
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return error && error.response && error.response.data
      ? error.response.data
      : Promise.reject(error);
  },
);

export default instance;
