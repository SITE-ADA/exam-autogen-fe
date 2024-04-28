import React from "react";
import styles from './DeleteInstructorModal.module.css';
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useUserContext } from "../../../Context/UsersContext";
import { deleteUser } from "../../../Services/ms_auth/UserService";
import { useInstructorsContext } from "../../../Context/InstructorsContext";

const DeleteInstructorModal = ({open, instructor, onClose}) => {

    const [visible, setVisible] = useState(false); 
    const username = instructor?.username;
    const userId = instructor?.instructorID;
    console.log(userId);
    const {refetchInstructors} = useInstructorsContext();

    const handleDeleteUser = async() =>
    {
        try {
            const code = await deleteUser(userId);
            console.log(code.status)
            if(code.status === 204)
            {
                success();

                setTimeout(() =>
            {
                refetchInstructors();
                onClose();
            }, 1300);
            }
        } catch(error){
            errorT();
            setTimeout(() =>
            {
                onClose();
            }, 1300);

        }

    }

    const stopPropagation = (e) =>
    {
        e.stopPropagation();
    }

    const success = () => {
        toast.success('User has successfully been deleted!', {
            position: "top-right",
            autoClose: 2500,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light"
        });
    }

    const errorT = () => {
        toast.error('Error occured during deletion', {
            position: "top-right",
            autoClose: 2500,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light"
        });
    }

    if(!open)
    return null;

    return (
        <div onClick={onClose} className={visible ? 'overlay' : 'overlay hidden'}>
            <div className={styles.modalContainer} onClick={stopPropagation}>
                <div className={styles.modalRight}>
                    <div className={styles.delete_inst_rep_hg}>
                        <span>Are you sure to delete the user <span className={styles.red_text}>{username}</span> ?</span>
                    </div>
                    
                    <div className={styles.btn_container}>
            
                        <button onClick={() => handleDeleteUser()} className={styles.add_btn}>
                            <span>Confirm</span>
                        </button>
                        <button onClick={onClose} className={styles.cancel_btn}>
                            <span>Cancel</span>
                        </button>
                       
                    </div>
                </div>

            </div>
            <ToastContainer
                position="top-right"
                autoClose={2500}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </div>
    );
}


export default DeleteInstructorModal;