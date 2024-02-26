import React, { useState } from "react";
import styles from "./AdminGeneral.module.css";
import Switchon from '../../icons/buttons-icons/switchon.svg';
import Switchoff from '../../icons/buttons-icons/switchoff.svg';
import Aslan from '../images/aslan.jpg';
import DeleteBtn from '../../icons/buttons-icons/delete.svg'
import Plus from '../../icons/buttons-icons/plus.svg';
import AddInstRepModal from "./Modals/AddInstRepModel/AddInstRepModal";
import DeleteModal from "./Modals/DeleteModal/DeleteModal";
import DataTable from "../CustomDataTable/DataTable";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Pagination from "../Pagination/Pagination";
import { ToastContainer, toast } from "react-toastify";

const AdminGeneral = () =>
{
    const [listView, setListView] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null)
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5; // Set items per page as you need

    const onPageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Calculate the current items to display based on pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    const {isLoading, error, data, refetch} = useQuery({
        queryKey: ["users"],
        queryFn: async() => 
        {
            const response = await axios.get("http://localhost:8080/api/v1/auth/user")
            console.log(response)
            return response.data
        },
    })

    const users = data?.slice(indexOfFirstItem+1, indexOfLastItem+1);

    const disableListView = () =>
    {
        setListView(listView => !listView);
    }

    return (
    <div className={styles.general_main_content}>

        <div className={styles.heading}>
            <h1 className={styles.admin_panel_heading}>Admin Panel</h1>
        </div>

        <div className={styles.list_view_toggle}>

            <div>
                <span>List/View</span>
                <br />
                <div className={styles.switchClickDiv} onClick={() => disableListView()}>
                    <img src={listView ? Switchon : Switchoff} alt="" />
                </div>
            </div>
        </div>

        {listView == false ? (
            <div >
        <div className={styles.institution_representatives_container}>
            <div className={styles.institution_rep_heading}>
                <h2>Institution Representatives</h2>
            </div>

            <div className={styles.cards}>
                <div className={styles.create_card} onClick={() =>{ 
                        setOpenModal(true)
                    }}>
                        <div className={styles.plus_sign}><img src={Plus} alt="" /></div>
                        <div className={styles.add_label}>
                            <span>Add</span>
                            <br />
                            <span>Representative</span>
                        </div>
                </div>
                {users?.filter(user => user.userTypeId === 2).map((user, index) => (
                <div key={user.id} className={styles.info_card}>
                    <div onClick={() => {
                        setUserToDelete(user)
                        setOpenDeleteModal(true)
                        }} className={styles.delete}><img className={styles.delete_btn} src={DeleteBtn} alt="" /></div>
                    <div className={styles.person_image}>
                        <img src={Aslan} alt="Me" />
                    </div>
                    <div className={styles.person_fullname}>
                        <span className={styles.first_name}>{user.username}</span>
                        <br />
                        <span className={styles.last_name}>{index}</span>
                    </div>
                    <div className={styles.school_name}>
                        <span>ADA University</span>
                    </div>
                </div> 
                ))}
            </div>
            <Pagination
                totalItems={users?.length}
                itemsPerPage={itemsPerPage}
                onPageChange={onPageChange}
            />
        </div>

        <DeleteModal 
            open={openDeleteModal}
            user={userToDelete}
            onClose={() => setOpenDeleteModal(false)}/>

        <AddInstRepModal 
            open={openModal} 
            onClose={() => setOpenModal(false)} 
            refetch={refetch}
            />
            </div>
            )
            : (
                <DataTable checkBoxForAll={true}/>
                )
        }
    
    </div>
    )
}

export default AdminGeneral;