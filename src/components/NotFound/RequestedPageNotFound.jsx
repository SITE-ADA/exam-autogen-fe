import React, { useState } from "react";
import styles from './RequestedPageNotFound.module.css';
import { NavLink } from "react-router-dom";

const RequestedPageNotFound = () =>
{
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user"))?.user);

    const role = user?.userTypeId;

    
    return (
        <div className={styles.not_authorized_container}>
            <span className={styles.denied}><strong>The requested page not found</strong></span>
            <hr className={styles.hor_line} />
            <h3>Ensure the request endpoint is correct</h3>
            <div className={styles.back_to_login_btn}>
            {(role === 1) ? (
            <NavLink className={styles.link} to={"/Admin"}>Back to dashboard</NavLink>) :
            (role === 2) ? (
            <NavLink className={styles.link} to={"/InstitutionRepresentative"}>Back to dashboard</NavLink>):
            (role === 5) ? (
                <NavLink className={styles.link} to={"/Instructor"}>Back to dashboard</NavLink>)
            :
            (<NavLink className={styles.link} to={"/Login"}>Back to login</NavLink> )}
            </div>
        </div>
    )

}

export default RequestedPageNotFound;