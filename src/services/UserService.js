import axios from "../config/axios";

export function getUserList() {
  return axios
    .get("/api/user")
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      return null;
    });
}
