import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../../Hooks/useAuth.js";
import { Route } from "react-router-dom";
import Admin from "../Admin/Admin.jsx";

const RequireAuth = ({ allowedRole }) => {
    const { auth } = useAuth();
    const location = useLocation();

    return (
        auth?.userTypeId === allowedRole
            ? <Route path="/Admin" element={<Admin />} />
            : auth?.user
                ? <Navigate to="/unauthorized" state={{ from: location }} replace />
                : <Navigate to="/Login" state={{ from: location }} replace />
    );
}

export default RequireAuth;