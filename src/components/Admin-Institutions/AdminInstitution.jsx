import React, { useState, useEffect, useMemo } from "react";
import styles from "../Admin-Institutions/AdminInsitution.module.css";
import SearchIcon from '../../icons/icon_search.svg';
import TripleDots from '../../icons/dots_1.svg';
import AddInstitutionModal from "./AddInstitutionModal/AddInsitutionModal";
import AdminInstitutionDataTable from "./AdminInstitutionTable";
import { useInstitutionContext } from "../../Context/InstitutionsContext";
import CreateEditInstitutionModal from "./CreateEditInstitutionModal/CreateEditInstitutionModal";

const AdminInstitution = () => {
    const [openAddModal, setOpenAddModal] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const [mode, setMode] = useState(0);
    const {institutions, refetchInstitutions} = useInstitutionContext();

    // Memoize the totalItems value to avoid unnecessary recalculations
    const totalItems = institutions ? institutions?.length : 0;

    return (
        <div className={styles.admin_institution_page}>
            <div className={styles.institution_header}>
                <div className={styles.institution_count}>
                    <h1 className={styles.count}>{institutions.length}</h1>
                    <span>Institutions</span>
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
                <button className={styles.add_institution_btn} onClick={() => setOpenAddModal(true)}>
                    <img className="user_icon" alt="" />
                    <span>New Institution</span>
                </button>

                <span className={styles.triple_dots}><img className={styles.triple_dots_icon} src={TripleDots} alt="TripleDots" /></span>
            </div>
            <main>
                <div className={styles.institution_container}>
                    <AdminInstitutionDataTable  />
                </div>
            </main>
            <CreateEditInstitutionModal
                open={openAddModal}
                onClose={() => setOpenAddModal(false)}
                mode={0}
            />
        </div>
    )
}

export default AdminInstitution;
