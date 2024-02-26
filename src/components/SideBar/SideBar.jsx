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
import { useUser } from "../../Context/UserContext";
import { useContext } from "react";
export default function Sidebar() {

  const location = useLocation();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user")).user;
  const userTypeId = user?.userTypeId;
  const username = user?.username;
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
          <span className={styles.admin_name}>{username}</span>
        </div>

        <div className={styles.tabs}>

        {(user && userTypeId === 1) && (
          <div className="admin_tabs">
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
        )}

        {(user && userTypeId === 2) && (
          <div className="inst_rep_tabs">
            <NavLink
            to="/InstitutionRepresentative/Instructors"
            className={`${styles.tab} ${(activeTab === "/InstitutionRepresentative/Instructors" || activeTab === "/InstitutionRepresentative") ? styles.active : ""}`}
            onClick={() => handleTabClick("/InstitutionRepresentative/Instructors")}
          >
            <img
              className={styles.icon}
              src={(activeTab === "/InstitutionRepresentative/Instructors" || activeTab === "/InstitutionRepresentative") ? HouseWhiteIcon : HouseBlackIcon}
              alt="Instructors"
              width={24}
              height={24}
            />
            <span className={styles.name}>Instructors</span>
          </NavLink>

          <NavLink
            to="/InstitutionRepresentative/Subjects"
            className={`${styles.tab} ${activeTab === "/InstitutionRepresentative/Subjects" ? styles.active : ""}`}
            onClick={() => handleTabClick("/InstitutionRepresentative/Subjects")}
          >
            <img
              className={styles.icon}
              src={activeTab === "/InstitutionRepresentative/Subjects" ? SettingsWhiteIcon : SettingsBlackIcon}
              alt="Subjects"
              width={24}
              height={24}
            />
            <span className={styles.name}>Subjects</span>
          </NavLink>
          </div>

        )
        }
        <div className={styles.signout} onClick={handleLogOutBtn}>
            <img src={SignOutIcon} alt="signout" />
            <button className={styles.btn}>Sign Out</button>
        </div>

      </div>

    </div>
    </div>
  );
}
