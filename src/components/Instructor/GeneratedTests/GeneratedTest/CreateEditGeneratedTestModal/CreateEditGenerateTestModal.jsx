import React, { useState } from "react";
import styles from './CreateEditGenerateTestModal.module.css';
import { ToastContainer } from "react-toastify";
import AsyncSelect from 'react-select/async';

export const CreateEditGenerateTestModal = ({open, onClose, mode, id}) => {
    const [visible, setVisible] = useState(false);
    const [nbVariants, setNbVariants] = useState(0);
    const [nbExaminees, setNbExaminees] = useState(0);
    const [testName, setTestName] = useState("");
    const [inputValue, setValue] = useState('');
    const [selectedValue, setSelectedValue] = useState(null);

    const stopPropagation = (e) => {
        e.stopPropagation();
    };
    const [sourceTest, setSourceTest] = useState({id: 1, name:"Test1"});

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

    const handleChange = value => {
        setSourceTest(value);
        setSelectedValue(value);
    }

    const handleCreateGTest = () => {

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
                                    onChange={handleChange}
                                    styles={customStyles}
                                    menuPortalTarget={document.body}
                                    isClearable={true}
                                    isRequired={true} 
                                    />
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