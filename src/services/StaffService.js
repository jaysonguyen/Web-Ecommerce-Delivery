import axios from "../config/axios";
import { URL_GET_SHIPPER, URL_GET_STAFF } from "../utils/constraint";

export async function getStaffList() {
  try {
    let data = await axios.get(URL_GET_STAFF);
    return data;
  } catch (error) {
    return error;
  }
}

export async function getShipperList() {
  try {
    let data = await axios.get(URL_GET_SHIPPER);
    return data;
  } catch (error) {
    return error;
  }
}
