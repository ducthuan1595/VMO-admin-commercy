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
  getVoucher: (page: number | null, limit: number | null, token: string) => {
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
  deleteVoucher: (value: object, token: string) => {
    return axios.post(`${URL}/delete-voucher`, value, {
      validateStatus: function (status: any) {
        return status < 500;
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  getCategory: (
    page: number | null,
    limit: number | null,
    categoryId: string | null,
    token: string
  ) => {
    return axios.get(
      `${URL}/get-all-category?page=${page}&limit=${limit}&categoryId=${categoryId}`,
      {
        validateStatus: function (status: any) {
          return status < 500;
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  },
  addCategory: (value: object, token: string) => {
    return axios.post(`${URL}/create-category`, value, {
      validateStatus: function (status: any) {
        return status < 500;
      },
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
  },
  deleteCategory: (value: object, token: string) => {
    return axios.post(`${URL}/delete-category`, value, {
      validateStatus: function (status: any) {
        return status < 500;
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  editCategory: (value: object, token: string) => {
    return axios.post(`${URL}/update-category`, value, {
      validateStatus: function (status: any) {
        return status < 500;
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};
