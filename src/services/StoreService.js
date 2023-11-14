import axios from "../config/axios";

export async function getStoreList() {
  try {
    let data = await axios.get("/api/store");
    return data;
  } catch (error) {
    return error;
  }
}
export const getStoreById = async (id) => {
  try {
    let data = await axios.get(`/api/store/${id}`);
    return data;
  } catch (error) {
    return error;
  }
};

export const insertStore = async (data) => {
  try {
    const checkData = await axios.post("/api/store", data);
    return checkData.status;
  } catch (error) {
    return error;
  }
};

export const updateStore = async (data) => {
  try {
    const checkData = await axios.put("/api/store", data);
    return checkData.status;
  } catch (error) {
    return error;
  }
};
export const deleteStore = async (id) => {
  try {
    let data = await axios.put(`/api/store/${id}`);
    return data;
  } catch (error) {
    return error;
  }
};
