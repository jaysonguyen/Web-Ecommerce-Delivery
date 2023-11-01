import { AxiosResponse, AxiosError } from "axios";
import axios from "../config/axios";
import {
  URL_GET_CUSTOMER,
  URL_GET_SHIPPER,
  URL_USER,
} from "../utils/constraint";

export async function getAreaList(cityId) {
  try {
    let data = await axios.get("/api/area/" + cityId);
    return data;
  } catch (error) {
    return error;
  }
}
export const getAreaById = async (id) => {
  try {
    let data = await axios.get(`/api/area/${id}`);
    return data;
  } catch (error) {
    return error;
  }
};
export const insertArea = async (data) => {
  try {
    const checkData = await axios.post("/api/area", data);
    return checkData.status;
  } catch (error) {
    return error;
  }
};

export const deleteArea = async (id) => {
  try {
    let data = await axios.put(`/api/area/${id}`);
    return data;
  } catch (error) {
    return error;
  }
};

export const updateArea = async (obj) => {
  try {
    const checkData = await axios.put(URL_USER, obj);
    return checkData.status;
  } catch (error) {
    return error;
  }
};
