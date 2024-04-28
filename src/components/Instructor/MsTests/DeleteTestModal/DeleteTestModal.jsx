import React from "react";
import styles from './DeleteTestModal.module.css';
import { useState } from "react";
import { ToastContainer } from "react-toastify";

export const DeleteTestModal = ({open, test, onClose}) =>
{
    const [visible, setVisible] = useState(false); 

    const stopPropagation = (e) =>
    {
        e.stopPropagation();
    }

    if(!open)
    return null;

    return (
        <div onClick={onClose} className={visible ? 'overlay' : 'overlay hidden'}>
            <div className={styles.modalContainer} onClick={stopPropagation}>
                <div className={styles.modalRight}>
                    <div className={styles.delete_inst_rep_hg}>
                        <span>Are you sure to delete the test <span className={styles.red_text}>{"Test Delete"}</span> ?</span>
                    </div>
                    
                    <div className={styles.btn_container}>
            
                        <button className={styles.add_btn}>
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