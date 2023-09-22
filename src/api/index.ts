import axios from "axios";

export const SERVER_URL = "http://localhost:5050";
export const URL = SERVER_URL + "/api";

interface Value {
  email?: string;
  password?: string;
}

export const requests = {
  login: (value: Value) => {
    return axios.post(
      `${URL}/login-admin`,
      { ...value },
      {
        validateStatus: function (status) {
          return status < 500;
        },
      }
    );
  },
  forgotPassword: (value: Value) => {
    return axios.post(
      `${URL}/forgot-password`,
      { ...value },
      {
        validateStatus: function (status) {
          return status < 500;
        },
      }
    );
  },
  getVoucher: (
    page: number | undefined,
    limit: number | undefined,
    token: string
  ) => {
    return axios.get(`${URL}/get-voucher?page=${page}&limit=${limit}`, {
      validateStatus: function (status: any) {
        return status < 500;
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  addVoucher: (value: object, token: string) => {
    return axios.post(`${URL}/create-voucher`, value, {
      validateStatus: function (status: any) {
        return status < 500;
      },
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
  },
};
