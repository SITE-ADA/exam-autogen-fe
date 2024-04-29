import React from "react";
import styles from './Assessment.module.css';
import Cloud from '../../../icons/buttons-icons/cloud.svg';
export const Assessment = () =>
{

    const handleUploadClick = () => {
        document.getElementById('fileInput').click();
      };
    
    return (
        <div className={styles.assessment_page}>
            <h3>Assessment</h3>
            <div className={styles.hor_line}></div>
            <div className={styles.assessment_info}>
                <p>Upload the answer sheet</p>
                    <div className={styles.icon_horizontal}>
                        <div className={styles.left_line}></div>
                            <span onClick={() => handleUploadClick()} className={styles.test_create_icon}><img src={Cloud} alt="" /><input type="file" id="fileInput" className={styles.file_input}/></span>
                        <div className={styles.right_line}></div>
                    </div>
                <p className={styles.icon_info}>Click the icon above to get started</p>
            </div>
        </div>
    );
}