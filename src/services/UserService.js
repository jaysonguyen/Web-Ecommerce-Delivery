import { ca } from "date-fns/locale";
import axios from "../config/axios";
import {
  URL_GET_CUSTOMER,
  URL_GET_ORDER_BY_SHIPPER_CODE,
  URL_GET_SHIPPER_BY_BRANCH,
  URL_LOGIN_CUSTOMER,
  URL_USER,
  USER_GET_SHIPPER_POINT_AMOUNT,
  URL_GET_ASSIGN_INFO,
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
export const getUserByCode = async (code) => {
  try {
    let data = await axios.get(`/api/user/${code}`);
    return data;
  } catch (error) {
    return error;
  }
};
export const getUserProfile = async (id) => {
  try {
    let data = await axios.get(`/api/user/profile`, {
      headers: {
        Authorization: `Bearer ${id}`,
        "Content-Type": "application/json",
      },
    });
    return data;
  } catch (error) {
    return error;
  }
};
export const getStoreByUser = async (userId) => {
  try {
    let data = await axios.get(`/api/user/${userId}/store`);
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

export const loginCustomer = async (data) => {
  try {
    const checkData = await axios.post(URL_LOGIN_CUSTOMER, data);
    return checkData;
  } catch (error) {
    return error;
  }
};

export const getShipperAssignmentByBranchId = async (data) => {
  try {
    const assignList = await axios.get(URL_GET_ASSIGN_INFO + `/${data}`);
    return assignList;
  } catch (error) {
    console.log(error);
  }
};

export const getShipperListByBranchId = async (branchCode) => {
  try {
    const shipperList = await axios.get(
      "/api/user/shipper/branch" + `/${branchCode}`,
    );
    return shipperList;
  } catch (error) {
    console.log(error);
  }
};

export const getOrderListByShipperCode = async (shipperCode) => {
  try {
    const getListOrder = await axios.get(
      URL_GET_ORDER_BY_SHIPPER_CODE + `/${shipperCode}`,
    );
    return getListOrder;
  } catch (error) {
    console.log(error);
  }
};

export const setAssignShipment = async (area_code, branch_code, user_code) => {
  try {
    const setListOrder = await axios.post(
      `/api/user/shipper/assignment/${area_code}/${branch_code}/${user_code}`,
    );
    return setListOrder;
  } catch (error) {
    console.log(error);
  }
};

export const getShipperPointAmount = async(shipperID) => {
  try {
    const getShipperPointAndAmount = await axios.get(USER_GET_SHIPPER_POINT_AMOUNT + `/${shipperID}`)
    return getShipperPointAndAmount;
  } catch(error) {
    console.log(error);
  }
}