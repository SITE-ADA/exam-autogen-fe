import React from "react";
import styles from './Tests.module.css';
import { useState } from "react";
import SearchIcon from '../../../icons/icon_search.svg';
import CreateEditTest from "./CreateEditTest/CreateEditTest";
import { TestsDataTable } from "./TestsDataTable/TestsDataTable";
import { useTestsContext } from "../../../Context/TestsContext";
import { useMySubjectsContext } from "../../../Context/MySubjectsContext";

export const Tests = () => {
    const [searchValue, setSearchValue] = useState("");
    const [mode, setMode] = useState(0);
    const [openModal, setOpenModal] = useState(false);
    const [testId, setTestId] = useState(0);
    const {tests, refetchTests} = useTestsContext();
    const {mySubjects} = useMySubjectsContext();
    return (
        <div>
            <h1>Tests</h1>

            <div className={styles.quantities_info}>
                <div className={styles.count_info}>
                    <h1 className="count"><span>{tests.length}</span></h1>
                    <br />
                    <p>Tests</p>
                </div>
                <div className={styles.count_info}>
                    <h1 className="count"><span>{mySubjects.length}</span></h1>
                    <br />
                    <p>Subjects</p>
                </div>
                <div className={styles.count_info}>
                    <h1 className="count"><span>0</span></h1>
                    <br />
                    <p>Total Questions</p>
                </div>
            </div>

            <div className={styles.question_pools_header}>
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
                <button onClick={() =>{
                     setOpenModal(true);
                     setMode(0);
                     setTestId(0); 
                    }} className={styles.add_instructor_btn}>
                        <span>Create Test</span>
                </button>
            </div>

            <TestsDataTable />

            <CreateEditTest 
                open={openModal} 
                mode={mode}
                id={testId}
                onClose={() => setOpenModal(false)} />
        </div>
    );
}