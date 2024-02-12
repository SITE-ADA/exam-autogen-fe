import React, { useEffect, useState } from "react";
import "./SideBar.css";
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
    <div className="admin">

      <div className="sidebar">

        <div className="user-info">
          <img src={Img} alt="aze-flag" width={39} height={39} />
          <span className="admin-name">Admin</span>
        </div>

        <div className="tabs">

          <NavLink
            to="/Admin/General"
            className={`tab ${(activeTab === "/Admin/General" || activeTab === "/Admin") ? "active" : ""}`}
            onClick={() => handleTabClick("/Admin/General")}
          >
            <img
              className="icon"
              src={(activeTab === "/Admin/General" || activeTab === "/Admin") ? HouseWhiteIcon : HouseBlackIcon}
              alt="General"
              width={24}
              height={24}
            />
            <span className="name">General</span>
          </NavLink>

          <NavLink
            to="/Admin/Settings"
            className={`tab ${activeTab === "/Admin/Settings" ? "active" : ""}`}
            onClick={() => handleTabClick("/Admin/Settings")}
          >
            <img
              className="icon"
              src={activeTab === "/Admin/Settings" ? SettingsWhiteIcon : SettingsBlackIcon}
              alt="Settings"
              width={24}
              height={24}
            />
            <span className="name">Settings</span>
          </NavLink>
        </div>

        <div className="signout" onClick={handleLogOutBtn}>
            <img src={SignOutIcon} alt="signout" />
            <button className="btn">Sign Out</button>
        </div>

      </div>

    </div>
  );
}
