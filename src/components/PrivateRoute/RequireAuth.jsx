import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { MyContext } from "../MyContext";
const RequireAuth = ({ allowedRole, children }) => {
    // Logic to check if the user is authenticated and has the required role
    // For demonstration, I'm assuming you have a function to get the user type ID
   // You need to implement this function
   // const {user, setUser} = useContext(MyContext);
   const user = JSON.parse(localStorage.getItem("user"));
   const userTypeId = user?.user.userTypeId;

    if (userTypeId === 1) {
      return <Outlet />;
    } else {
      // Redirect to login page if the user is not authenticated or does not have the required role
      return <Navigate to="/Login" />;
    }
  };

export default RequireAuth;