import { jwtDecode } from "jwt-decode";

const isTokenExpired = () => {
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) {
    return true;
  }

  try {
    const decodedToken = jwtDecode(accessToken);
    const currentTime = Date.now() / 1000;

    return (
      decodedToken.exp < currentTime && localStorage.removeItem("accessToken")
    );
  } catch (error) {
    return true;
  }
};

export default isTokenExpired;
