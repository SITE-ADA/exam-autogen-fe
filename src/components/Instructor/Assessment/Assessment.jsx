import React from "react";
import styles from './Assessment.module.css';
import Cloud from '../../../icons/buttons-icons/cloud.svg';
import { getStudentReport } from "../../../Services/ms_assessment/AssessmentService";
import { useState } from "react";
export const Assessment = () =>
{
    const [imageBase64, setImageBase64] = useState('');

    const handleUploadClick = () => {
        document.getElementById('fileInput').click();
      };

      const handleFileUpload = async(event) => {
        const file = event.target.files[0]; // Assuming single file upload
        if (file) {
        const reader = new FileReader();

        reader.onload = async() => {
        const base64String = reader.result;
        setImageBase64(base64String);
        
        console.log(base64String);
      };

      reader.readAsDataURL(file);

   
    }
      };
    
    
    return (
        <div className={styles.assessment_page}>
            <h3>Assessment</h3>
            <div className={styles.hor_line}></div>
            <div className={styles.assessment_info}>
                <p>Upload the answer sheet</p>
                    <div className={styles.icon_horizontal}>
                        <div className={styles.left_line}></div>
                            <span onClick={() => handleUploadClick()} className={styles.test_create_icon}><img src={Cloud} alt="" /><input type="file" id="fileInput" onChange={handleFileUpload} className={styles.file_input}/></span>
                        <div className={styles.right_line}></div>
                    </div>
                <p className={styles.icon_info}>Click the icon above to get started</p>
            </div>
        </div>
    );
}