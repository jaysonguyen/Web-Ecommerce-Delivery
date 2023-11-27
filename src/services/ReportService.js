import axios from "../config/axios";

export async function getOrderReport(data2) {
  try {
    let data = await axios.post("/api/report/order", data2);
    return data;
  } catch (error) {
    return error;
  }
}
