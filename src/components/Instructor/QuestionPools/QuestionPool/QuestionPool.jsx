import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getQuestionByPool } from "../../../../Services/ms_question/QuestionService";
import { useState, useEffect } from "react";
import { QuestionTable } from "../QuestionTable/QuestionTable";
import Breadcrumbs from "../../../Breadcrumb/Breadcrumbs";
import styles from './QuestionPool.module.css'
import UserIcon from '../../../../icons/usericon.svg';
import SearchIcon from '../../../../icons/icon_search.svg';
const QuestionPool = () =>
{
    const [questions, setQuestions] = useState([]);
    const navigate = useNavigate();
    const [questionId, setQuestionId] = useState(0);
    const [openModal, setOpenModal] = useState(false);
    const [mode, setMode] = useState(0);
    const [searchValue, setSearchValue] = useState("");

    const GoCreateQuestion = () => {
        console.log(window.location.pathname + "/0")
        navigate(window.location.pathname + "/CreateQuestion/0")
    }

    useEffect(() => {
 
    }, [])

    return (
        <div>
            <Breadcrumbs />
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
                     GoCreateQuestion();
                    }} className={styles.add_question_btn}>
                        <span>Add Question</span>
                </button>
            </div>
            <QuestionTable checkBoxForAll={true} />
        </div>
    );
}

export default QuestionPool;