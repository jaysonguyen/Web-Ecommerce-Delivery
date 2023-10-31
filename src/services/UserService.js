import axios from "../config/axios";

export async function getUserList() {
  try {
    let data = await axios.get("/api/user");
    return data;
  } catch (error) {
    return error;
  }
}
export const getUserById = async (id) => {
  try {
    let data = await axios.get(`/api/user/${id}`);
    return data;
  } catch (error) {
    return error;
  }
};

export const insertUser = async ({ name, account, email, role }) => {
  try {
    let data = await axios.post("/api/user", {
      name,
      account,
      email,
      role,
    });
    return data;
  } catch (error) {
    return error;
  }
};
