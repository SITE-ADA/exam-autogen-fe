import React, { version } from "react";
import styles from './GeneratedTest.module.css';
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import EditPencilIcon from '../../../../icons/edit_pencil_icon.svg';
import ArrowDown from '../../../../icons/tab-icons/arrow_down_black.svg'
import ArrowUp from '../../../../icons/tab-icons/arrow_up_black.svg';
import { useParams } from "react-router-dom";
import { useQuery } from '@tanstack/react-query';
import { getAllBookletsByTestId } from "../../../../Services/ms_test/QuestionBookletService";
import { useQuestionBookletsContext } from "../../../../Context/QuestionBookletsContext";
import { getGTestById } from "../../../../Services/ms_test/TestService";
import { useEffect } from "react";
import { createBookletDownloadLink } from "../../../../Services/ms_assessment/AssessmentService";
import JSZip from "jszip";
export const GeneratedTest = () => {

    const [gtestName, setGTestName] = useState("");
    const inputRef = useRef();
    const [versionToggle, setVersionToggle] = useState(true);
    const [pencilBtnToggle, setPencilBtnToggle] = useState(true);
    const navigate = useNavigate();
    const [editToggle, setEditToggle] = useState(false);
    const backpath = useLocation().pathname.substring(0, useLocation().pathname.lastIndexOf('/'));
    const [bookletsByTest, setBookletsByTest] = useState([]);
    const id = useParams().id;
    const [gTest, setGTest] = useState(null);
    const [bookletIds, setBookletIds] = useState([]);

    useEffect(() => {
        const fetchGTest = async() => {
            const response = await getGTestById(id);
            
            setGTestName(response.data.name);
        }

        fetchGTest();
    }, [id]);

    const {data, refetch} = useQuery({
        queryKey: ['booklets'],
        queryFn: async() =>
        {
            const response = await getAllBookletsByTestId(id);
            console.log(response);
            setBookletsByTest(response.data);
            const ids = response.data.map(booklet => booklet.id);
            setBookletIds(ids);
            return response;
        }
    })

    const downloadAllBooklets = async (e) => {
        const response = await createBookletDownloadLink(bookletIds);
        console.log(response);
        
        
    
        
    }
    

    const SetInputRef = () => {
        inputRef.current.focus();
    };

    const navigateBack = () => {
        navigate(backpath);
    }

    return (
        <div className={styles.generated_test}>
            <div className={styles.hor_line}></div>
            <h1>Booklets</h1>
            <div className={styles.generated_test_name_heading}>
                <input className={styles.input} type="text" ref={inputRef} value={gtestName} onChange={(e) => setGTestName(e.target.value)} disabled={pencilBtnToggle} />
                <img onClick={() => {setPencilBtnToggle((value) => !value); SetInputRef();}} className={styles.pencil_btn} src={EditPencilIcon} alt="" />
            </div>

            <div className={styles.hor_line}></div>

            <div className={styles.checkbox_op_panel}>
                <NavLink>Select All</NavLink>
                <NavLink>Clear All</NavLink>    
            </div>

            <div className={styles.test_versions}>
                { Object.entries(bookletsByTest).map(([key, value]) => (
                <div key={key} className={styles.test_version}>
                    <input type="checkbox" />
                    <div className={styles.version_info}>
                        <div className={styles.version_info_main}>
                            <p>{value.variantName}</p>
                            <img src={versionToggle === true ? ArrowDown : ArrowUp} />
                        </div>
                        <div className={styles.version_download_state}>
                            <p>Ready to download</p>
                        </div>
                    </div>
                </div> ))}


            </div>

            <div className={styles.btn_container}>
                <button onClick={() => navigateBack()} className={styles.go_back_btn}>Go Back</button>
                <button onClick={(e) => downloadAllBooklets(e)} className={styles.download_btn}>Download</button>
            </div>
        </div>
    );
}
