import { AxiosResponse, AxiosError } from "axios";
import axios from "../config/axios";
import { URL_GET_CUSTOMER, URL_GET_SHIPPER } from "../utils/constraint";

export async function getUserList() {
  try {
    let data = await axios.get("/api/user");
    return data;
  } catch (error) {
    return error;
  }
}

export async function getCustomerList() {
  try {
    let data = await axios.get(URL_GET_CUSTOMER);
    return data;
  } catch (error) {
    return error;
  }
}
export const getUserById = async (id) => {
  try {
    let data = await axios.get(`/api/user/${id}`);
    return data;
  } catch (error) {
    return error;
  }
};
export const getStoreByUser = async (userId) => {
  try {
    let data = await axios.get(`/api/user/store/${userId}`);
    return data;
  } catch (error) {
    return error;
  }
};

export const insertUser = async ({ name, account, email, password, role }) => {
  try {
    const checkData = await axios.post("/api/user", {
      name,
      account,
      email,
      password,
      role,
    });
    return checkData.status;
  } catch (error) {
    return error;
  }
};

export const deleteUser = async ({ id }) => {
  try {
    let data = await axios.delete(`/api/user/${id}`);
    return data;
  } catch (error) {
    return error;
  }
};
