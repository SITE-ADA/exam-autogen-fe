import React from "react";
import styles from '../Admin/Layout.module.css';
import SideBar from "../SideBar/SideBar";
import { Outlet} from "react-router-dom";

const Instructor = () =>
{
    return (
        <div className={styles.layout}>
            <SideBar className={styles.SideBar}/>
            <div className={styles.main_content}>
                <Outlet />
            </div>
        </div>
    );
    
}

export default Instructor;