import React, { useContext, useEffect } from "react";
// import { AuthContext, useAuth } from "../../Context/AuthProvider";
import useAuth from "../../Hooks/useAuth";
import { Outlet, Route } from "react-router-dom";
import Admin from "../Admin/Admin";
const PrivateRoute = ({ Component, userType}) => {

    const user = localStorage.getItem('user');

    useEffect(() =>
    {
        console.log("HEYY");
        console.log(user);
        console.log(userType)
    }, [])

    // auth.user && auth.userTypeId === userType
    return user && user.userTypeId === userType ? (
      //
      <Admin />
    ) : (
      <p>Nope</p>
    );
};

export default PrivateRoute;