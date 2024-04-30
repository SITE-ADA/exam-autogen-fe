import React, { useState } from "react";
import styles from './CreateEditGenerateTestModal.module.css';
import { ToastContainer, toast } from "react-toastify";
import AsyncSelect from 'react-select/async';
import { useTestsContext } from "../../../../../Context/TestsContext";
import { createGeneratedTest } from "../../../../../Services/ms_test/TestService";
import { useGeneratedTestsContext } from "../../../../../Context/GeneratedTestsContext";

export const CreateEditGenerateTestModal = ({open, onClose, mode, id}) => {
    const [visible, setVisible] = useState(false);
    const [nbVariants, setNbVariants] = useState(0);
    const [nbExaminees, setNbExaminees] = useState(0);
    const [testName, setTestName] = useState("");
    const [date, setDate] = useState("");
    const [inputValue, setValue] = useState('');
    const [selectedValue, setSelectedValue] = useState(null);
    const {tests, refetchTests} = useTestsContext();
    
    const stopPropagation = (e) => {
        e.stopPropagation();
    };
    const [sourceTest, setSourceTest] = useState();
    const {gtests, refetchGTests} = useGeneratedTestsContext();

    const customStyles = {
        menu: provided => ({
            ...provided,
            maxHeight: '100px', // Set max height for scrolling
            overflowY: 'auto', // Enable vertical scrolling
          }),
        control: (provided, state) => ({
          ...provided,
          width: '100%', // Set width to 100%,
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

    const handleInputChange = value => {
        setValue(value);
    };

    const fetchTests = async() => tests;

    const handleChange = value => {
        setSourceTest(value);
        setSelectedValue(value);
    }

    const convertDateFormat = (dateString) => {
        
        const parts = dateString.split('-');
      
        const rearrangedDate = `${parts[2]}-${parts[1]}-${parts[0]}`;
    
        return rearrangedDate;
    }

    const success = () => {
        toast.success('Generated test has successfully been created!', {
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
        toast.error('Error while creating the generated test!', {
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

    const handleCreateGTest = async(event) => {
        event.preventDefault();
        try {
            const response = await createGeneratedTest(testName, nbExaminees, nbVariants, sourceTest.id, convertDateFormat(date));
            if(response.status === 201)
            {
                success();
                setTimeout(() =>
            {
                refetchGTests();
                onClose();
            }, 1300);
            }
        }catch(e)
        {

        }
    }

    const handleEditGTest = () => {

    }

    if(!open)
        return null;
    return (
        <div onClick={onClose} className={visible ? 'overlay' : 'overlay hidden'}>
            <div className={styles.modalContainer} onClick={stopPropagation}>
                <div className={styles.modalRight}>
                    <form onSubmit={mode === 1 ? handleEditGTest : handleCreateGTest}>
                    <div className={styles.add_inst_rep_hg}>
                        <span>{mode === 1 ? "Edit Generated Test" : "Create Generated Test"}</span>
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
                                    <label>Choose the test</label>
                                    <AsyncSelect
                                        defaultOptions
                                        value={sourceTest}
                                        getOptionLabel={e => e.name}
                                        getOptionValue={e => e.id}
                                        onInputChange={handleInputChange}
                                        loadOptions={fetchTests}
                                        onChange={handleChange}
                                        styles={customStyles}
                                        menuPortalTarget={document.body}
                                        isClearable={true}
                                        isRequired={true} 
                                        />
                                </div>

                            <div className={styles.area}>
                                        <label htmlFor={styles.email}>Date</label>
                                        <input 
                                            className={styles.input}
                                            type="date"
                                            name='date'
                                            id='date'
                                            value={date}
                                            onChange={(e) => {
                                                setDate(e.target.value);
                                            }}
                                            required
                                            autoComplete="off"/>
                                </div>

                            <div className={styles.group_usr_email}> 
                                <div className={styles.area}>
                                    <label htmlFor={styles.email}>Number of Variants</label>
                                    <input 
                                        className={styles.input}
                                        type="text"
                                        name='nb_variants'
                                        id='nb_variants'
                                        value={nbVariants}
                                        onChange={(e) => {
                                            setNbVariants(e.target.value);
                                        }}
                                        required
                                        autoComplete="off"/>
                                </div>
                                <div className={styles.area}>
                                    <label htmlFor={styles.email}>Number of Examinees</label>
                                    <input 
                                        className={styles.input}
                                        type="text"
                                        name='nb_examinees'
                                        id='nb_examinees'
                                        value={nbExaminees}
                                        onChange={(e) => {
                                            setNbExaminees(e.target.value);
                                        }}
                                        required
                                        autoComplete="off"/>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className={styles.btn_container}>
                        <button type='submit' className={styles.add_btn}>
                            <span>Save</span>
                        </button>
                        <button onClick={onClose} className={styles.cancel_btn}>
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