import axios from "../config/axios";

export async function getBankList() {
  try {
    let data = await axios.get("/api/bank");
    return data;
  } catch (error) {
    return error;
  }
}
export async function getCustomerBankByUser(userId) {
  try {
    let data = await axios.get(`/api/customer_bank?customerId=${userId}`);
    return data;
  } catch (error) {
    return error;
  }
}
export async function addCustomerBank(data2) {
  try {
    let data = await axios.post(`/api/customer_bank`, data2);
    return data.status;
  } catch (error) {
    return error;
  }
}
