import React, { useState, useEffect } from 'react';
import styles from '../AddInstRepModel/AddInstRepModal.module.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-toastify/dist/ReactToastify.min.css';
import { useUserContext } from '../../../../Context/UsersContext';
import { createUser, getUser, patchUser } from '../../../../Services/ms_auth/UserService';
import AsyncSelect from 'react-select/async';
import { msAuthApi } from '../../../../Services/AxiosService';
import { useQuery } from '@tanstack/react-query';

const CreateEditInstRepModal = ({ open, onClose, mode, id, rerender, setRerender  }) => {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [phonenumber, setPhonenumber] = useState("");
    const [institution, setInstitution] = useState("");
    const [institutions, setInstituions] = useState([])
    const [password, setPassword] = useState("");
    const [repPassword, setRepPassword] = useState("");
    const [visible, setVisible] = useState(false);
    const [resetPassword, setResetPassword] = useState(false)
    const {refetchUsers} = useUserContext();
    const [inputValue, setValue] = useState('');
    const [selectedValue, setSelectedValue] = useState(null);
    const [shouldRefetch, setShouldRefetch] = useState(false);
    // handle input change event
    const handleInputChange = value => {
        setValue(value);
    };

    const fetchInstitutions = () => 
    {
      return msAuthApi.get('/institution').then((response) =>
      {
        const res = response.data;
        return res;
      });
    }

    

  // handle selection
    const handleChange = value => {
        setInstitution(value);
        setSelectedValue(value);
    }

    const customStyles = {
        menu: provided => ({
            ...provided,
            maxHeight: '100px', // Set max height for scrolling
            overflowY: 'auto', // Enable vertical scrolling
          }),
        control: (provided, state) => ({
          ...provided,
          width: '100%', // Set width to 100%,
          marginTop: '5px',
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

    const {data, refetch, isLoading, error} = useQuery({
        queryKey: ['user'],
        queryFn: async() =>
        {
            
            try {
               const responseUser = await getUser(id);
                if(responseUser.status === 401 || responseUser.status === 400 || responseUser.status === 403 || responseUser.status === 404)
                {
                    errorT("Error while retrieving the institution representative information");
                } else {
                    setUsername(responseUser.data.username);
                    setInstitution(responseUser.data.institution);
                }
            }catch(e)
            {
                
            }
        },
        enabled: shouldRefetch
    });

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

    const handleEditInstitutionRep = async(event) =>
    {
        event.preventDefault();

        try {
            const response = await patchUser(id, username, institution.id);
            if(response.status === 200)
            {
                success("Institution Representative successfully updated!")
                refetchUsers();
            }
        } catch(e)
        {
            errorT("Error occurred while updating");
        }
    }

    const handleAddInstitutionRep = async(event) =>
    {
        event.preventDefault();
        var confirm_password = document.getElementById("rep-password");
        if (password !== repPassword) {
            confirm_password.setCustomValidity("Passwords Don't Match");
        } else {
        try {
            const response = await createUser(username, password, 2, institution.id);
                if (response.status === 200 || response.status === 201) {
                    success();
                    setVisible(true);
                    refetchUsers();
                    setTimeout(() => {
                        setVisible(false);
                    }, 3000); // Keep modal visible for 5 seconds
                    setEmail("")
                    setInstitution("")
                    setPassword("")
                    setPhonenumber("")
                    setRepPassword("")
                    setUsername("");
                }
            }
        catch(error)
        {
            if (error) {
                console.log(error);
                errorT();
            }
        }
    }
    }

    const stopPropagation = (e) => {
        e.stopPropagation();
    };

    const success = () => {
        toast.success('User has successfully been created!', {
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


    if (!open)
        return null;

    return (
        <div onClick={onClose} className={visible ? 'overlay' : 'overlay hidden'}>
            <div className={styles.modalContainer} onClick={stopPropagation}>
                <div className={styles.modalRight}>
                    <form onSubmit={mode === 0 ? handleAddInstitutionRep : handleEditInstitutionRep}>
                    <div className={styles.add_inst_rep_hg}>
                        <span>{mode !== 1 ? "Add Institution Representative" : "Edit Institution Representative"}</span>
                    </div>
        
                        <div className={mode !== 1 ? styles.content : styles.content_in_edit}>
                        
                            <div className={styles.input_area}>
                        
                                    <div className={styles.username_area}>
                                        <label htmlFor={styles.username}>Username</label>
                                        <input className={styles.input}
                                            placeholder="Username"
                                            type="text"
                                            name='username'
                                            id='username'
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                            required
                                            autoComplete="off"/>
                                    </div>
                        
                                <div className={styles.area}>
                                    <label>Institution</label>
                                    <AsyncSelect
                                        defaultOptions
                                        value={institution}
                                        getOptionLabel={e => e.institutionName}
                                        getOptionValue={e => e.id}
                                        loadOptions={fetchInstitutions}
                                        onInputChange={handleInputChange}
                                        onChange={handleChange}
                                        styles={customStyles}
                                        menuPortalTarget={document.body}
                                        isClearable={true}
                                        isRequired={true} 
                                        />
                                </div>
                                {mode !== 1 ? ( <>
                                <div className={styles.area}>
                                    <label htmlFor={styles.password}>Password</label>
                                    <input placeholder="Password"
                                        className={styles.input}
                                        type="password"
                                        name='password'
                                        id='password'
                                        value={password}
                                        onChange={(e) => {
                                            setPassword(e.target.value);
                                        }}
                                        required
                                        autoComplete="off"/>
                                </div>
                                <div className={styles.area}>
                                    <label htmlFor={styles.rep_password}>Repeat Password</label>
                                    <input placeholder="Repeat password"
                                        className={styles.input}
                                        type="password"
                                        name='rep-password'
                                        id='rep-password'
                                        value={repPassword}
                                        onChange={(e) => {
                                            setRepPassword(e.target.value)
                                        }}
                                        required
                                        autoComplete="off"/>
                                </div> </>) : ''}

                                <div className={styles.area}>
                                    
                                    <input placeholder="Reset password"
                                        type="checkbox"
                                        name='reset-password'
                                        id='reset-password'
                                        value={resetPassword}
                                        onChange={(e) => {
                                            setResetPassword(e.target.value)
                                        }}
                                        autoComplete="off"/>
                                    <label className={styles.reset_password} htmlFor={'reset-password'} >Reset Password</label>
                                </div>
                            </div>
                        </div>
                        <div className={styles.btn_container}>
                            <button type='submit' className={styles.add_btn}>
                                <span>Add</span>
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

};

export default CreateEditInstRepModal;