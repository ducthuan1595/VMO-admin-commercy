import axios, { AxiosInstance } from "axios";

export interface CustomAxiosInstance extends AxiosInstance {
  message: string;
}

const API_URl = process.env.REACT_APP_API_URL;

const instance = axios.create({
  baseURL: API_URl + "/api",
  validateStatus: function (status) {
    return status < 500;
  },
});


instance.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function (response) {
    if (response.status < 500) {
      return response;
    } else {
      return Promise.reject(
        "Request failed with status code is " + response.status
      );
    }
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default instance;