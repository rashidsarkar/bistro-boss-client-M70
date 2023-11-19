import { Navigate, useLocation } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";
import useAuth from "../hooks/useAuth";

function AdminRoute({ children }) {
  const { user, loading } = useAuth();
  const { isAdminLoading, isAdmin } = useAdmin();
  const location = useLocation();

  if (loading || isAdminLoading) {
    return <progress className="w-56 progress"></progress>;
  }

  if (user && isAdmin) {
    return children;
  }
  return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
}

export default AdminRoute;
