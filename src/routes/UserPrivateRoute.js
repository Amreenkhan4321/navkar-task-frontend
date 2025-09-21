import DataService from "../config/DataService";
import { Navigate, Outlet } from "react-router-dom";

const UserPrivateRoute = () => {
  const token = localStorage.getItem("token");
  const accessToken = (token) => {
    if (!token) {
      return false;
    } else {
      DataService.defaults.headers.common["Authorization"] = token;
      return true;
    }
  };
  return accessToken(token) ? (
    <Outlet />
  ) : (
    <Navigate to="/" replace={true} />
  );
};

export default UserPrivateRoute;
