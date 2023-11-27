import axios from "../config/axios";
import { URL_GET_SHIPPER_BY_BRANCH } from "../utils/constraint";

export async function getBranchList() {
  try {
    const data = await axios.get("/api/branch");
    return data;
  } catch (error) {
    return error;
  }
}

export const createBranch = async (branch) => {
  try {
    const data = await axios.post("/api/branch", branch);
    return data.status;
  } catch (error) {
    return error;
  }
};

export const updateBranch = async (branchInfo) => {
  try {
    const data = await axios.put("/api/branch", branchInfo);
    return data.status;
  } catch (error) {
    return error;
  }
};

export const getUserByBranchCode = async (branchCode) => {
  try {
    const data = await axios.get(`${URL_GET_SHIPPER_BY_BRANCH}/${branchCode}`);
    return data.data;
  } catch (error) {
    return error;
  }
};


export const deleteBranch = async (id) => {
  try {
    let data = await axios.put(`/api/branch/${id}`);
    return data;
  } catch (error) {
    return error;
  }
};