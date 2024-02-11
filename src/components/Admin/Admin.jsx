import React from "react";
import '../Admin/Admin.css';
import SideBar from "../SideBar/SideBar";
import { Outlet} from "react-router-dom";

const Admin = () =>
{
    return (
        <div className="admin-layout">
            <SideBar />
            <div className="main-content">
                <Outlet />
            </div>
        </div>
    )
}

export default Admin;