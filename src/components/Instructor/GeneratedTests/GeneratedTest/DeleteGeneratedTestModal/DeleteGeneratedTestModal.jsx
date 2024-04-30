import React from "react";
import styles from './DeleteGeneratedTestModal.module.css';
import { ToastContainer, toast } from "react-toastify";
import { useState } from "react";
import { deleteGeneratedTest } from "../../../../../Services/ms_test/TestService";
import { useGeneratedTestsContext } from "../../../../../Context/GeneratedTestsContext";

export const DeleteGeneratedTestModal = ({open, gtest, onClose}) => {

    const [visible, setVisible] = useState(false); 
    const stopPropagation = (e) =>
    {
        e.stopPropagation();
    }
    
    console.log(gtest?.id);

    const {gtests, refetchGTests} = useGeneratedTestsContext();

    const handleDeleteGTest = async() => {
        try {
            const response = await deleteGeneratedTest(gtest.id);
            console.log(response);
            if(response.status === 200)
            {
                success();
                setTimeout(() =>
            {
                refetchGTests();
                onClose();
            }, 1300);
            }
        }catch(e)
        {
            errorT();
        }
    }

    const success = () => {
        toast.success('Generated test has been successfully deleted!', {
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
        toast.error('Error while deleting the generated test', {
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
                        <span>Are you sure to delete the generated test <span className={styles.red_text}>{gtest.name}</span> ?</span>
                    </div>
                    
                    <div className={styles.btn_container}>
            
                        <button onClick={() => handleDeleteGTest()} className={styles.add_btn}>
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