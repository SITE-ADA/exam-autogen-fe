import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import styles from './Test.module.css';
import EditPencilIcon from '../../../../icons/edit_pencil_icon.svg'
import TestIcon from '../../../../icons/tab-icons/testsicon.svg';
import { useNavigate } from "react-router-dom";
import Books from '../../../../icons/Books.svg';
import { NavLink } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getQBucketsByTest } from "../../../../Services/ms_test/QuestionBucketService";
import { msTestApi } from "../../../../Services/AxiosService";
import { patchQuestionBucket } from "../../../../Services/ms_question/QuestionBucketService";
import { errorT, success } from "../../../../Toasts/toasters";
import { useQuestionBucketContext } from "../../../../Context/QuestionBucketsContext";

export const Test = () => {
    const navigate = useNavigate();
    const [testName, setTestName] = useState("");
    const [pencilBtnToggle, setPencilBtnToggle] = useState(true);
    const inputRef = useRef();
    const NavigateToAddQuestionBucket = () => navigate(window.location.pathname + "/AddQuestionBucket");
    const [questionCount, setQuestionCount] = useState(0);
    const [editToggle, setEditToggle] = useState(false);
    const length = 1;
    const [qBuckets, setQBuckets] = useState([]);
    const {qbuckets, refetchQBuckets} = useQuestionBucketContext();
    const {id} = useParams();
    const SetInputRef = () => {
        inputRef.current.focus();
    };
    const [numbers, setNumbers] = useState([]);
    const [begin, setBegin] = useState(1);
    const [end, setEnd] = useState(0);

    const [editToggles, setEditToggles] = useState([]);
    const [questionCounts, setQuestionCounts] = useState([]);

    const handlePatchQuestionBucket = async(e, id, nbSelectedQuestions, noTotalQuestions,index) => {
        e.preventDefault();
        console.log(id, nbSelectedQuestions, noTotalQuestions);

        if(nbSelectedQuestions > noTotalQuestions)
        {
            errorT('You can select more than total number of questions!');
        }
        else{
        const response = await patchQuestionBucket(id, Number(nbSelectedQuestions));
        if(response.status === 200)
        {
            success('Question bucket successfully edited!');
            setEditToggles(prevEditToggles => prevEditToggles.map((toggle, i) => i === index ? false : toggle));
            refetchQBuckets();
        }
        }
    }


    useEffect(() => {
        const fetchTest = async() =>
    {
        const response = msTestApi.get(`/${id}`);
        const test = (await response).data;
        setTestName(test.name);
    }
    fetchTest();
    }, [id]);





    const {data, refetch} = useQuery({
        queryKey: ['question_buckets_test'],
        queryFn: async() => {
            const response = await getQBucketsByTest(id);
            console.log(response)
            setQBuckets(response.data);
            setEditToggles(response.data.map(() => false));
            return response.data;
        }
    });

    
    const getNbSelectedQuestionsArr = () => {
        let b = 0;
        let a = 0;
        const arr = [];
        Object.entries(qBuckets).map(([key, value], index)=> {
            const ns_selected = Number(value.nbSelectedQuestions);
            a = b + 1;
            b = a + ns_selected - 1;
            arr.push({start:a, end:b});
        });
        return arr;
    }

    useEffect(() => {
        
        setNumbers(getNbSelectedQuestionsArr())
        
    }, [testName]);



    useEffect(() => {
        if (data) {
            setQuestionCounts(data.map(() => 0)); // Initialize question counts array
        }
    }, [data]);

    console.log(qBuckets);

    return (
        <div className={styles.test_page}>
            <hr />
            <div className={styles.test_name_heading}>
                <input className={styles.input} type="text" ref={inputRef} value={testName} onChange={(e) => setTestName(e.target.value)} disabled={pencilBtnToggle} />
                <img onClick={() => {setPencilBtnToggle((value) => !value); SetInputRef();}} className={styles.pencil_btn} src={EditPencilIcon} alt="" />
            </div>
            <div className={styles.hor_line}></div>
            <h3 className={styles.test_content}>Test Content</h3>

            <div className={styles.question_buckets}>

            { Object.entries(qBuckets).map(([key, value], index)=> (
                <div key={key} className={styles.question_bucket}>

                    <div className={styles.question_bucket_heading}>
                        {editToggles[index] === true ? <h3>Question Bucket</h3> : <div className={styles.q_heading}> <h3>Question <span className={styles.questionStartNum}>{numbers[index]?.start}</span>-<span className={styles.questionEndNum}>{numbers[index]?.end}</span></h3>
                        <div className={styles.bucket_badge}><span>Bucket</span> </div>
                        <img className={styles.question_bucket_edit_icon} onClick={() => setEditToggles(editToggles.map((toggle, i) => i === index ? !toggle : toggle))} src={EditPencilIcon} alt="" /> </div>}
                        <div className={styles.each_question_score}><span>{value.noTotalQuestions * 1} Points</span></div>
                    </div>

                    <div className={styles.question_bucket_content}>
                        <div className={styles.main} style={ editToggles[index] === false ? {border: 'none'} : {}}>
                            <img src={Books} alt="" />
                            <div className={styles.bucket_info}>
                                {editToggles[index] === true ? <h3>{value.noTotalQuestions} questions in this bucket</h3> : <h3>{value.nbSelectedQuestions} of {value.noTotalQuestions} questions in this bucket are displayed randomly to students</h3>}
                                <NavLink className={styles.view_questions}>View questions</NavLink>
                            </div>
                        </div>

                        {editToggles[index] && ( 
                        <div className={styles.set_nb_questions}>
                            <p>Number of questions to display to students</p>
                            <input 
                            type="text"  
                            name="nbquestions" 
                            id="nbquestions" 
                            value={questionCounts[index]}
                            onChange={(e) => {
                                const updatedCounts = [...questionCounts];
                                updatedCounts[index] = e.target.value;
                                setQuestionCounts(updatedCounts);
                                setQuestionCount(e.target.value);
                            }}
                            />
                        </div> )}
                    </div>
                    {editToggles[index] && (
                    <div className={styles.btn_container}>
                        <button onClick={() => setEditToggles(editToggles.map((toggle, i) => i === index ? !toggle : toggle))} className={styles.cancel_btn}>Cancel</button>
                        <button onClick={(e) => handlePatchQuestionBucket(e, value.id, questionCounts[index], value.noTotalQuestions, index)} className={styles.save_btn}>Save</button>
                    </div> 
                    )}
                </div>
            )) }

            </div>
            {length > 0 ? (
            <div className={styles.assessment_info_new}>
                    <div className={styles.icon_horizontal}>
                        <div className={styles.left_line}></div>
                        <span onClick={() => NavigateToAddQuestionBucket()} className={styles.test_create_icon}><img src={TestIcon} alt="" /></span>
                        <div className={styles.right_line}></div>
                    </div>
            </div>) : (
            <div className={styles.assessment_info}>
                    <h3>Create your assessment</h3>
                    <div className={styles.icon_horizontal}>
                        <div className={styles.left_line}></div>
                        <span onClick={() => NavigateToAddQuestionBucket()} className={styles.test_create_icon}><img src={TestIcon} alt="" /></span>
                        <div className={styles.right_line}></div>
                    </div>
                    <p className={styles.icon_info}>Click the icon above to get started</p>
            </div>) }
        </div>
    );
}