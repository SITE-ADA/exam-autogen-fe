import React, { useState } from "react";
import styles from './GeneratedTests.module.css';
import SearchIcon from '../../../icons/icon_search.svg';
import LibraryBook from '../../../icons/buttons-icons/library-books.svg';
import { GeneratedTestsDataTable } from "./GeneratedTestsDataTable/GeneratedTestsDataTable";
import { CreateEditGenerateTestModal } from "./GeneratedTest/CreateEditGeneratedTestModal/CreateEditGenerateTestModal";

export const GeneratedTests = () => {

    const [searchValue, setSearchValue] = useState();
    const generatedTestsLength = 1;
    const [openGTestCreateEditModal, setOpenGTestCreateEditModal] = useState(false);
    const [mode, setMode] = useState(0);
    
    return (
        <div>
            <h1>Generated Tests</h1>

            <div className={styles.quantities_info}>
                <div className={styles.count_info}>
                    <h1 className="count"><span>0</span></h1>
                    <br />
                    <p>Generated Tests</p>
                </div>
                <div className={styles.count_info}>
                    <h1 className="count"><span>0</span></h1>
                    <br />
                    <p>Number of Total Examinees</p>
                </div>
                <div className={styles.count_info}>
                    <h1 className="count"><span>0</span></h1>
                    <br />
                    <p>Number of Total Variants</p>
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
                    
                </div>
            </div>

            {generatedTestsLength > 0 ? (
                <>
            <GeneratedTestsDataTable />
            <div className={styles.assessment_info_another}>
                    <div className={styles.icon_horizontal}>
                        <div className={styles.left_line}></div>
                        <span onClick={() => setOpenGTestCreateEditModal(true)} className={styles.test_create_icon}><img src={LibraryBook} alt="" /></span>
                        <div className={styles.right_line}></div>
                    </div>
            </div> </>
        ) : (
            <div className={styles.assessment_info}>
                    <h3>Create your first official test</h3>
                    <div className={styles.icon_horizontal}>
                        <div className={styles.left_line}></div>
                        <span onClick={() => setOpenGTestCreateEditModal(true)} className={styles.test_create_icon}><img src={LibraryBook} alt="" /></span>
                        <div className={styles.right_line}></div>
                    </div>
                    <p className={styles.icon_info}>Click the icon above to get started</p>
            </div> )}

            <CreateEditGenerateTestModal open={openGTestCreateEditModal} onClose={() => setOpenGTestCreateEditModal(false)} mode={0} id={0} />
        </div>
    );
}