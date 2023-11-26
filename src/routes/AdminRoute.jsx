import PropTypes from "prop-types";
import useAuth from "../hooks/useAuth";
import { Navigate, useLocation } from "react-router-dom";
import useUserRole from "../api/useUserRole";
import LoadingSpinner from "../components/Shared/LoadingSpinner";

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const [userRole, isUserRoleLoading] = useUserRole();

  const location = useLocation();

  if (loading || isUserRoleLoading) {
    return <LoadingSpinner />;
  }

  if (user && userRole.userRole === "Admin") {
    return children;
  }
  return <Navigate to="/" state={{ from: location }} replace></Navigate>;
};

AdminRoute.propTypes = {
  children: PropTypes.node,
};

export default AdminRoute;
