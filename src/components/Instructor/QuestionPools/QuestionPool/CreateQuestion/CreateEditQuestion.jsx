import React, {KeyboardEventHandler, useState, useRef} from "react";
import styles from './CreateEditQuestion.module.css';
import CreatableSelect from 'react-select/creatable';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState } from 'draft-js';
import '../../../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import AsyncSelect from 'react-select/async';
import { msQuestionApi } from "../../../../../Services/AxiosService";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Breadcrumbs from "../../../../Breadcrumb/Breadcrumbs";
import { useQuery } from "@tanstack/react-query";
import { createQuestion } from "../../../../../Services/ms_question/QuestionService";
import { createAnswers, createCorrectAnswers } from "../../../../../Services/ms_question/AnswerService";
import { useEffect } from "react";
const CreateEditQuestion = () =>
{
    const [tagError, setTagError] = useState({status: false, msg:null});
    const [text, setText] = useState("");
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [questionTextInputFieldVisible, setQuestionTextInputFieldVisible] = useState(true);
    const [questionTextEditorVisible, setQuestionTextEditorVisible] = useState(false);
    const [qType, setQtype] = useState()
    const navigate = useNavigate();
    const paths = useLocation().pathname.split("/");
    const questionPoolId = paths[3];
    console.log(questionPoolId)
    const [questionTags, setQuestionTags] = useState([]);
    const [questionText, setQuestionText] = useState("");
    const [questionType, setQuestionType] = useState(1.0);
    const [questionAnswersIds, setQuestionAnswersIds] = useState([]);
    const [correctAnswerId, setCorrectAnswerId] = useState(null);
    const [notes, setNotes] = useState("");
    const [defaultScore, setDefaultScore] = useState(1.0);
    const [answer1, setAnswer1] = useState("");
    const [answer2, setAnswer2] = useState("");
    const [answer3, setAnswer3] = useState("");
    const [answer4, setAnswer4] = useState("");
    const [answers, setAnswers] = useState([]);
    const currentURL = window.location.href;
    const id = useParams().id;
    console.log(id);
    const mode = id > 0 ? 1 : 0;
    const [answer1Id, setAnswer1Id] = useState(null);
    const [answer2Id, setAnswer2Id] = useState(null);
    const [answer3Id, setAnswer3Id] = useState(null);
    const [answer4Id, setAnswer4Id] = useState(null);
    const [quesId, setQuesId] = useState();

    const [questionCreated, setQuestionCreated] = useState(true);

    console.log(id);
    // Split the URL by '/' to get an array of segments
    const urlSegments = currentURL.split('/');

    // Get the last segment (which is the last parameter)
    const qId = urlSegments[urlSegments.length - 1];
    console.log(qId);

    const [checkedStatus, setCheckedStatus] = useState({
      answer1: false,
      answer2: false,
      answer3: false,
      answer4: false,
    });

    const [checkedId, setCheckedId] = useState();

    const getSelectedAnswer = (answer) => {
      switch (answer) {
        case 'answer1':
          return checkedStatus.answer1 ? answer1 : '';
        case 'answer2':
          return checkedStatus.answer2 ? answer2 : '';
        case 'answer3':
          return checkedStatus.answer3 ? answer3 : '';
        case 'answer4':
          return checkedStatus.answer4 ? answer4 : '';
        default:
          return '';
      }
    };
  
    const handleCheckboxChange = (answer, id) => {
      setCheckedStatus({
          ...checkedStatus,
          [answer]: !checkedStatus[answer],
      });
      // You can perform any other logic related to the checkbox id here
      setCorrectAnswerId(id);
  };


    const {data, refetch} = useQuery({
      queryKey:['question_pool'],
      queryFn:async() =>
      {
        try {
          const response = await msQuestionApi.get(`/${id}`);
          const question = response.data;
          setQuestionText(question.text);
          setNotes(question.notes);
          setDefaultScore(question.defaultScore);
          setQuestionType(question.questionType);
          // set answers, correct answer, 
          return response.data;

        }catch(e)
        {

        }
      },
      enabled: mode === 1 ? true: false
    }); 

    const [selectInputValue, setSelectInputValue] = useState('');
    const [selectedValue, setSelectedValue] = useState(null);

    const makeCorrectAnswer = (answer) => {
            setCorrectAnswerId(answer.id);
            console.log(answer)
    }


    const handleInputChange = value => {
        setValue(value);
    };

  // handle selection
  const handleChange = value => {
    console.log(value);
    setQuestionType(value);
    setSelectedValue(value);
  }

  

    const fetchQuestionTypes = () => {
        return msQuestionApi.get('/question-type').then((result) =>
        {
            const res = result.data;
            return res;
        })
    }
    const customSelectStyles = {
        menu: provided => ({
            ...provided,
            maxHeight: '100px', // Set max height for scrolling
            overflowY: 'auto', // Enable vertical scrolling
          }),
        control: (provided, state) => ({
          ...provided,
          width: '100%', // Set width to 100%,
          marginTop: '10px',
          border: '1px solid #ced4da',
          borderRadius: '8px',
          borderColor: state.isFocused || state.isActive ? '#f6f6f6 !important' : '#f6f6f6 !important',
          borderWidth: '0px !important', // Set border width to 1px
          padding: '0',
          backgroundColor: '#f6f6f6 !important',
          color: '#747474',
          fontSize: '15px'
        }),
        option: (provided, state) => ({
          ...provided,
          backgroundColor: state.isSelected ? '#80bdff !important' : 'transparent',
          color: '#343434',
          fontSize: '15px'
        }),
        valueContainer: (provided) => ({
          ...provided,
          padding: '10px', // Adjust padding as needed
        }),
        input: (provided) => ({
          ...provided,
          margin: '0', // Remove default margin
          padding: '0', // Remove default padding
          fontSize: 'inherit', // Inherit font size from parent
          fontFamily: 'inherit', // Inherit font family from parent
          color: '#343434',
          backgroundColor: 'transparent',
          border: 'none',
          boxShadow: 'none',
          outline: 'none',
          lineHeight: 'normal',
          fontSize: '15px'
        }),
        singleValue: (provided) => ({
          ...provided,
          color: '#212529',
        }),
        indicatorSeparator: () => ({ display: 'none' }), // Remove the indicator separator
      };


    const customStyles = {
        menu: provided => ({
            ...provided,
            maxHeight: '100px', // Set max height for scrolling
            overflowY: 'auto', // Enable vertical scrolling
          }),
        control: (provided, state) => ({
          ...provided,
          width: '100%', // Set width to 100%,
          marginTop: '10px',
          border: '1px solid #ced4da',
          borderRadius: '8px',
          borderColor: state.isFocused || state.isActive ? '#f6f6f6 !important' : '#f6f6f6 !important',
          borderWidth: '0px !important', // Set border width to 1px
          padding: '0',
          backgroundColor: '#f6f6f6 !important',
          color: '#747474',
          fontSize: '15px'
        }),
        option: (provided, state) => ({
          ...provided,
          backgroundColor: state.isSelected ? '#80bdff !important' : 'transparent',
          color: '#343434',
          fontSize: '15px'
        }),
        valueContainer: (provided) => ({
          ...provided,
          padding: '10px', // Adjust padding as needed
        }),
        input: (provided) => ({
          ...provided,
          margin: '0', // Remove default margin
          padding: '0', // Remove default padding
          fontSize: 'inherit', // Inherit font size from parent
          fontFamily: 'inherit', // Inherit font family from parent
          color: '#343434',
          backgroundColor: 'transparent',
          border: 'none',
          boxShadow: 'none',
          outline: 'none',
          lineHeight: 'normal',
          fontSize: '15px'
        }),
        singleValue: (provided) => ({
          ...provided,
          color: '#212529',
        }),
        indicatorSeparator: () => ({ display: 'none' }), // Remove the indicator separator
      };
    
    const components = {
        DropdownIndicator: null,
      };

    const createOption = (label) => ({
    label,
    value: label,
    });

    const handleAddButton = () => {
        for (let i = 0; i < value.length; i++)
        {
            console.log(value[i])
        }
    };

    const [inputValue, setInputValue] = React.useState('');
    const [value, setValue] = React.useState([]);

    const handleKeyDown = (event) => {
        if (!inputValue) return;

        
        switch (event.key) {
          case 'Enter':
          case 'Tab':
            if(inputValue.length < 5 || inputValue.length > 11)
            {
                setTagError({status: true, msg: "Tag length must be between 4 and 12 characters long!"});
            }
            else if(value.some(tag => tag.value === inputValue)){
                setTagError({status: true, msg: "Tags must be unique!"});
            }
            else {
                setTagError({status: false, msg: null});
                setValue((prev) => [...prev, createOption(inputValue)]);
                setInputValue('');
            }
            event.preventDefault();
        }
      };

      const success = () => {
        toast.success('Question has successfully been created!', {
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

    const errorT = () => {
        toast.error('Try entering different username, email address, or phone number', {
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

    const handleEditQuestion = async(event) => {
        event.preventDefault();
    };
/*
    const handleAddQuestion = async(event) => {
      event.preventDefault();
      console.log(getSelectedAnswer('answer1'));
      console.log("efwefew");
        try {
          const responseQuestion = await createQuestion(questionText, questionType.id, defaultScore, questionPoolId, notes);
          console.log(responseQuestion);
          const qId = responseQuestion.data[0].id;
          setQuesId(responseQuestion.data[0].id);
          console.log(qId);
          if(responseQuestion.status === 200)
          {
            success();

            const responseAnswer = await createAnswers(qId, answer1, answer2, answer3, answer4);
            setAnswers(responseAnswer.data);
            console.log(answers);

            setAnswer1Id(answers[0].id);
            setAnswer2Id(answers[1].id);
            setAnswer3Id(answers[2].id);
            setAnswer4Id(answers[3].id);

            console.log(answer1Id);
            console.log(answer2Id);
            console.log(answer3Id);
            console.log(answer4Id);

            if(checkedId === 1) {
            setCorrectAnswerId(answer1Id);
            console.log(correctAnswerId)
            }
            else if (checkedId === 2){
            setCorrectAnswerId(answer2Id);
            console.log(correctAnswerId)
            }
            else if (checkedId === 3){
            setCorrectAnswerId(answer3Id);
            console.log(correctAnswerId);
            }
            else if (checkedId === 4) {
            setCorrectAnswerId(answer4Id);
            console.log(correctAnswerId);
            }

            const responseCorrectAnswer = await createCorrectAnswers(quesId, correctAnswerId);

          console.log(responseCorrectAnswer);
        console.log(responseCorrectAnswer.data);
          }

        }catch(e)
        {

        }
    }; */

    const handleAddQuestion = async (event) => {
      event.preventDefault();
      try {
          // Create the question
          const responseQuestion = await createQuestion(questionText, questionType.id, defaultScore, questionPoolId, notes);
          const qId = responseQuestion.data[0].id;
          setQuesId(qId);

          // Create the answers
          const responseAnswer = await createAnswers(qId, answer1, answer2, answer3, answer4);
          setAnswers(responseAnswer.data);

          // After setting answers, update answer IDs
          // Ensure responseAnswer.data is not null or undefined
          if (responseAnswer.data && responseAnswer.data.length > 0) {
              setAnswer1Id(responseAnswer.data[0].id);
              setAnswer2Id(responseAnswer.data[1].id);
              setAnswer3Id(responseAnswer.data[2].id);
              setAnswer4Id(responseAnswer.data[3].id);
          }

          console.log(correctAnswerId);
          // Create the correct answer
          const responseCorrectAnswer = await createCorrectAnswers(qId, correctAnswerId);
          console.log(responseCorrectAnswer);
          console.log(responseCorrectAnswer.data);
      } catch (error) {
          // Handle errors
          console.error(error);
      }
  };

  useEffect(() => {
    // Update answer IDs
    if (answers.length > 0) {
        setAnswer1Id(answers[0].id);
        setAnswer2Id(answers[1].id);
        setAnswer3Id(answers[2].id);
        setAnswer4Id(answers[3].id);
    }
    console.log(correctAnswerId);
    // Other actions that depend on answers state
    console.log("Answers:", answers);
}, [answers]);

  

    const stopPropagation = (e) => {
      e.stopPropagation();
  };

    const goBack = () => {
        navigate(`/Instructor/QuestionPools/${questionPoolId}`);
    }

    return(
        <div className={styles.add_question_tag_page}>
            <h1>{qId == 0 ? 'Create Question' : 'Edit Question'}</h1>
            <form className={styles.question_form} onSubmit={handleAddQuestion}>

                <div className={styles.question_text}>
                    <label htmlFor="question_text">Text</label>
                    {questionTextInputFieldVisible && (
                    <input 
                    id="qtext"
                    name="q"
                    className={styles.input}
                    placeholder="Enter text"
                    onChange={(e) => {setQuestionText(e.target.value); console.log(questionText)}}
                    value={questionText}
                    type="text" />
                )}
            
                </div>
                <div className={styles.question_types}>
                <label htmlFor="">Question Type</label>
                <AsyncSelect
                    defaultOptions
                    value={questionType}
                    getOptionLabel={e => e.questionType}
                    getOptionValue={e => e.id}
                    loadOptions={fetchQuestionTypes}
                    onInputChange={handleInputChange}
                    onChange={handleChange}
                    styles={customSelectStyles}
                    menuPortalTarget={document.body}
                    isClearable={true}
                    isRequired={true} // Mark the Select as required
                                />
                </div>

                <div className={styles.answers}>

                    <label htmlFor="">Answers (check the box for the correct answer.)</label>

                    <div className={styles.answer}>
                        <input type="checkbox" checked={checkedStatus.answer1} onChange={() => handleCheckboxChange('answer1', 1)} />
                        <input className={styles.input} type="text" placeholder="answer1" value={answer1} onChange={(e) => setAnswer1(e.target.value)} />
                    </div>
                    <div className={styles.answer}>
                        <input type="checkbox" checked={checkedStatus.answer2} onChange={() => handleCheckboxChange('answer2', 2)}/>
                        <input className={styles.input} type="text" placeholder="answer2" value={answer2} onChange={(e) => setAnswer2(e.target.value)} />
                    </div>
                    <div className={styles.answer}>
                        <input type="checkbox" checked={checkedStatus.answer3} onChange={() => handleCheckboxChange('answer3', 3)}/>
                        <input className={styles.input} type="text" placeholder="answer3" value={answer3} onChange={(e) => setAnswer3(e.target.value)} />
                    </div>
                    <div className={styles.answer}>
                        <input type="checkbox" checked={checkedStatus.answer4} onChange={() => handleCheckboxChange('answer4', 4)} />
                        <input className={styles.input} type="text" placeholder="answer4" value={answer4} onChange={(e) => setAnswer4(e.target.value)} />
                    </div>
                </div>

                <div className={styles.notes}>
                    <label htmlFor="">Notes</label>
                    <input className={styles.input} type="text" step={0.01} placeholder="Enter notes"  value={notes} onChange={(e) => {setNotes(e.target.value); console.log(notes)}}/>
                </div>

                <div className={styles.default_score}>
                    <label htmlFor="">Default score</label>
                    <input className={styles.default_score_input} type="number" placeholder={"Enter Default score"} value={defaultScore} onChange={(e) => {setDefaultScore(e.target.value); console.log(defaultScore)}}/>
                </div>

                <div className={styles.btn_container}>
                    <button type='submit' className={styles.add_btn} >
                        <span>Confirm</span>
                    </button>
                    <button onClick={goBack} className={styles.cancel_btn}>
                        <span>Cancel</span>
                    </button>
                </div>
            </form>
        </div>
    );
}

export default CreateEditQuestion;