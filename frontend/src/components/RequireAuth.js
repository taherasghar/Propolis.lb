import { useLocation, Navigate, Outlet } from "react-router-dom";
import useUser from "../hooks/useUser";
import Error from "../pages/Error/Error";

const RequireAuth = ({ allowedRoles }) => {
  const user = useUser();
  const location = useLocation();

  return allowedRoles?.includes(user?.role) ? (
    <Outlet />
  ) : user !== null || location.pathname.includes("dashboard") ? (
    <Error />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
