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

export const insertVoucher = async ({
  name,
  cost,
  status,
  quantity,
  period,
  used,
}) => {
  try {
    const checkData = await axios.post("/api/voucher", {
      name,
      cost,
      status,
      quantity,
      period,
      used,
    });
    return checkData.status;
  } catch (error) {
    return error;
  }
};

export const updateVoucher = async ({
  name,
  cost,
  status,
  quantity,
  period,
  used,
}) => {
  try {
    const checkData = await axios.put("/api/voucher", {
      name,
      cost,
      status,
      quantity,
      period,
      used,
    });
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
