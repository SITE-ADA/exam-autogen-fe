import React, { useEffect } from "react";
import styles from './InstructorSubjects.module.css';
import SearchIcon from '../../../icons/icon_search.svg';
import TripleDots from '../../../icons/dots_1.svg';
import { useState } from "react";
import { SubjectsTable } from "./SubjectsTable/SubjectsTable";
import AddSubjectModal from "./AddSubjectModal/AddSubjectModal";
import { useMySubjectsContext } from "../../../Context/MySubjectsContext";
const InstructorSubjects = () =>
{

    const [searchValue, setSearchValue] = useState("");
    const [openModal, setOpenModal] = useState(false);
    const {mySubjects, refetch} = useMySubjectsContext();
    useEffect(() =>
    {

    }, []);

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
                <div className={styles.subjects_container}>
                    <SubjectsTable />
                </div>
            </main>
            <AddSubjectModal
                        open={openModal} 
                        onClose={() => setOpenModal(false)} 
                        />
        </div>
    );
}

export default InstructorSubjects;