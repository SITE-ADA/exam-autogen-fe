import React from "react";
import styles from './DeleteTestModal.module.css';
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { deleteTest } from "../../../../Services/ms_test/TestService";
import { useTestsContext } from "../../../../Context/TestsContext";

export const DeleteTestModal = ({open, test, onClose}) =>
{
    const [visible, setVisible] = useState(false); 
    const {tests, refetchTests} = useTestsContext();
    const stopPropagation = (e) =>
    {
        e.stopPropagation();
    }

    console.log(test);

    const handleDeleteTest = async() => {
        try {
            const response = await deleteTest(test.id);
            console.log(response);
            if(response.status === 200)
            {
                success();
                setTimeout(() =>
            {
                refetchTests();
                onClose();
            }, 1300);
            }
        }catch(e)
        {
            errorT();
        }
    }

    const success = () => {
        toast.success('Test has been successfully deleted!', {
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
        toast.error('Error while deleting the test', {
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
                        <span>Are you sure to delete the test <span className={styles.red_text}>{"Test Delete"}</span> ?</span>
                    </div>
                    
                    <div className={styles.btn_container}>
            
                        <button onClick={() => handleDeleteTest()} className={styles.add_btn}>
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