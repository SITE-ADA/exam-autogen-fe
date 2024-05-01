import React, { useState } from "react";
import styles from './Assessment.module.css';
import Cloud from '../../../icons/buttons-icons/cloud.svg';
import { getStudentReport } from "../../../Services/ms_assessment/AssessmentService";
import { useAssessmentContext } from "../../../Context/AssessmentContext";
import { useNavigate } from "react-router-dom";

export const Assessment = () => {
    const [imageBase64, setImageBase64] = useState('');
    const [fileName, setFileName] = useState('');
    const {omrResponse, setOmrResponse} = useAssessmentContext();
    const navigate = useNavigate();
    const handleUploadClick = () => {
        document.getElementById('fileInput').click();
    };

    const handleFileUpload = async(event) => {
        const file = event.target.files[0]; // Assuming single file upload
        if (file) {
            const formData = new FormData();
            formData.append('file', file); // Append the file object to FormData
    
            try {
                const response = await getStudentReport(formData);
                console.log(response.data);
                setOmrResponse(response.data);
                
                navigate('/Instructor/Assessment/Result');

                // Clear the file input field after successfully uploading
                event.target.value = null; // Reset the value of the file input field
            } catch (error) {
                console.error('Error:', error);
            }
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
                    <span onClick={() => handleUploadClick()} className={styles.test_create_icon}>
                        <img src={Cloud} alt="" />
                        <input type="file" id="fileInput" onChange={handleFileUpload} className={styles.file_input}/>
                    </span>
                    <div className={styles.right_line}></div>
                </div>
                <p className={styles.icon_info}>Click the icon above to get started</p>
                {fileName && <p>Uploaded File: {fileName}</p>}
            </div>
        </div>
    );
}
