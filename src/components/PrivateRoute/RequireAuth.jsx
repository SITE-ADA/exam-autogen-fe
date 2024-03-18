import React from "react";
import { Navigate, Outlet } from "react-router-dom";
const RequireAuth = ({ allowedRole }) => {

   const user = JSON.parse(localStorage.getItem("user"));
   const userTypeId = user?.user.userTypeId;

    if (userTypeId === allowedRole) {
      return <Outlet />;
    } else {
      return <Navigate to="/NotAuthorized" />;
    }
  };

export default RequireAuth;