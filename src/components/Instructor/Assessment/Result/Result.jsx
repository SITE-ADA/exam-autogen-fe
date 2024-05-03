import React, { useState, useEffect } from "react";
import styles from './Result.module.css';
import { useAssessmentContext } from "../../../../Context/AssessmentContext";
import { useNavigate } from "react-router-dom";

export const Result = () => {
    const { omrResponse } = useAssessmentContext();
    const [testVariant, setTestVariant] = useState("");
    const scores = omrResponse ? JSON.parse(omrResponse.scoresJson) : {}; // Parse scoresJson to object
    const navigate = useNavigate();

    const BackToAssessment = () => {
        navigate('/Instructor/Assessment');
    }

    return (
        <div className={styles.result_page}>
            <h3>Result</h3>

            <div className={styles.main}>
                <div className={styles.result_card}>
                    <p>Result</p>
                    <p className={styles.student_id}>Student ID <span>{omrResponse && omrResponse.studentId}</span></p>
                    <p className={styles.full_name}>{omrResponse && omrResponse.firstName} {omrResponse && omrResponse.lastName}</p>
                    <div className={styles.fields_container}>
                        <div className={styles.test_variant}>
                            <label htmlFor="">Test Variant</label>
                            <div>
                                <span>{omrResponse && omrResponse.testVariant}</span>
                            </div>
                        </div>
                        <div className={styles.assessment_id}>
                            <label htmlFor="">Assessment ID</label>
                            <div>
                                <span>{omrResponse && omrResponse.assessmentId}</span>
                            </div>
                        </div>
                    </div>
                    <p className={styles.exam_score}>Exam Score: <span>{omrResponse && omrResponse.examScore}</span></p>
                    <p className={styles.sheet}><strong>Answer Sheet:</strong></p>
                    <div className={styles.answer_sheet}>
                        {Object.entries(scores).map(([key, value]) => (
                            <p key={key}>
                                {key}: <span className={value === true ? styles.correct : styles.wrong}>{value ? 'True' : 'False'}</span>
                            </p>
                        ))}
                    </div>
                </div>
            </div>
            <div className={styles.btn_container}>
                        <button onClick={() => BackToAssessment()} type='submit' className={styles.add_btn}>
                            <span>New Assessment</span>
                        </button>
            </div>
        </div>
    );
}
