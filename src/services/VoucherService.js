import axios from "../config/axios";

export async function getVoucherList() {
  try {
    let data = await axios.get("/api/voucher");
    return data;
  } catch (error) {
    return error;
  }
}
export async function getVoucherHistoryListByVoucher(voucherId) {
  try {
    let data = await axios.get(
      `/api/history_voucher/voucher?voucherId=${voucherId}`,
    );
    return data;
  } catch (error) {
    return error;
  }
}
export async function getVoucherHistoryListByOrder(orderId) {
  try {
    let data = await axios.get(`/api/history_voucher/order?orderId=${orderId}`);
    return data;
  } catch (error) {
    return error;
  }
}
export async function getValidVoucherList() {
  try {
    let data = await axios.get("/api/voucher/valid");
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

export const insertVoucher = async (data) => {
  try {
    const checkData = await axios.post("/api/voucher", data);
    return checkData.status;
  } catch (error) {
    return error;
  }
};

export const updateVoucher = async (data) => {
  try {
    const checkData = await axios.put("/api/voucher", data);
    return checkData.status;
  } catch (error) {
    return error;
  }
};
export const deleteVoucher = async (id) => {
  try {
    let data = await axios.put(`/api/voucher/${id}`);
    return data;
  } catch (error) {
    return error;
  }
};
