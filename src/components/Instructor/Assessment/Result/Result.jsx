import React, { useState } from "react";
import styles from './Result.module.css';

export const Result = () => {

    const [testVariant, setTestVariant] = useState("");

    return (
        <div className={styles.result_page}>
            <h3>Result</h3>
            
            <div className={styles.main}> 
                <div className={styles.result_card}>
                    <p>Result</p>
                    <p className={styles.student_id}>Student ID <span>13986</span></p>
                    <p className={styles.full_name}>Aslan Ibadullayev</p>
                    <div className={styles.fields_container}>
                        <div className={styles.test_variant}>
                            <label htmlFor="">Test Variant</label>
                            <div>
                                <span>5</span>
                            </div>
                        </div>
                        <div className={styles.assessment_id}>
                            <label htmlFor="">Assessment ID</label>
                            <div>
                                <span>5</span>
                            </div>
                        </div>
                    </div>
                    <p className={styles.exam_score}>Exam Score: <span>5</span></p>
                    <p className={styles.sheet}><strong>Answer Sheet:</strong></p>
                    <div className={styles.answer_sheet}>
                            <span>1. True</span>
                            <span>2. False</span>
                            <span>3. True</span>
                            <span>4. True</span>
                            <span>5. False</span>
                            <span>6. False</span>
                            <span>7. True</span>
                            <span>8. True</span>
                            <span>9. False</span>
                            <span>10. True</span>
                            <span>11. True</span>                            <span>1. True</span>
                            <span>2. False</span>
                            <span>3. True</span>
                            <span>4. True</span>
                            <span>5. False</span>
                            <span>6. False</span>
                            <span>7. True</span>
                            <span>8. True</span>
                            <span>9. False</span>
                            <span>10. True</span>
                            <span>1. True</span>
                            <span>2. False</span>
                            
                         
                            
                    </div>
                </div>
            </div>
        </div>
    );
}