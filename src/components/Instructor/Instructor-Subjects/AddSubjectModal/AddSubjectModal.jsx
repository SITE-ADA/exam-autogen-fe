import React, { useEffect, useState } from 'react';
import styles from './AddSubjectModal.module.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-toastify/dist/ReactToastify.min.css';
import AsyncSelect from 'react-select/async';
import { msAuthApi } from '../../../../Services/AxiosService';
import { useMySubjectsContext } from '../../../../Context/MySubjectsContext';
import { createSubject } from '../../../../Services/ms_auth/SubjectService';
const AddSubjectModal = ({ open, onClose }) => {


    const [subjectName, setSubjectName] = useState("");
    const [crn, setCrn] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState(1);
    const [courseObjectives, setCourseObjectives] = useState([])
    const [term, setTerm] = useState("");
    const userId = JSON.parse(localStorage.getItem("user"))?.user.id;
    const [visible, setVisible] = useState(false);
    const [inputValue, setValue] = useState('');
    const [selectedValue, setSelectedValue] = useState(null);
    // handle input change event

    const clearFields = () => {
        setSubjectName("");
        setCrn("");
        setDescription("");
        setStatus(1);
        setCourseObjectives("");
        setTerm("");
    }

    const {refetchMySubjects} = useMySubjectsContext();

    const handleDropdownListChange = (e) => {
        e.stopPropagation();
        setStatus(e.target.value);
        console.log(status);
    }

    useEffect(() => {
        console.log("fwwefwe");
    }, []);

    const handleInputChange = value => {
        setValue(value);
    };
   
    const handleAddSubject = async(event) =>
    {   let response;
        event.preventDefault();
        try {
             response = await createSubject(courseObjectives, crn, term, status, description,subjectName, userId);
             console.log(status + "wefoiwejf");
                if (response.status === 200 || response.status === 201) {
                    success();
                    setVisible(true);
                    refetchMySubjects();
                    setTimeout(() => {
                        setVisible(false);
                    }, 3000); // Keep modal visible for 5 seconds
                    //TO DO
                    // set the states to their default values
                    clearFields();
                }
            }
        catch(error)
        {
            if (error) {
                console.log(error);
                console.log(response)
                errorT();
            }
        }
    }

    const stopPropagation = (e) => {
        e.stopPropagation();
    };

    const success = () => {
        toast.success('Subject has successfully been created!', {
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
        toast.error('Try entering different crn, subject name', {
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

    if (!open)
        return null;

    return (
        <div onClick={onClose} className={visible ? 'overlay' : 'overlay hidden'}>
            <div className={styles.modalContainer} onClick={stopPropagation}>
                <div className={styles.modalRight}>
                    <form onSubmit={handleAddSubject}>
                    <div className={styles.add_subject_hg}>
                        <span>Add Subject</span>
                    </div>
                    <div className={styles.content}>
                       
                        <div className={styles.input_area}>
                        <div className={styles.group_usr_email}>
                                <div className={styles.area}>
                                    <label htmlFor={styles.username}>Subject Name</label>
                                    <input className={styles.input}
                                           placeholder="Subject Name"
                                           type="text"
                                           name='subjectname'
                                           id='subjectname'
                                           value={subjectName}
                                           onChange={(e) => setSubjectName(e.target.value)}
                                           required
                                           autoComplete="off"/>
                                </div>
                       
            
                                    <div className={styles.area}>
                                        <label>Term</label>
                                        <input className={styles.input}
                                            placeholder="Term"
                                            type="text"
                                            name='term'
                                            id='term'
                                            value={term}
                                            onChange={(e) => setTerm(e.target.value)}
                                            required
                                            autoComplete="off"
                                            />
                                    </div>

                                    <div className={styles.area}>
                                        <label>CRN</label>
                                        <input className={styles.input}
                                            placeholder="CRN"
                                            type="text"
                                            name='crn'
                                            id='crn'
                                            value={crn}
                                            onChange={(e) => setCrn(e.target.value)}
                                            required
                                            autoComplete="off"  
                                            />
                                    </div>
                                </div>

                            <div className={styles.group_usr_email}>
                            <div className={styles.area}>
                                <label>Course Objectives</label>
                                <textarea 
                                       className={styles.input}
                                       name='courseObjectives' 
                                       id='courseObjectives'
                                       value={courseObjectives}
                                       onChange={(e) => {setCourseObjectives(e.target.value); }}
                                       >
                                </textarea>
                            </div>

                            <div className={styles.area}>
                                <label htmlFor={styles.password}>Description</label>
                                <textarea 
                                       className={styles.input}
                                       name='description' 
                                       id='description'
                                       value={description}
                                       onChange={(e) => {setDescription(e.target.value); }}
                                       >
                                </textarea>
                            </div>
                            </div>
                            <div className={styles.area}>
                                <label htmlFor={styles.rep_password}>Status</label>
                                <div className={styles.dropdown_list}>
                                    <select onChange={(e) => handleDropdownListChange(e)}>
                                        <option value="1">Active</option>
                                        <option value="0">InActive</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.btn_container}>
                        <button type='submit' className={styles.add_btn}>
                            <span>Add</span>
                        </button>
                        <button onClick={() => {onClose(); clearFields();}} className={styles.cancel_btn}>
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

export default AddSubjectModal;