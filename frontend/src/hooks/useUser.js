import isTokenExpired from "../helpers/isTokenExpired";
import { jwtDecode } from "jwt-decode";

function useUser() {
  var decoded = null;
  const accessToken = localStorage.getItem("accessToken");
  if (!isTokenExpired()) {
    const decodedToken = jwtDecode(accessToken);
    decoded = {
      id: decodedToken.sub,
      username: decodedToken.nameid,
      firstName: decodedToken.name,
      lastName: decodedToken.family_name,
      email: decodedToken.email,
      role: decodedToken.role,
    };
  }
  return decoded;
}

export default useUser;
