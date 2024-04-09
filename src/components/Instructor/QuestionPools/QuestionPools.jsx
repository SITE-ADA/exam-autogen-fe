import React, { useState, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import styles from './QuestionPools.module.css';
import Breadcrumbs from "../../Breadcrumb/Breadcrumbs";
import UserIcon from '../../../icons/usericon.svg';
import SearchIcon from '../../../icons/icon_search.svg';
import QuestionPoolWhite from "../../../icons/tab-icons/questionpoolswhite.svg";
import PoolTable from "./QuestionPoolsDataTable/PoolTable";
import CreateEditPoolModal from "./CreateQuestionPool/CreateEditPoolModal";
import { getAllPools, getQuestionCountByPool, questionCountByPool } from "../../../Services/ms_question/QuestionPoolService";
import { useQuery } from "@tanstack/react-query";
import { ToastContainer, toast } from 'react-toastify';
import { msQuestionApi } from "../../../Services/AxiosService";
import { usePoolContext } from "../../../Context/PoolsContext";
import { useSubjectContext } from "../../../Context/SubjectsContext";
const QuestionPools = () =>
{
    const [searchValue, setSearchValue] = useState("");
    const [openModal, setOpenModal] = useState(false);
    const [mode, setMode] = useState(null);
    const [poolId, setPoolId] = useState(0);
    const {pools} = usePoolContext();
    const {subjects} = useSubjectContext();
    const poolCount = pools.length;
    const subjectCount = subjects.length;
    const [questionCount, setQuestionCount] = useState(0);

    useEffect(() => 
    {
        const getQuestionCounts = async() =>
        {
            const response = await getQuestionCountByPool();
            const questionCounts = response.data;
            console.log(response.data);
            let sum = 0;
 
            for (let i = 0; i < questionCounts.length; i++)
            {
                if(questionCounts[i].questionPoolId !== null)
                    sum += parseInt(questionCounts[i].count);
            }
            setQuestionCount(sum);

        }
        getQuestionCounts();
        console.log("wefwfeewf" + questionCount);
        console.log("QuestionPool.jsx component fired.");
    });

    return (
        <div>
            <Breadcrumbs questionPoolName={"Question Pool #1"} questionId={null} />

            <div className={styles.quantities_info}>
                <div className={styles.count_info}>
                    <h1 className="count"><span>{poolCount}</span></h1>
                    <br />
                    <p>Question Pools</p>
                </div>
                <div className={styles.count_info}>
                    <h1 className="count"><span>{subjectCount}</span></h1>
                    <br />
                    <p>Subjects</p>
                </div>
                <div className={styles.count_info}>
                    <h1 className="count"><span>{questionCount}</span></h1>
                    <br />
                    <p>Total Questions</p>
                </div>
            </div>

            <div className={styles.question_pools_header}>
            <div className={styles.search_panel}>
                    <div className={styles.search} >
                        <img src={SearchIcon} alt="Search Icon" className="search_icon" />
                        <input placeholder="Search"
                                        className={styles.input}
                                        type="text"
                                        name='search'
                                        id='search'
                                        value={searchValue}
                                        onChange={(e) => setSearchValue(e.target.value)}
                                        required
                                        autoComplete="off"/>
                    </div>
                    <div className={styles.dropdown_list}>
                    <select>
                        <option value="">All</option>
                        <option value="option1">Option 1</option>
                        <option value="option2">Option 2</option>
                    </select>
                    </div>
                    
                </div>
                <button onClick={() =>{
                     setOpenModal(true);
                     setMode(0);
                     setPoolId(0);
                    }} className={styles.add_instructor_btn}>
                        <span>Add Question Pool</span>
                </button>
            </div>

            <PoolTable checkBoxForAll={true}/>

            <CreateEditPoolModal 
            open={openModal} 
            onClose={() => setOpenModal(false)} 
            poolId={poolId}
            mode={mode}
            />
        </div>
    );
}

export default QuestionPools;