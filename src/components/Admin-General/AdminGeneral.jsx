import React, { useState, useEffect } from "react";
import styles from "./AdminGeneral.module.css";
import Switchon from '../../icons/buttons-icons/switchon.svg';
import Switchoff from '../../icons/buttons-icons/switchoff.svg';
import Aslan from '../images/aslan.jpg';
import DeleteBtn from '../../icons/buttons-icons/delete.svg'
import Plus from '../../icons/buttons-icons/plus.svg';
import AddInstRepModal from "./Modals/AddInstRepModel/AddInstRepModal";
import DeleteModal from "./Modals/DeleteModal/DeleteModal";
import DataTable from "../CustomDataTable/DataTable";
import Pagination from "../Pagination/Pagination";
import { useUserContext } from "../../Context/UsersContext";
const AdminGeneral = () => {

    const [listView, setListView] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5; // Set items per page as you need
    const onPageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    const [rerender, setRerender] = useState(false);
    const {users, refetchUsers} = useUserContext();
    useEffect(() => {
        refetchUsers();
    }, [listView]); // Empty dependency array ensures this effect runs only once on component mount

    // Calculate the total number of items for pagination
    const totalItems = users ? users.length : 0; // 5

    // Calculate the range of items to display for the current page
    const indexOfLastItem = currentPage * (itemsPerPage); // 1 * 5 = 5
    const indexOfFirstItem = indexOfLastItem - itemsPerPage; // 5 - 5 = 0

    const toggleListView = () => {
        setListView((prevListView) => !prevListView);
    };

    return (
        <div className={styles.general_main_content}>
            <div className={styles.heading}>
                <h1 className={styles.admin_panel_heading}>Admin Panel</h1>
            </div>
            <div className={styles.list_view_toggle}>
                <div>
                    <span>List/View</span>
                    <br />
                    <div className={styles.switchClickDiv} onClick={toggleListView}>
                        <img src={listView ? Switchon : Switchoff} alt="" />
                    </div>
                </div>
            </div>
            {listView ? (
                <DataTable totalItems={totalItems} checkBoxForAll={true}/>
            ) : (
                <div>
                    <div className={styles.institution_representatives_container}>
                        <div className={styles.institution_rep_heading}>
                            <h2>Institution Representatives</h2>
                        </div>
                        <div className={styles.cards}>
                            <div className={styles.create_card} onClick={() => setOpenModal(true)}>
                                <div className={styles.plus_sign}><img src={Plus} alt="" /></div>
                                <div className={styles.add_label}>
                                    <span>Add</span>
                                    <br />
                                    <span>Representative</span>
                                </div>
                            </div>
                            {users?.filter(us => us.userTypeId == 2).slice(indexOfFirstItem, indexOfLastItem).map((user) => (
                                <div key={user.id} className={styles.info_card}>
                                    <div className={styles.delete}>
                                        <img onClick={() => {
                                        setUserToDelete(user);
                                        setOpenDeleteModal(true);
                                    }}  className={styles.delete_btn} src={DeleteBtn} alt="" />
                                        </div>
                                    <div className={styles.person_image}>
                                        <img src={Aslan} alt="Me" />
                                    </div>
                                    <div className={styles.person_fullname}>
                                        <span className={styles.first_name}>{user.username}</span>
                                        <br />
                                        <span className={styles.last_name}>{user.id}</span>
                                    </div>
                                    <div className={styles.school_name}>
                                        <span>{user.institution.institutionName}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <Pagination
                            totalItems={totalItems}
                            itemsPerPage={itemsPerPage}
                            onPageChange={onPageChange}
                        />
                    </div>
                    <DeleteModal 
                        open={openDeleteModal}
                        user={userToDelete}
                        onClose={() => setOpenDeleteModal(false)}
                    />
                    <AddInstRepModal 
                        open={openModal} 
                        onClose={() => setOpenModal(false)} 
                    />
                </div>
            )}
        </div>
    );
};

export default AdminGeneral;
