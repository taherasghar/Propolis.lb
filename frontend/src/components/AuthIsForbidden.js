import { useLocation, Navigate, Outlet } from "react-router-dom";
import useUser from "../hooks/useUser";
import isTokenExpired from "../helpers/isTokenExpired";

const AuthIsForbidden = () => {
  const user = useUser();
  const location = useLocation();

  return user === null && isTokenExpired() ? (
    <Outlet />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};

export default AuthIsForbidden;
