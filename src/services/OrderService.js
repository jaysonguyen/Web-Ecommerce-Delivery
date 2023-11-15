import axios from "../config/axios";
import {
  URL_GET_CUSTOMER,
  URL_LOGIN_CUSTOMER,
  URL_USER,
} from "../utils/constraint";

export async function getOrderDetails(orderCode) {
  try {
    let data = await axios.get(`/api/order/${orderCode}`);
    return data;
  } catch (error) {
    return error;
  }
}
export const getOrderListByAction = async (actionCode, userID) => {
  try {
    let data = await axios.get(`/api/order/action/${actionCode}`, {
      headers: {
        Authorization: `Bearer ${userID}`,
      },
    });
    return data;
  } catch (error) {
    return error;
  }
};

export const getActions = async () => {
  try {
    let data = await axios.get(`/api/action`);
    return data;
  } catch (error) {
    return error;
  }
};
export const getCityDropdownList = async () => {
  try {
    let data = await axios.get(`/api/order/city`);
    return data;
  } catch (error) {
    return error;
  }
};

export const insertOrder = async (data) => {
  try {
    const checkData = await axios.post("/api/order", data);
    return checkData;
  } catch (error) {
    return error;
  }
};

export const setAction = async (orderCode, actionCode) => {
  try {
    const checkData = await axios.put(
      `/api/order/${orderCode}/action/${actionCode}`,
    );
    return checkData;
  } catch (error) {
    return error;
  }
};
//
// export const deleteOrder = async (id) => {
//   try {
//     let data = await axios.put(`/api/order/${id}`);
//     return data;
//   } catch (error) {
//     return error;
//   }
// };
//
// export const updateOrder = async (obj) => {
//   try {
//     const checkData = await axios.put(URL_USER, obj);
//     return checkData.status;
//   } catch (error) {
//     return error;
//   }
// };
