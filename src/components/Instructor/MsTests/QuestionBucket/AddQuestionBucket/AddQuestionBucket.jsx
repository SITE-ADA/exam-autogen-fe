import React, { useState } from "react";
import styles from './AddQuestionBucket.module.css';
import SliderBtn from '../../../../../icons/buttons-icons/Slider.svg';
import { NavLink, useNavigate, useParams } from "react-router-dom";
import ArrowDown from '../../../../../icons/tab-icons/arrow_down_black.svg';
import ArrowUp from '../../../../../icons/tab-icons/arrow_up_black.svg';
import SearchIcon from '../../../../../icons/icon_search.svg';
import Booklet from '../../../../../icons/Books.svg';
import { useLocation } from "react-router-dom";
import Books from '../../../../../icons/Books.svg';
import { useQuestionPoolsandQuestionsContext } from "../../../../../Context/QuestionPoolsandQuestionsContext";
import { ToastContainer, toast } from "react-toastify";
import { createQuestionBucket } from "../../../../../Services/ms_test/QuestionBucketService";

export const AddQuestionBucket = () => {
    const [searchToggle, setSearchToggle] = useState(true);
    const [searchValue, setSearchValue] = useState("");
    const [sourcesToggle, setSourcesToggle] = useState(true);
    const [filterToggle, setFilterToggle] = useState(true);
    const [questionCollapseToggle, setQuestionCollapseToggle] = useState(true);
    const navigate = useNavigate();
    const [selectedMCQ, setSelectedMCQ] = useState([]);
    const [questionToggle, setQuestionToggles] = useState([]);
    const {qpoolsquestions} = useQuestionPoolsandQuestionsContext();
    console.log(qpoolsquestions)
    const arr = [];
    const id = useParams().id;
    console.log(id);
    const previousPage = useLocation().pathname.substring(0, useLocation().pathname.lastIndexOf('/'));
    const [selectedCheckbx, setSelectedCheckBx] = useState([]);
    
    const cancelCurrentPage = () => {
        navigate(previousPage);
    }

    
    const goToTest = () =>
    {
        navigate(`/Instructor/Tests/${id}`);
    }

    const handleCheckboxChange = (questionId) => {
        setQuestionToggles((prevQuestionToggles) => ({
            ...prevQuestionToggles,
            [questionId]: !prevQuestionToggles[questionId]
        }));
    
        setSelectedCheckBx((prevSelected) => {
            // Toggle the questionId presence in the array
            if (prevSelected.includes(questionId)) {
                return prevSelected.filter(id => id !== questionId);
            } else {
                return [...prevSelected, questionId];
            }
        });
    };
    

    const getCheckedQuestionIds = () => {
        
        const arr = Object.keys(questionToggle).filter((questionId) => questionToggle[questionId]);
        if(arr.length === 0)
        errorT("No question buckets selected!");
        console.log(arr);
        setSelectedMCQ(arr);
        return arr;
    };

    const handleAddQuestionBuckets = async(event) => {
        event.preventDefault();
        console.log(selectedCheckbx); // Use selectedCheckbx instead of selectedMCQ if this holds the IDs you need
        try {
            const response = await createQuestionBucket(selectedCheckbx, selectedCheckbx.length, 1, id);
            if(response.status === 200) {
                success("Question Bucket successfully created!");
                setTimeout(() => {
                    goToTest();
                }, 1500); 
            }
        } catch(e) {
            errorT("Error creating question bucket: " + e.message);
        }
    }
    

    const success = (msg) => {
        toast.success(msg, {
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

    const errorT = (msg) => {
        toast.error(msg, {
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

    return (
        <div className={styles.add_question_bucket}>
            <hr />
            <div className={styles.add_question_bucket_heading}>
                <h1>Add Question Bucket</h1>
                <button onClick={() => setFilterToggle((value) => !value)} className={styles.filter_btn}><img src={SliderBtn} /> <span>Filter</span></button>
            </div>
            <hr />
            <div className={styles.main_content}>
                <div className={styles.main}>
                    <div className={styles.checkbox_op_panel}>
                        <NavLink>Select All</NavLink>
                        <NavLink>Clear All</NavLink>    
                    </div>
                    <div className={styles.content}>
                    {Object.entries(qpoolsquestions).filter(([key, value]) => value.length > 0).map(([key, value]) => (
                    <div key={key} className={styles.question_pool}>
                        <h3><img src={Books} alt="" />{value[0]?.questionPool?.name}</h3>
                        {value.map((question, index) => (
                        <div key={question.id} className={styles.question}>
                            <input type="checkbox" checked={questionToggle[question.id]} onChange={() => handleCheckboxChange(question.id)}/>
                            <div className={styles.question_info}>
                            <div className={styles.questionType}>
                                <p>Multiple Choice</p>
                                <div className={styles.score}>
                                <span>{question.defaultScore} Point</span>
                                </div>
                                <img src={questionCollapseToggle ? ArrowDown : ArrowUp} alt="Toggle" />
                            </div>
                            <div className={styles.questionText}>
                                <p>{question.text}</p>
                            </div>
                            </div>
                        </div>
                        ))}
                    </div>
                    ))}
                    
                    </div>
                </div>
                {filterToggle && (
                <div className={styles.filter_criteria}>
                    <div className={styles.filter_criteria_main}>
                        <h3>Filter Criteria</h3>
                        <NavLink>Clear All</NavLink>
                    </div>
                    <div className={styles.search}>
                        <h3>Keyword Search <span><img onClick={() => setSearchToggle((value) => !value)} src={searchToggle === true ? ArrowDown : ArrowUp} alt="" /></span></h3>
                        { searchToggle && (
                        <div className={styles.search_input} >
                            <img src={SearchIcon} alt="Search Icon" className="search_icon" />
                            <input placeholder="Type search tag"
                                            className={styles.input}
                                            type="text"
                                            name='search'
                                            id='search'
                                            value={searchValue}
                                            onChange={(e) => setSearchValue(e.target.value)}
                                            required
                                            autoComplete="off"/>
                        </div> )}
                    </div>
                    <div className={styles.sources}>
                        <h3>Sources <span><img onClick={() => setSourcesToggle((value) => !value)} src={sourcesToggle === true ? ArrowDown : ArrowUp} alt="" /></span></h3>
                        {sourcesToggle && (
                        <div className={styles.question_pools}>
 
                            <h4>Question Pools</h4>
                            <div className={styles.pools}>

                            </div>
                          
                        </div> )}
                    </div>
                </div>
                )}
            </div>
            <div className={styles.questions_summary}>
                <div className={styles.questions_info}>
                    <h3><span className={styles.booklet_img}><img src={Booklet} /></span><span className={styles.question_count}>{selectedCheckbx.length} &nbsp;</span> questions will be added</h3>
                </div>
                <div className={styles.btn_container}>
                    <button onClick={() => cancelCurrentPage()} className={styles.cancel_btn}>Cancel</button>
                    <button onClick={handleAddQuestionBuckets} className={styles.add_btn}>Add Questions</button>
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