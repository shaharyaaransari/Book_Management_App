import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/ContextApi";

const PrivateRoute = ({ children, allowedRoles }) => {
  const { isAuth } = useContext(AuthContext);
  const role = localStorage.getItem("role");

  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PrivateRoute;
