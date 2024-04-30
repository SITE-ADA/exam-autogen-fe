import React from "react";
import styles from './QuestionDeleteModal.module.css';
import { deleteQuestionById } from "../../../../../Services/ms_question/QuestionService";
import { useMutation } from "@tanstack/react-query";
import { toast, ToastContainer } from "react-toastify";
import { useState } from "react";
export const QuestionDeleteModal = ({open, question, onClose}) => 
{
    const [visible, setVisible] = useState(false);
    const questionName = question?.text;
    const questionId = question?.id;
    console.log(questionId);


    const handleDeleteQuestion = async() =>
    {
        try {
            const code = await deleteQuestionById(questionId);
            console.log("DELETE Question")
            console.log(code.status)
            if(code.status === 204)
            {
                success();
                setTimeout(() =>
            {
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
                        <span>Are you sure to delete the question <span className="red_text">{questionName}</span> ?</span>
                    </div>
                    
                    <div className="btn_container">
            
                        <button onClick={() => handleDeleteQuestion()} className="add_btn">
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