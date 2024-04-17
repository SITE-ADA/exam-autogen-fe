import React, { useEffect, useState } from 'react';
import styles from './EditSubjectModal.module.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-toastify/dist/ReactToastify.min.css';
import { useQuery } from '@tanstack/react-query';
import { getSubject, putSubject } from '../../../../Services/ms_auth/SubjectService';
import { useMySubjectsContext } from '../../../../Context/MySubjectsContext';
import { msQuestionApi } from '../../../../Services/AxiosService';

const EditSubjectModal = ({ open, onClose, id, rerender, setRerender }) => {


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
    const [shouldRefetch, setShouldRefetch] = useState(false);
    const [nameAvailable, setNameAvailable] = useState(false);
    const [crnAvailable, setCrnAvailable] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    // handle input change event

    const {mySubjects, refetchMySubjects} = useMySubjectsContext();

    const handleDropdownListChange = (e) => {
        e.stopPropagation();
        setStatus(e.target.value);
        console.log(status);
    }

    const handleInputChange = value => {
        setValue(value);
    };
   
    const {data, refetch} = useQuery({
        queryKey: ['subject'],
        queryFn: async() => {
            try {
                const response = await getSubject(id);
                if(response.status === 401 || response.status === 400 || response.status === 403 || response.status === 404)
                {
                    errorT("Error while retrieving the subject information");
                } else {
                    setSubjectName(response.data.name);
                    setCrn(response.data.crn);
                    setDescription(response.data.description);
                    setStatus(response.data.subjectStatusId)
                    setCourseObjectives(response.data.courseObjectives);
                    setTerm(response.data.term);
                    return response;
                }
            }catch(e){

            }
        },
        enabled: shouldRefetch
    })

    
    const checkAvailability = () => {
        setNameAvailable(mySubjects.some((mysubject) => mysubject.name === subjectName));
        setCrnAvailable(mySubjects.some((mysubject) => mysubject.crn === crn));
        console.log(nameAvailable);
        console.log(crnAvailable);
        let msg = 'Try entering different ';
        if(nameAvailable)
        {
            msg = msg + "subject name"
        }
        if(crnAvailable)
        {
            msg = msg + ", crn"
        }
        setErrorMsg(msg);
        return nameAvailable || crnAvailable;
    }

    const handleEditSubject = async(event) => {
        event.preventDefault();
    try {
    const response = await putSubject(id, courseObjectives, crn, term, status, description,subjectName, userId);
    if (response.status === 200)
    {
        success();
        refetchMySubjects();
        setSubjectName(response.data.name);
        setCrn(response.data.crn);
        setDescription(response.data.description);
        setStatus(response.data.subjectStatusId)
        setCourseObjectives(response.data.courseObjectives);
        setTerm(response.data.term);
    }
}catch(e)
{
    errorT("Error updating subject...")
}
}

    useEffect(() => {
        if(rerender)
        {
            refetch();
        } 
        if(data)
        {
            setShouldRefetch(false);
        }

    }, [rerender]);

    const stopPropagation = (e) => {
        e.stopPropagation();
    };

    const success = () => {
        toast.success('Subject has successfully been edited!', {
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

    if (!open)
        return null;

    return (
        <div onClick={onClose} className={visible ? 'overlay' : 'overlay hidden'}>
            <div className={styles.modalContainer} onClick={stopPropagation}>
                <div className={styles.modalRight}>
                    <form onSubmit={handleEditSubject}>
                    <div className={styles.add_subject_hg}>
                        <span>Edit Subject</span>
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
                            <span>Confirm</span>
                        </button>
                        <button onClick={() => {onClose(); setRerender(false);}} className={styles.cancel_btn}>
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

export default EditSubjectModal;