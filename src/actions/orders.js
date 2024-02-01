import { requests } from "../api";

export const getRevenueMonth = async(type, year) => {
  try{
    const data = await requests.getRevenue(type, year);
    if(data.data.message === 'ok') {
      return data.data.data;
    }
  }catch(err) {
    console.error(err);
  }
}

export const getRevenueYear = async (type) => {
  try {
    const data = await requests.getRevenue(type);
    if (data.data.message === "ok") {
      return data.data.data;
    }
  } catch (err) {
    console.error(err);
  }
};