import axios from "../config/axios";

export async function getVoucherList() {
  try {
    let data = await axios.get("/api/voucher");
    return data;
  } catch (error) {
    return error;
  }
}
export const getVoucherById = async (id) => {
  try {
    let data = await axios.get(`/api/voucher/${id}`);
    return data;
  } catch (error) {
    return error;
  }
};
export const createVoucher = async (voucher) => {
  try {
    console.log(voucher);
    let data = await axios.post(`/api/voucher/`, { ...voucher });
    console.log(data);
    return data.status === "200";
  } catch (error) {
    console.log(error.message);
    return false;
  }
};
