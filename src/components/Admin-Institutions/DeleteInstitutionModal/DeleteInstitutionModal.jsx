import React, {useEffect} from "react";
import styles from '../../Admin-General/Modals/DeleteModal/DeleteModal.module.css';
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { deleteInstitution } from "../../../Services/ms_auth/InstitutionService";
import { useInstitutionContext } from "../../../Context/InstitutionsContext";

const DeleteInstitutionModal = ({open, institution, onClose}) => {

    const [visible, setVisible] = useState(false); 
    const institutionName = institution?.institutionName;
    const id = institution?.id;
    const {refetchInstitutions} = useInstitutionContext();
    const handleDeleteInst = async() =>
    {
        try {
            const code = await deleteInstitution(id);
            console.log(code.status)
            if(code.status === 204)
            {
                success();
                setTimeout(() =>
            {
                refetchInstitutions();
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
        toast.success('Institution has successfully been deleted!', {
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
                        <span>Are you sure to delete the institution <span className={styles.red_text}>{institutionName}</span> ?</span>
                    </div>
                    
                    <div className={styles.btn_container}>
            
                        <button onClick={() => handleDeleteInst()} className={styles.add_btn}>
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

export default DeleteInstitutionModal;