import React, { useState } from "react";
import styles from './InstRepSubject.module.css';
import SearchIcon from '../../icons/icon_search.svg';
import UserIcon from '../../icons/usericon.svg';
import TripleDots from '../../icons/dots_1.svg';
import InstructorDataTable from "../InstRep-Instructors/InstructorsDataTable/InstructorsDataTable";
import { InstRepSubjectTable } from "./InstRepSubjectTable/InstRepSubjectTable";
import AddSubjectModal from "../Instructor/Instructor-Subjects/AddSubjectModal/AddSubjectModal";
import { useMySubjectsContext } from "../../Context/MySubjectsContext";
const InstRepSubject = () => {

    const [searchValue, setSearchValue] = useState("");
    const [openModal, setOpenModal] = useState(false);
    const {mySubjects} = useMySubjectsContext();
    return (
        <div className={styles.subjects_page}>
            <div className={styles.subject_header}>
                <div className={styles.subject_count}>
                    <h1 className={styles.count}>{mySubjects.length}</h1>
                    <span>Subjects</span>
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
                <button onClick={() => setOpenModal(true)} className={styles.add_subject_btn}>
                        <img className="user_icon" alt="" />
                        <span>Add Subject</span>
                </button>

                <span className={styles.triple_dots}><img className={styles.triple_dots_icon} src={TripleDots} alt="TripleDots" /></span>
            </div>
            <main>
                <div className="subjects_container">
                    <InstRepSubjectTable />
                </div>
            </main>
            <AddSubjectModal open={openModal} onClose={() => setOpenModal(false)} />
            
        </div>
    )
}

export default InstRepSubject;