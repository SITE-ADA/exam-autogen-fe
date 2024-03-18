import React, { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import styles from './CreateEditPoolModal.module.css';
import { createQuestionPool, getPoolById } from "../../../../Services/ms_question/QuestionService";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-toastify/dist/ReactToastify.min.css';
import AsyncSelect from 'react-select/async';
import { msQuestionApi } from "../../../../Services/AxiosService";
import { getSubjectById } from "../../../../Services/ms_question/SubjectService";
import { editQuestionPool } from "../../../../Services/ms_question/QuestionPoolService";
import { usePoolContext } from "../../../../Context/PoolsContext";

const CreateEditPoolModal = ({ open, onClose, mode, id }) =>
{
    const [subjects, setSubjects] = useState([]);
    const [description, setDescription] = useState('');
    const [subject, setSubject] = useState('');
    const [visible, setVisible] = useState(false);
    const [poolName, setPoolName] = useState('');


    const user = JSON.parse(localStorage.getItem("user"))?.user;
    const userId = user.id;

    const {refetchPools} = usePoolContext();

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

    const [inputValue, setValue] = useState('');
    const [selectedValue, setSelectedValue] = useState(null);
    // handle input change event
    const handleInputChange = value => {
        setValue(value);
    };

  // handle selection
  const handleChange = value => {
    console.log(value);
    setSubject(value);
    setSelectedValue(value);
  }
      const fetchSubjects = () => {
        return msQuestionApi.get('/subject').then((result) =>
        {
            const res = result.data;
            return res;
        })
    }

    const {data, refetch, isLoading, error} = useQuery({
        queryKey: ['pool'],
        queryFn: async() =>
        {
            try {
                const responsePool = (await getPoolById(id));
                console.log(id + " " + responsePool);
                if(responsePool.status === 401 || responsePool.status === 400 || responsePool.status === 403 || responsePool.status === 404)
                {
                    errorT("Error while retrieving the question pool information");
                }
                else {
                try {
                    const pool = responsePool.data;
                    setPoolName(pool.name); 
                    setDescription(pool.description);
                    const responseSubject = (await getSubjectById(pool.subjectId));
                    if(responseSubject.status === 401 || responseSubject.status === 400 || responseSubject.status === 403 || responseSubject.status === 404)
                    {
                        errorT("Error while retrieving the subject information");
                    }
                    else
                    {
                        setSubject(responseSubject.data)
                        setSelectedValue(responseSubject.data);
                        console.log(subject);
                        console.log(selectedValue);
                        return {poolName, description, subject};
                    }

                    
                    
                } catch(error)
                {

                }
            }
            }catch(error)
            {

            }
        }
    });

    const prevIdRef = useRef();
   
    useEffect(() =>
    {
        setPoolName('');
        setDescription('');
        setSubject(null);
        setSelectedValue(null);
        console.log("mode = " + mode)
        if(prevIdRef.current !== id)
        {
            prevIdRef.current = id;
            refetch();

        }
    }, [id, refetch])

    const handleClear = () => {
        setSubject(null);
    }

    const handleAddQuestionPool = async(event) => {
        event.preventDefault();
        if(poolName === '' || selectedValue === null)
        {
            errorT("Pool name and subject must be provided!");
        }
        else {
            try {
                console.log(poolName + " " + description + " " + subject.id + " " + userId);
                const response = await createQuestionPool(poolName, description, subject.id, userId);
                if(response.status === 200 || response.status === 201)
                {
                    console.log("Question Pool Created")
                    refetchPools();
                    success("Question pool successfully added!")
                    setPoolName('');
                    setDescription('');
                    setSubject(null);
                    setSelectedValue(null);
                }
                else
                {
                    errorT("Error occured when creating");
                }
            }
            catch(error)
            {
                
                errorT('Unknown error occurred' + error);
            }
        }
    };

    const handleEditPool = async(event) =>
    {
        event.preventDefault();
        if(poolName === '' || selectedValue === null)
        {
            errorT("Pool name and subject must be provided!");
        }
        else {
            try {
                console.log(poolName + " " + description + " " + subject.id + " " + userId);
                const response = await editQuestionPool(id, poolName, description, subject.id);
                if(response.status === 200 || response.status === 201)
                {
                    console.log("Question Pool Edited!")
                    refetchPools();
                    success("Question pool information successfully edited!")
                }
                else
                {
                    errorT("Error occured when creating");
                }
            }
            catch(error)
            {
                errorT('Unknown error occurred');
            }
        }
    }

    
    
    // console.log(useParams());
    // true - Create, false - Edit 
    const isCreateOrEdit = mode === 0 ? true : false;

    const getPool = async() =>
        {
            /*const response = await getPoolById(poolId);
            const pool = response.data;
            setPoolName(pool.name);
            setDescription(pool.description);
            setSubject(pool.subjectId);
            setUser(pool.userId); */    
        }

    if(!isCreateOrEdit)
    {
        getPool();
    }

    const stopPropagation = (e) => {
        e.stopPropagation();
    };

    const success = (message) => {
        toast.success(message, {
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

    const errorT = (message) => {
        toast.error(message, {
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
                    <form onSubmit={mode !== 1 ? handleAddQuestionPool : handleEditPool}>
                    <div className={styles.add_inst_rep_hg}>
                        {(isCreateOrEdit ? <span>Create Question Pool</span> : <span>Edit Question Pool</span>)}
                    </div>
                    <div className={styles.content}>
                       
                        <div className={styles.input_area}>
                            
                                <div className={styles.username_area}>
                                    <label htmlFor={styles.username}>Name</label>
                                    <input className={styles.input}
                                           placeholder="Name of the Question Pool"
                                           type="text"
                                           name='poolname'
                                           id='poolname'
                                           value={poolName}
                                           onChange={(e) => {setPoolName(e.target.value)}}
                                           autoComplete="off"/>
                                </div>
       
                                <br />
                
                                <label >Description (Optional)</label>
                                <textarea 
                                       className={styles.input}
                                       name='description' 
                                       id='description'
                                       value={description}
                                       onChange={(e) => {setDescription(e.target.value); }}
                                       >
                                </textarea>
                     
                                <br />
                            
                                <label htmlFor="">Subject</label>

                                <AsyncSelect
                                defaultOptions
                                value={subject}
                                getOptionLabel={e => e.name}
                                getOptionValue={e => e.id}
                                loadOptions={fetchSubjects}
                                onInputChange={handleInputChange}
                                onChange={handleChange}
                                styles={customStyles}
                                menuPortalTarget={document.body}
                                isClearable={true}
                                isRequired={true} // Mark the Select as required
                            />
                        
                            
                        </div>
                    </div>
                    <div className={styles.btn_container}>
                        <button type='submit' className={styles.add_btn}>
                            <span>Add</span>
                        </button>
                        <button onClick={() => {onClose();}} className={styles.cancel_btn}>
                            <span>Cancel</span>
                        </button>
                    </div>
                    </form>

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

export default CreateEditPoolModal;