import axios from "../config/axios";

export async function getBankList() {
  try {
    let data = await axios.get("/api/bank");
    return data;
  } catch (error) {
    return error;
  }
}
