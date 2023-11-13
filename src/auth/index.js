//check if user is authenticated
export const isAuthenticated = () => {
  if (typeof window == "undefined") {
    return null;
  }
  if (sessionStorage.getItem("user_payload")) {
    return JSON.parse(sessionStorage.getItem("user_payload"));
  } else {
    return null;
  }
};
