import React, { useState } from "react";
import styles from './InstRepInstructor.module.css';
import SearchIcon from '../../icons/icon_search.svg';
import UserIcon from '../../icons/usericon.svg';
import TripleDots from '../../icons/dots_1.svg';
import InstructorDataTable from "./InstructorsDataTable/InstructorsDataTable";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-toastify/dist/ReactToastify.min.css';
import { useUserContext } from "../../Context/UsersContext";
import AddInstRepInstructorModal from "./AddInstRepInstructor/AddInstRepInstructorModal";
import { useInstructorsContext } from "../../Context/InstructorsContext";
const InstRepInstructor = () =>
{
    const [searchValue, setSearchValue] = useState("");
    const {users} = useUserContext();
    const [openModal, setOpenModal] = useState(false);
    const {instructors} = useInstructorsContext();
    return (

        <div className={styles.instructors_page}>
            <div className={styles.instructor_header}>
                <div className={styles.instructor_count}>
                    <h1 className={styles.count}>{instructors.length}</h1>
                    <span>Instructors</span>
                </div>

                <div className={styles.search_panel}>
                    <div className={styles.search} >
                        <img src={SearchIcon} alt="Search Icon" className="search_icon" />
                        <input placeholder="Search"
                                        className={styles.input}
                                        type="text"
                                        name='search'
                                        id='search'
                                        value={searchValue}
                                        onChange={(e) => setSearchValue(e.target.value)}
                                        required
                                        autoComplete="off"/>
                    </div>
                    <div className={styles.dropdown_list}>
                    <select>
                        <option value="">All</option>
                        <option value="option1">Option 1</option>
                        <option value="option2">Option 2</option>
                    </select>
                    </div>
                    
                </div>
                <button onClick={() => {setOpenModal(true)}}  className={styles.add_instructor_btn}>
                        <img className="user_icon" src={UserIcon} alt="" />
                        <span>Add Instructor</span>
                </button>

                <span className={styles.triple_dots}><img className={styles.triple_dots_icon} src={TripleDots} alt="TripleDots" /></span>
            </div>
            <main>
                <div className={styles.instructors_container}>
                    <InstructorDataTable />
                </div>
            </main>
            <AddInstRepInstructorModal
                open={openModal} 
                onClose={() => setOpenModal(false)} 
            />
        </div>
    )
}

export default InstRepInstructor;