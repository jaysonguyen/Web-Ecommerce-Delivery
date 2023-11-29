import axios from "../config/axios";
import {
  URL_GET_CUSTOMER,
  URL_LOGIN_CUSTOMER,
  URL_USER,
} from "../utils/constraint";
import { string } from "prop-types";

export async function getOrderDetails(orderCode) {
  try {
    let data = await axios.get(`/api/order/${orderCode}`);
    return data;
  } catch (error) {
    return error;
  }
}
export const getOrderListByAction = async (actionCode, userID, dateRange) => {
  console.log(dateRange);
  try {
    let data = await axios.post(`/api/order/action/${actionCode}`, dateRange, {
      headers: {
        Authorization: `Bearer ${userID}`,
        "Content-Type": "application/json",
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
export const getHistoryOrderList = async (orderId) => {
  try {
    let data = await axios.get(`/api/history_order?orderId=${orderId}`);
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

export const setAction = async (orderId, actionCode, userID) => {
  try {
    let note = "";
    switch (actionCode) {
      case "1": {
        note = "Order have been sent!";
        break;
      }
      case "2": {
        note = "Order have been accepted!";
        break;
      }
      case "3": {
        note = "Order have been delivering!";
        break;
      }
      case "4": {
        note = "Order are waiting for return!";
        break;
      }
      case "5": {
        note = "Order have been returning!";
        break;
      }
      case "6": {
        note = "Order have been finished!";
        break;
      }
      default:
        break;
    }

    const checkData = await axios.put(
      `/api/order/${orderId}/action/${actionCode}`,
      { note: note },
      {
        headers: {
          Authorization: `Bearer ${userID}`,
          "Content-Type": "application/json",
        },
      },
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
