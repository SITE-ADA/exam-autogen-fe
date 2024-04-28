import React, { useState } from "react";
import styles from './AddQuestionBucket.module.css';
import SliderBtn from '../../../../../icons/buttons-icons/Slider.svg';
import { NavLink, useNavigate } from "react-router-dom";
import ArrowDown from '../../../../../icons/tab-icons/arrow_down_black.svg';
import ArrowUp from '../../../../../icons/tab-icons/arrow_up_black.svg';
import SearchIcon from '../../../../../icons/icon_search.svg';
import Booklet from '../../../../../icons/Books.svg';
import { useLocation } from "react-router-dom";
import Books from '../../../../../icons/Books.svg';

export const AddQuestionBucket = () => {
    const [searchToggle, setSearchToggle] = useState(true);
    const [searchValue, setSearchValue] = useState("");
    const [sourcesToggle, setSourcesToggle] = useState(true);
    const [filterToggle, setFilterToggle] = useState(true);
    const [questionCollapseToggle, setQuestionCollapseToggle] = useState(true);
    const navigate = useNavigate();

    const [questionToggle, setQuestionToggles] = useState([]);

    

    const previousPage = useLocation().pathname.substring(0, useLocation().pathname.lastIndexOf('/'));
    
    const cancelCurrentPage = () => {
        navigate(previousPage);
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
                        <div className={styles.question_pool}>
                            <h3><img src={Books} alt="" />Question Pool 1</h3>
                            <div className={styles.question}>
                                <input type="checkbox" />
                                <div className={styles.question_info}>
                                    <div className={styles.questionType}>
                                        <p>Multiple Choice</p>
                                        <div className={styles.score}>
                                            <span>1 Point</span>
                                        </div>
                                        <img src={questionCollapseToggle === true ? ArrowDown : ArrowUp} />
                                    </div>
                                    <div className={styles.questionText}>
                                        <p>Test</p>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.question}>
                                <input type="checkbox" />
                                <div className={styles.question_info}>
                                    <div className={styles.questionType}>
                                        <p>Multiple Choice</p>
                                        <div className={styles.score}>
                                            <span>2 Point</span>
                                        </div>
                                        <img src={questionCollapseToggle === true ? ArrowDown : ArrowUp} />
                                    </div>
                                    <div className={styles.questionText}>
                                        <p>Another Test</p>
                                    </div>
                                </div>
                            </div>
                        </div>
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
                    <h3><span className={styles.booklet_img}><img src={Booklet} /></span><span className={styles.question_count}>2 &nbsp;</span> questions will be added</h3>
                </div>
                <div className={styles.btn_container}>
                    <button onClick={() => cancelCurrentPage()} className={styles.cancel_btn}>Cancel</button>
                    <button className={styles.add_btn}>Add Questions</button>
                </div>
            </div>
        </div>
    );
}