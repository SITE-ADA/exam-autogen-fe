import React from "react";
import styles from './CreateEditTest.module.css';
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useMySubjectsContext } from "../../../../Context/MySubjectsContext";
import AsyncSelect from 'react-select/async';
import { useTestsContext } from "../../../../Context/TestsContext";
import { createTest } from "../../../../Services/ms_test/TestService";

const CreateEditTest = ({open, onClose, mode, id}) => {
    const [visible, setVisible] = useState(false);
    const [shouldRefetch, setShouldRefetch] = useState(false);
    const [testName, setTestName] = useState("");
    const [notes, setNotes] = useState("");
    const [instructions, setInstructions] = useState("");
    const [maxScore, setMaxScore] = useState(null);
    const [subject, setSubject] = useState(null);
    const [inputValue, setValue] = useState('');
    const [selectedValue, setSelectedValue] = useState(null);

    const {mySubjects} = useMySubjectsContext();
    const {refetchTests} = useTestsContext();


    const handleEditTest = () => {
        // TO DO...
    }

    const handleCreateTest = async(event) => {
        event.preventDefault();
        try {
            const response = await createTest(testName, notes, instructions, maxScore, subject.id);
            if(response.status === 201)
            {
                success();
                setTimeout(() =>
            {
                refetchTests();
                onClose();
            }, 1300);
            }
        }catch(e)
        {
            errorT();
        }
    }

    const getSubjects = async() => mySubjects;

    const handleInputChange = value => {
        setValue(value);
    };

    const handleChange = value => {
        setSubject(value);
        setSelectedValue(value);
    }

    const stopPropagation = (e) => {
        e.stopPropagation();
    };

    const success = () => {
        toast.success('Test has been successfully created!', {
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
        toast.error('Error while creating the test', {
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

    const customStyles = {
        menu: provided => ({
            ...provided,
            maxHeight: '100px', // Set max height for scrolling
            overflowY: 'auto', // Enable vertical scrolling
          }),
        control: (provided, state) => ({
          ...provided,
          width: '200px', // Set width to 100%,
          marginTop: '0px',
          border: '1px solid #ced4da',
          borderRadius: '8px',
          borderColor: state.isFocused || state.isActive ? '#f6f6f6 !important' : '#f6f6f6 !important',
          borderWidth: '0px !important', // Set border width to 1px
          padding: '0',
          backgroundColor: '#f6f6f6 !important',
          color: '#747474',
          fontSize: '15px',
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



      if (!open)
      return null;

    return (
        <div onClick={onClose} className={visible ? 'overlay' : 'overlay hidden'}>
            <div className={styles.modalContainer} onClick={stopPropagation}>
                <div className={styles.modalRight}>
                    <form onSubmit={mode === 0 ? handleCreateTest : handleEditTest}>
                    <div className={styles.add_inst_rep_hg}>
                        <span>{mode !== 1 ? "Create Test" : "Edit Test"}</span>
                    </div>
        
                        <div className={styles.content}>
                        
                            <div className={styles.input_area}>
                        
                                    <div className={styles.username_area}>
                                        <label htmlFor={styles.username}>Name</label>
                                        <input className={styles.input}
                                            placeholder="Name of the Test"
                                            type="text"
                                            name='tname'
                                            id='tname'
                                            value={testName}
                                            onChange={(e) => setTestName(e.target.value)}
                                            required
                                            autoComplete="off"/>
                                    </div>
                    

                                <div className={styles.area}>
                                    <label htmlFor={styles.password}>Notes (Optional)</label>
                                    <input
                                        className={styles.input}
                                        type="text"
                                        name='notes'
                                        id='notes'
                                        value={notes}
                                        onChange={(e) => {
                                            setNotes(e.target.value);
                                        }}
                                        required
                                        autoComplete="off"/>
                                </div>
                                

                                <div className={styles.area}>
                                    <label htmlFor={styles.password}>Instructions</label>
                                    <input
                                        className={styles.input}
                                        type="text"
                                        name='instructions'
                                        id='instructions'
                                        value={instructions}
                                        onChange={(e) => {
                                            setInstructions(e.target.value);
                                        }}
                                        required
                                        autoComplete="off"/>
                                </div>

                                <div className={styles.group}>

                                    <div className={styles.area}>
                                        <label htmlFor={styles.password}>Maximum Score</label>
                                        <input
                                            className={styles.input}
                                            type="text"
                                            style={{ flex: '1' }}
                                            name='maxscore'
                                            id='maxscore'
                                            value={maxScore}
                                            onChange={(e) => {
                                                setMaxScore(e.target.value);
                                            }}
                                            required
                                            autoComplete="off"/>
                                    </div>

                                    <div className={styles.area}>
                                        <label htmlFor={styles.password}>Subject</label>
                                        <AsyncSelect
                                            defaultOptions
                                            value={subject}
                                            getOptionLabel={e => e.name}
                                            getOptionValue={e => e.id}
                                            loadOptions={getSubjects}
                                            onInputChange={handleInputChange}
                                            onChange={handleChange}
                                            styles={customStyles}
                                            menuPortalTarget={document.body}
                                            isClearable={true}
                                            isRequired={true} 
                                        />
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className={styles.btn_container}>
                            <button type='submit' className={styles.add_btn}>
                                <span>Confirm</span>
                            </button>
                            <button onClick={() => {onClose();}} className={styles.cancel_btn}>
                                <span>Cancel</span>
                            </button>
                        </div>
               
                    </form>
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

export default CreateEditTest;