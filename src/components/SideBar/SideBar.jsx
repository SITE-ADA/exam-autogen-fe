import React, { useEffect, useState } from "react";
import styles from "./SideBar.module.css";
import Img from "../../icons/azerbaijan-flag.jpg";
import HouseWhiteIcon from "../../icons/tab-icons/housewhite.svg";
import SettingsWhiteIcon from "../../icons/tab-icons/settingswhite.svg";
import HouseBlackIcon from "../../icons/tab-icons/houseblack.svg";
import SettingsBlackIcon from "../../icons/tab-icons/settingsblack.svg";
import SignOutIcon from "../../icons/signout.svg";
import { NavLink, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Sidebar() {

  const location = useLocation();
  const navigate = useNavigate();

  const handleLogOutBtn = () =>
  {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/Login');
  }

  useEffect(() =>
  {
    console.log(location.pathname);
  })

  const [activeTab, setActiveTab] = useState(location.pathname);

  const handleTabClick = (tabName) => {
    console.log(location.pathname)
    setActiveTab(tabName);
  };

  return (
    <div className={styles.admin}>

      <div className={styles.sidebar}>

        <div className={styles.user_info}>
          <img src={Img} alt="aze-flag" width={39} height={39} />
          <span className={styles.admin_name}>Admin</span>
        </div>

        <div className={styles.tabs}>

          <NavLink
            to="/Admin/General"
            className={`${styles.tab} ${(activeTab === "/Admin/General" || activeTab === "/Admin") ? styles.active : ""}`}
            onClick={() => handleTabClick("/Admin/General")}
          >
            <img
              className={styles.icon}
              src={(activeTab === "/Admin/General" || activeTab === "/Admin") ? HouseWhiteIcon : HouseBlackIcon}
              alt="General"
              width={24}
              height={24}
            />
            <span className={styles.name}>General</span>
          </NavLink>

          <NavLink
            to="/Admin/Settings"
            className={`${styles.tab} ${activeTab === "/Admin/Settings" ? styles.active : ""}`}
            onClick={() => handleTabClick("/Admin/Settings")}
          >
            <img
              className={styles.icon}
              src={activeTab === "/Admin/Settings" ? SettingsWhiteIcon : SettingsBlackIcon}
              alt="Settings"
              width={24}
              height={24}
            />
            <span className={styles.name}>Settings</span>
          </NavLink>
        </div>

        <div className={styles.signout} onClick={handleLogOutBtn}>
            <img src={SignOutIcon} alt="signout" />
            <button className={styles.btn}>Sign Out</button>
        </div>

      </div>

    </div>
  );
}
