
import axios from "../config/instance";
interface Value {
  email?: string;
  password?: string;
}

export interface CustomData {
  message: string;
}

export const requests = {
  login: (value: Value) => {
    return axios.post(`/login-admin`, { ...value });
  },
  forgotPassword: (value: Value) => {
    return axios.post(`/forgot-password`, { ...value });
  },
  getVoucher: (page: number | null, limit: number | null, token: string) => {
    return axios.get(`/get-voucher?page=${page}&limit=${limit}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  addVoucher: (value: any, token: string) => {
    return axios.post(`/create-voucher`, value, {
      headers: {
        Authorization: `Bearer ${token}`,
        // "Content-Type": "multipart/form-data",
      },
    });
  },
  deleteVoucher: (value: object, token: string) => {
    return axios.post(`/delete-voucher`, value, {
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
      `/get-all-category?page=${page}&limit=${limit}&categoryId=${categoryId}&type=${type}&column=${column}`,
      {
        
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  },
  addCategory: (value: object, token: string) => {
    return axios.post(`/create-category`, value, {
      
      headers: {
        Authorization: `Bearer ${token}`,
        // "Content-Type": "multipart/form-data",
      },
    });
  },
  deleteCategory: (value: object, token: string) => {
    return axios.post(`/delete-category`, value, {
     
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  editCategory: (value: object, token: string) => {
    return axios.post(`/update-category`, value, {
      
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
    return axios.get(
      `/get-item?page=${page}&limit=${limit}&itemId=${itemId}&filter=${filter}&key=${searchItem}&sort=${sort}&type=${type}&column=${column}&isSale=${isSale}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  },
  editItem: (value: object, token: string) => {
    return axios.post(`/update-item`, value, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  createItem: (value: object, token: string) => {
    return axios.post(`/create-item`, value, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  deleteItem: (value: object, token: string) => {
    return axios.post(`/delete-item`, value, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  // flash sale
  getFlashSale: (page: number | null, limit: number | null, token: string) => {
    return axios.get(`/get-flashsale?page=${page}&limit=${limit}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  createFlashSale: (value: object, token: string) => {
    return axios.post(`/create-flashsale`, value, {
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
      `/get-order?page=${page}&limit=${limit}&type=${type}&column=${column}`,
      {
        
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  },

  getRevenue: (type: string, year: number) => {
    return axios.get(`/v2/get-revenue-month?type=${type}&year=${year}`);
  },

  // get users
  getUser: (page: number, limit: number, key: string | null, token: string) => {
    return axios.get(`/get-user?page=${page}&limit=${limit}&key=${key}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};
