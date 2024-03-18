import React from "react";
import styles from './PoolDeleteModal.module.css';
import '../../../GlobalStyles/deleteModal.css';
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { deleteQuestionPool } from "../../../../Services/ms_question/QuestionService";
import { usePoolContext } from "../../../../Context/PoolsContext";

const PoolDeleteModal = ({open, pool, onClose, onConfirm}) =>
{
    const [visible, setVisible] = useState(false); 
    const poolname = pool?.name;
    const poolId = pool?.id;

    const deletePool = async() =>{
        return await deleteQuestionPool(poolId);
};

    const {refetchPools} = usePoolContext();

    const mutation = useMutation({mutationFn: deletePool})

    const handleDeletePool = async() =>
    {
        try {
            const code = await mutation.mutateAsync()
            console.log(code.status)
            if(code.status === 204)
            {
                success();
                setTimeout(() =>
            {
                refetchPools();
                onClose();
            }, 1300);
            }
        } catch(error){
            errorT();
            setTimeout(() =>
            {
                onClose();
            }, 2000);

        }

    }

    const stopPropagation = (e) =>
    {
        e.stopPropagation();
    }

    const success = () => {
        toast.success('Pool has successfully been deleted!', {
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
            <div className="modalContainer" onClick={stopPropagation}>
                <div className="modalRight">
                    <div className="delete_inst_rep_hg">
                        <span>Are you sure to delete the pool <span className="red_text">{poolname}</span> ?</span>
                    </div>
                    
                    <div className="btn_container">
            
                        <button onClick={() => handleDeletePool()} className="add_btn">
                            <span>Confirm</span>
                        </button>
                        <button onClick={onClose} className="cancel_btn">
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

export default PoolDeleteModal;