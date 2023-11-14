import { useState } from "react";

export default function useToken() {
  const getToken = () => {
    const tokenString = sessionStorage.getItem("token");
    // const userToken = JSON.parse(tokenString);
    // return userToken?.token;
    return tokenString;
  };

  const getUserPayload = () => {
    const user = JSON.parse(sessionStorage.getItem("user_payload"));
    // const userToken = JSON.parse(tokenString);
    // return userToken?.token;
    return user;
  };

  const [token, setToken] = useState(getToken());
  const [userPayload, setUserPayload] = useState(getUserPayload());

  const saveToken = (userToken) => {
    sessionStorage.setItem("token", userToken);
    setToken(userToken);
  };

  return {
    setToken: saveToken,
    token,
    userPayload,
  };
}
