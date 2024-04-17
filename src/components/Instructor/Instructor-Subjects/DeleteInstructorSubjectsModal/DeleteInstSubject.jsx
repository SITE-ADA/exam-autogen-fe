import React, {useEffect} from "react";
import styles from './DeleteInstSubject.module.css';
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { deleteSubject } from "../../../../Services/ms_auth/SubjectService";
import { useMySubjectsContext } from "../../../../Context/MySubjectsContext";

const DeleteInstSubject = ({open, subject, onClose}) => {

    const [visible, setVisible] = useState(false); 
    const {refetchMySubjects} = useMySubjectsContext();
    const handleDeleteSubject = async() =>
    {
        try {
            const code = await deleteSubject(subject.id);
            console.log(code.status)
            if(code.status === 204)
            {
                success();
                setTimeout(() =>
            {
                refetchMySubjects();
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

    const stopPropagation = (e) => e.stopPropagation();

    const success = () => {
        toast.success('Subject has successfully been deleted!', {
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
                        <span>Are you sure to delete the subject <span className={styles.red_text}>{subject.name}</span> ?</span>
                    </div>
                    
                    <div className={styles.btn_container}>
            
                        <button onClick={() => handleDeleteSubject()} className={styles.add_btn}>
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

export default DeleteInstSubject;