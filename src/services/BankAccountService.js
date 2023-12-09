import axios from "../config/axios";

export async function getBankAccountListByUser(userId) {
  try {
    let data = await axios.get(`/api/customer_bank?customerId=${userId}`);
    return data;
  } catch (error) {
    return error;
  }
}
export const getBankAccountById = async (id) => {
  try {
    let data = await axios.get(`/api/customer_bank/${id}`);
    return data;
  } catch (error) {
    return error;
  }
};

export const insertBankAccount = async (data) => {
  try {
    const checkData = await axios.post("/api/customer_bank", data);
    return checkData.status;
  } catch (error) {
    return error;
  }
};

// export const updateBankAccount = async (data) => {
//   try {
//     const checkData = await axios.put("/api/customer_bank", data);
//     return checkData.status;
//   } catch (error) {
//     return error;
//   }
// };
// export const deleteBankAccount = async (id) => {
//   try {
//     let data = await axios.put(`/api/customer_bank/${id}`);
//     return data;
//   } catch (error) {
//     return error;
//   }
// };
