import React from "react";
import styles from "./Admin.module.css";
import SideBar from "../SideBar/SideBar";
import { Outlet} from "react-router-dom";

const Admin = () =>
{
    return (
        <div className={styles.admin_layout}>
            <SideBar />
            <div className={styles.main_content}>
                <Outlet />
            </div>
        </div>
    )
}

export default Admin;