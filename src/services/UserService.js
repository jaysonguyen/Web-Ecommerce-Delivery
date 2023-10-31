import { AxiosResponse, AxiosError } from "axios";
import axios from "../config/axios";
import {
  URL_GET_CUSTOMER,
  URL_GET_SHIPPER,
  URL_USER,
} from "../utils/constraint";

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

export const insertUser = async (data) => {
  try {
    const checkData = await axios.post(URL_USER, data);
    return checkData.status;
  } catch (error) {
    return error;
  }
};

export const deleteUser = async (id) => {
  try {
    let data = await axios.put(`/api/user/${id}`);
    return data;
  } catch (error) {
    return error;
  }
};

export const updateUSer = async (obj) => {
  try {
    const checkData = await axios.put(URL_USER, obj);
    return checkData.status;
  } catch (error) {
    return error;
  }
};
