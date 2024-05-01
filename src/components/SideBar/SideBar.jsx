import React, { useEffect, useState } from "react";
import styles from "./SideBar.module.css";
import Img from "../../icons/azerbaijan-flag.jpg";
import SubjectsBlackIcon from "../../icons/tab-icons/subject_black.svg";
import SubjectsWhiteIcon from "../../icons/tab-icons/subject_white.svg";
import UsersBlackIcon from "../../icons/tab-icons/users_black.svg";
import UsersWhiteIcon from "../../icons/tab-icons/users_white.svg";
import HouseWhiteIcon from "../../icons/tab-icons/housewhite.svg";
import HouseBlackIcon from "../../icons/tab-icons/houseblack.svg";
import SettingsBlackIcon from "../../icons/tab-icons/settingsblack.svg";
import SettingsWhiteIcon from "../../icons/tab-icons/settingswhite.svg";
import SignOutBlackIcon from "../../icons/signout_black.svg";
import SignOutWhiteIcon from "../../icons/signout_white.svg";
import InstitutionBlackIcon from "../../icons/tab-icons/institution_black1.png";
import QuestionPoolWhite from "../../icons/tab-icons/questionpoolswhite.svg";
import QuestionPoolBlack from "../../icons/tab-icons/questionpoolsblack.svg";
import ArrowDownBlack from '../../icons/tab-icons/arrow_down_black.svg';
import ArrowDownWhite from '../../icons/tab-icons/arrow_down_white.svg';
import TestIconBlack from '../../icons/tab-icons/testsicon.svg';
import TestsIconWhite from '../../icons/tab-icons/testiconwhite.svg';
import { NavLink, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";


export default function Sidebar() {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  const location = useLocation();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user")).user;
  const userTypeId = user?.userTypeId;
  const username = user?.username;
  const mainEndpoint = userTypeId == 1 ? "Admin" : (userTypeId == 2 ? "InstitutionRepresentative" : (userTypeId == 5 ? "Instructor" : '' ));
  const navLinkStyle = {
    textDecoration: 'none', // Remove underline
    color: 'inherit', // Inherit the color from parent
    // Add more styles as needed
  };
const queryClient = useQueryClient();
  const handleLogOutBtn = () =>
  {
    queryClient.clear();
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/Login');
  }

  useEffect(() =>
  {
    console.log(location.pathname);
  })

  const [activeTab, setActiveTab] = useState(location.pathname);

  useEffect(() =>
  {
    setActiveTab(location.pathname);
  }, [location.pathname])

  const handleTabClick = (tabName) => {
    console.log(location.pathname)
    console.log(activeTab.includes("/Instructor/QuestionPools"))
    setActiveTab(tabName);
  };

  return (
    <div className={styles.admin}>

      <div className={styles.sidebar}>
        <div className={styles.user_info}>
          <img src={Img} alt="aze-flag" width={39} height={39} />
          <NavLink
            to={`/${mainEndpoint}/Profile`}
            onClick={() => handleTabClick(`/${mainEndpoint}/Profile`)}
            style={navLinkStyle}
          >
            <span className={styles.username_link}>{username}</span>
          </NavLink>
        </div>

        <div className={styles.tabs}>

        {(user && userTypeId === 1) && (
          <>
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
            to="/Admin/Institutions"
            className={`${styles.tab} ${activeTab === "/Admin/Institutions" ? styles.active : ""}`}
            onClick={() => handleTabClick("/Admin/Institutions")}
          >
            <img
              className={styles.icon}
              src={activeTab === "/Admin/Institutions" ? InstitutionBlackIcon : InstitutionBlackIcon}
              alt="Institutions"
              width={24}
              height={24}
            />
            <span className={styles.name}>Institutions</span>
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

        </>
        )}

        {(user && userTypeId === 2) && (
          <>
            <NavLink
            to="/InstitutionRepresentative/Instructors"
            className={`${styles.tab} ${(activeTab === "/InstitutionRepresentative/Instructors" || activeTab === "/InstitutionRepresentative") ? styles.active : ""}`}
            onClick={() => handleTabClick("/InstitutionRepresentative/Instructors")}
          >
            <img
              className={styles.icon}
              src={(activeTab === "/InstitutionRepresentative/Instructors" || activeTab === "/InstitutionRepresentative") ? UsersWhiteIcon : UsersBlackIcon}
              alt="Instructors"
              width={24}
              height={24}
            />
            <span className={styles.name}>Instructors</span>
          </NavLink>


          </>

        )}

        {(user && user.userTypeId === 5) && (
          <>

        <NavLink
            to="/Instructor/GeneratedTests"
            className={`${styles.tab} ${styles.question_pool_tab} ${(activeTab.includes("/Instructor/GeneratedTests") || activeTab === "/Instructor/" || activeTab === "/Instructor") ? styles.active : ""}`}
            onClick={() => handleTabClick("/Instructor/GeneratedTests")}
          >
              <img
                className={styles.icon}
                src={(activeTab.includes("/Instructor/GeneratedTests") || activeTab === "/Instructor/" || activeTab === "/Instructor") ? TestsIconWhite : TestIconBlack}
                alt="QuestionsPool"
                width={24}
                height={24}
              />
              <span className={styles.name}>Generated Tests</span>
              
          </NavLink>
        
        <NavLink
            to="/Instructor/Tests"
            className={`${styles.tab} ${styles.question_pool_tab} ${(activeTab.includes("/Instructor/Tests") || activeTab === "/Instructor/" || activeTab === "/Instructor") ? styles.active : ""}`}
            onClick={() => handleTabClick("/Instructor/Tests")}
          >
              <img
                className={styles.icon}
                src={(activeTab.includes("/Instructor/Tests") || activeTab === "/Instructor/" || activeTab === "/Instructor") ? TestsIconWhite : TestIconBlack}
                alt="QuestionsPool"
                width={24}
                height={24}
              />
              <span className={styles.name}>Tests</span>
              
          </NavLink>

          <NavLink
            to="/Instructor/Assessment"
            className={`${styles.tab} ${styles.question_pool_tab} ${(activeTab.includes("/Instructor/Assessment") || activeTab === "/Instructor/" || activeTab === "/Instructor") ? styles.active : ""}`}
            onClick={() => handleTabClick("/Instructor/Assessment")}
          >
              <img
                className={styles.icon}
                src={(activeTab.includes("/Instructor/Assessment") || activeTab === "/Instructor/" || activeTab === "/Instructor") ? TestsIconWhite : TestIconBlack}
                alt="QuestionsPool"
                width={24}
                height={24}
              />
              <span className={styles.name}>Assessment</span>
              
          </NavLink>
          
          <NavLink
            to="/Instructor/QuestionPools"
            className={`${styles.tab} ${styles.question_pool_tab} ${(activeTab.includes("/Instructor/QuestionPools") || activeTab === "/Instructor/" || activeTab === "/Instructor") ? styles.active : ""}`}
            onClick={() => handleTabClick("/Instructor/QuestionPools")}
          >
              <img
                className={styles.icon}
                src={(activeTab.includes("/Instructor/QuestionPools") || activeTab === "/Instructor/" || activeTab === "/Instructor") ? QuestionPoolWhite : QuestionPoolBlack}
                alt="QuestionsPool"
                width={24}
                height={24}
              />
              <span className={styles.name}>Question Pools</span>
              <img
                className={styles.arrow}
                src={(activeTab.includes("/Instructor/QuestionPools") || activeTab === "/Instructor/" || activeTab === "/Instructor") ?  ArrowDownWhite : ArrowDownBlack}
                alt="QuestionsPool"
                width={20}
                height={20}
              />
              
          </NavLink>

          <NavLink
            to="/Instructor/Subjects"
            className={`${styles.tab} ${activeTab === "/Instructor/Subjects" ? styles.active : ""}`}
            onClick={() => handleTabClick("/Instructor/Subjects")}
          >
              <img
                className={styles.icon}
                src={activeTab === "/Instructor/Subjects" ? SubjectsWhiteIcon : SubjectsBlackIcon}
                alt="Subjects"
                width={24}
                height={24}
              />
              <span className={styles.name}>Subjects</span>
          </NavLink>

          </>
          
        )}

        <div className={styles.signout} onClick={handleLogOutBtn} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <img src={isHovered ? SignOutWhiteIcon : SignOutBlackIcon} alt="signout" />
            <button className={styles.btn}>Sign Out</button>
        </div>

      </div>

    </div>
    </div>
  );
}
