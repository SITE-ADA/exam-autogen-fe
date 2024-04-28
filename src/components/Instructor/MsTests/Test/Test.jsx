import React, { useRef, useState } from "react";
import styles from './Test.module.css';
import EditPencilIcon from '../../../../icons/edit_pencil_icon.svg'
import TestIcon from '../../../../icons/tab-icons/testsicon.svg';
import { useNavigate } from "react-router-dom";
import Books from '../../../../icons/Books.svg';
import { NavLink } from "react-router-dom";

export const Test = () => {
    const navigate = useNavigate();
    const [testName, setTestName] = useState("");
    const [pencilBtnToggle, setPencilBtnToggle] = useState(true);
    const inputRef = useRef();
    const NavigateToAddQuestionBucket = () => navigate(window.location.pathname + "/AddQuestionBucket");
    const [questionCount, setQuestionCount] = useState(0);
    const [editToggle, setEditToggle] = useState(false);
    const length = 1;

    const SetInputRef = () => {
        inputRef.current.focus();
    };

    return (
        <div className={styles.test_page}>
            <hr />
            <div className={styles.test_name_heading}>
                <input className={styles.input} type="text" ref={inputRef} value={testName} onChange={(e) => setTestName(e.target.value)} disabled={pencilBtnToggle} />
                <img onClick={() => {setPencilBtnToggle((value) => !value); SetInputRef();}} className={styles.pencil_btn} src={EditPencilIcon} alt="" />
            </div>
            <div className={styles.hor_line}></div>
            <h3 className={styles.test_content}>Test Content</h3>

            <div className={styles.question_buckets}>

                <div className={styles.question_bucket}>

                    <div className={styles.question_bucket_heading}>
                        {editToggle === true ? <h3>Question Bucket</h3> : <div className={styles.q_heading}> <h3>Question <span className={styles.questionStartNum}>1</span>-<span className={styles.questionEndNum}>2</span></h3>
                        <div className={styles.bucket_badge}><span>Bucket</span> </div>
                        <img className={styles.question_bucket_edit_icon} onClick={() => setEditToggle(true)} src={EditPencilIcon} alt="" /> </div>}
                        <div className={styles.each_question_score}><span>1 Point Each</span></div>
                    </div>

                    <div className={styles.question_bucket_content}>
                        <div className={styles.main} style={ editToggle === false ? {border: 'none'} : {}}>
                            <img src={Books} alt="" />
                            <div className={styles.bucket_info}>
                                {editToggle === true ? <h3>2 questions in this bucket</h3> : <h3>2 of 2 questions in this bucket are displayed randomly to students</h3>}
                                <NavLink className={styles.view_questions}>View questions</NavLink>
                            </div>
                        </div>

                        {editToggle && ( 
                        <div className={styles.set_nb_questions}>
                            <p>Number of questions to display to students</p>
                            <input 
                            type="text"  
                            name="nbquestions" 
                            id="nbquestions" 
                            value={questionCount}
                            onChange={(e) => setQuestionCount(e.target.value)}
                            />
                        </div> )}
                    </div>
                    {editToggle && (
                    <div className={styles.btn_container}>
                        <button onClick={() => setEditToggle(false)} className={styles.cancel_btn}>Cancel</button>
                        <button className={styles.save_btn}>Save</button>
                    </div> 
                )}
                </div>

            </div>
            {length > 0 ? (
            <div className={styles.assessment_info_new}>
                    <div className={styles.icon_horizontal}>
                        <div className={styles.left_line}></div>
                        <span onClick={() => NavigateToAddQuestionBucket()} className={styles.test_create_icon}><img src={TestIcon} alt="" /></span>
                        <div className={styles.right_line}></div>
                    </div>
            </div>) : (
            <div className={styles.assessment_info}>
                    <h3>Create your assessment</h3>
                    <div className={styles.icon_horizontal}>
                        <div className={styles.left_line}></div>
                        <span onClick={() => NavigateToAddQuestionBucket()} className={styles.test_create_icon}><img src={TestIcon} alt="" /></span>
                        <div className={styles.right_line}></div>
                    </div>
                    <p className={styles.icon_info}>Click the icon above to get started</p>
            </div>) }
            <div className={styles.save_btn_container}>
                <button className={styles.save_test_btn}>Save</button>
            </div>
        </div>
    );
}