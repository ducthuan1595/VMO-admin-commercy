import axios from "axios";

const SERVER_URL = "http://localhost:5050/api";

interface Value {
  email?: string;
  password?: string;
}

export const requests = {
  login: (value: Value) => {
    return axios.post(
      `${SERVER_URL}/login-admin`,
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
      `${SERVER_URL}/forgot-password`,
      { ...value },
      {
        validateStatus: function (status) {
          return status < 500;
        },
      }
    );
  },
  getVoucher: (token: string) => {
    console.log(token);

    return axios.get(`${SERVER_URL}/get-voucher`, {
      validateStatus: function (status: any) {
        return status < 500;
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};
