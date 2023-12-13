import axios from "../config/axios";

export async function getOrderReport(data2, cityCode) {
  try {
    let data = await axios.post(`/api/report/order/city/${cityCode}`, data2);
    return data;
  } catch (error) {
    return error;
  }
}
export async function getProductTypeReport(data2) {
  try {
    let data = await axios.post(`/api/report/product_type`, data2);
    return data;
  } catch (error) {
    return error;
  }
}
