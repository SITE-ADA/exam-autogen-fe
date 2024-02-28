import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { MyContext } from "../MyContext";
const RequireAuth = ({ allowedRole, children }) => {

   // const {user, setUser} = useContext(MyContext);
   const user = JSON.parse(localStorage.getItem("user"));
   const userTypeId = user?.user.userTypeId;

    if (userTypeId === allowedRole) {
      return <Outlet />;
    } else {
      // Redirect to login page if the user is not authenticated or does not have the required role
 
      return <Navigate to="/NotAuthorized" />;
    }
  };

export default RequireAuth;