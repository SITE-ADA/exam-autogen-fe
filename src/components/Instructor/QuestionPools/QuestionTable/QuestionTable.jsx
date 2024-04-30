import React, { useEffect } from "react";
import styles from './QuestionTable.module.css';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { QuestionDeleteModal } from "../Questions/QuestionDelete/QuestionDeleteModal";
import TripleDots from '../../../../icons/buttons-icons/tripledots.svg';
import RowEditBtn from '../../../../icons/buttons-icons/rowedit.svg';
import RowDeleteBtn from '../../../../icons/buttons-icons/rowdelete.svg';
import { useLocation } from "react-router-dom";
import { getQuestionByPool } from "../../../../Services/ms_question/QuestionService";

export const QuestionTable = ({checkBoxForAll}) => {

    // const checkBoxForAllRows = checkBoxForAll;
    // const [selectAll, setSelectAll] = useState(checkBoxForAllRows);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5; // Set items per page as you need
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [questionToDelete, setQuestionToDelete] = useState(null);
    const [mode, setMode] = useState(null);
    const navigate = useNavigate();
    const [openModal, setOpenModal] = useState(false);
    const [questionId, setQuestionId] = useState(null);
    const [questions, setQuestions] = useState([]);
    const pathnames = useLocation().pathname.split('/');
    const poolId = pathnames[pathnames.length - 1];
    const [noQuestions, setNoQuestions] = useState(false);
    console.log(pathnames);

    useEffect(() => {
        console.log(poolId);
        const fetchQuestions = async() =>{ 
            try {
            const response = await getQuestionByPool(poolId);
            console.log(response)
            if(response.status === 404)
            {
                setNoQuestions(true)
                console.log("ewfwfwef")
            }
            else{
                console.log(response.data);
                setQuestions(response.data);
                setNoQuestions(false);
            }
        }
        catch(e)
        {

        }
        }
        fetchQuestions();  
    }, []);

    const GoEditQuestionPage = (id) => 
    {
        navigate(window.location.pathname + "/EditQuestion/" + id);
    }

/*
    

    const handleSelectAll = () => {
        setSelectAll(!selectAll);
        const updatedInstReps = pools.map(pool => ({
            ...pool,
            checked: !selectAll
        }));
        setPools(updatedInstReps);
    };

    const handleCheckboxChange = (event, id) => {
        event.stopPropagation();
        const updatedInstReps = pools.map(pool => {
            if (pool.id === id) {
                return {
                    ...pool,
                    checked: !pool.checked
                };
            }
            return pool;
        });
        setPools(updatedInstReps);
        setSelectAll(updatedInstReps.every(pool => pool.checked));
    }; */

    const getTagsString = (question) =>
    {
        const tags = question.tags;

        let str = tags.join(', ');
        return str;
    }

    return (
        <div>
        <table >
            <thead>
                <tr>
                    <th><input type="checkbox" name="checkboxAll" id="checkboxAll" /></th>
                    <th>Text</th>
                    <th>Type Name</th>
                </tr>
            </thead>
            <tbody>
                {noQuestions === true ? <span>No Questions</span> :(
                questions?.map((question) => (
                    <tr key={question.id}>
                        <td><input checked={question.checked} type="checkbox" name="checkboxAll" id={`checkbox-${question.id}`} /></td>
                        <td className="name">{question?.text == null ? ("no data") : (question?.text)}</td>
                        <td className="subject">{question.questionTypeName == null ? ("no data") : question.questionTypeName}</td>
                        <td className="actions">
                            <div className="triple-dots">
                                <img src={TripleDots} alt="" />
                                <div className="buttons-container">
                                    <span onClick={(event) =>
                                    {
                                        console.log(question);
                                        
                                        setQuestionToDelete(question);
                                        console.log(question.id)
                                        setOpenDeleteModal(true)
                                    }
                                    }><img src={RowDeleteBtn} alt="" /></span>
                                    <span onClick={() => {GoEditQuestionPage(question.id)}}><img src={RowEditBtn} alt="" /></span>
                                </div>
                            </div>
                        </td>
                    </tr>
                )))}
            </tbody>
            <tfoot>
            </tfoot>
        </table> 
        <QuestionDeleteModal 
            open={openDeleteModal}
            question={questionToDelete}
            onClose={() => setOpenDeleteModal(false)}
            />
        </div>
    );
}
