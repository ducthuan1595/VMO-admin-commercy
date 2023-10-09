import axios from "axios";

export const SERVER_URL = process.env.REACT_APP_API_URL;

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
  addVoucher: (value: any, token: string) => {
    return axios.post(`${URL}/create-voucher`, value, {
      validateStatus: function (status: any) {
        return status < 500;
      },
      headers: {
        Authorization: `Bearer ${token}`,
        // "Content-Type": "multipart/form-data",
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
    type: string | null,
    column: string | null,
    token: string
  ) => {
    return axios.get(
      `${URL}/get-all-category?page=${page}&limit=${limit}&categoryId=${categoryId}&type=${type}&column=${column}`,
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
        // "Content-Type": "multipart/form-data",
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
  // Item
  getItem: (
    filter: string | null,
    searchItem: string | null,
    sort: string | null,
    page: number | null,
    limit: number | null,
    type: string | null,
    column: string | null,
    itemId: string | null,
    isSale: boolean,
    token: string
  ) => {
    console.log("key", searchItem);

    return axios.get(
      `${URL}/get-item?page=${page}&limit=${limit}&itemId=${itemId}&filter=${filter}&key=${searchItem}&sort=${sort}&type=${type}&column=${column}&isSale=${isSale}`,
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
  editItem: (value: object, token: string) => {
    return axios.post(`${URL}/update-item`, value, {
      validateStatus: function (status: any) {
        return status < 500;
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  createItem: (value: object, token: string) => {
    return axios.post(`${URL}/create-item`, value, {
      validateStatus: function (status: any) {
        return status < 500;
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  deleteItem: (value: object, token: string) => {
    return axios.post(`${URL}/delete-item`, value, {
      validateStatus: function (status: any) {
        return status < 500;
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  // flash sale
  getFlashSale: (page: number | null, limit: number | null, token: string) => {
    return axios.get(`${URL}/get-flashsale?page=${page}&limit=${limit}`, {
      validateStatus: function (status: any) {
        return status < 500;
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  createFlashSale: (value: object, token: string) => {
    return axios.post(`${URL}/create-flashsale`, value, {
      validateStatus: function (status: any) {
        return status < 500;
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  getOrder: (
    page: number,
    limit: number,
    type: string | null,
    column: string | null,
    token: string
  ) => {
    return axios.get(
      `${URL}/get-order?page=${page}&limit=${limit}&type=${type}&column=${column}`,
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
  // get users
  getUser: (page: number, limit: number, key: string | null, token: string) => {
    return axios.get(`${URL}/get-user?page=${page}&limit=${limit}&key=${key}`, {
      validateStatus: function (status: any) {
        return status < 500;
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};
