import axios from "../config/axios";

export async function getBranchList() {
  try {
    let data = await axios.get("/api/branch");
    return data;
  } catch (error) {
    return error;
  }
}

export const createBranch = async({branch_id,name,address,des}) =>{
    try {
      let data = await axios.post("/api/branch",{
          branch_id,
          name,
          address,
          des,
      });
      return data;
    } catch (error) {
      return error;
    }

};
