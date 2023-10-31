import { AxiosResponse, AxiosError } from "axios";
import axios from "../config/axios";
import { URL_USER } from "../utils/constraint";

export async function getUserList() {
  try {
    let data = await axios.get("/api/user");
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

export const insertUser = async (
  nameStaff,
  account,
  email,
  role,
  phoneNum,
  des
) => {
  try {
    const checkData = await axios.post(URL_USER, {
      fullName: nameStaff,
      des: des,
      account: account,
      email: email,
      phone: phoneNum,
      role: role,
    });
    return checkData.status;
  } catch (error) {
    return error;
  }
};

export const updateUSer = async (account) => {
  try {
    const checkData = await axios.delete(URL_USER + `/${account}`);
    return checkData.status;
  } catch (error) {
    return error;
  }
};


