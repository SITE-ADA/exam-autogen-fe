import React, { useState } from 'react';
import styles from './AddInstRepInstructorModal.module.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-toastify/dist/ReactToastify.min.css';
import { useUserContext } from '../../../Context/UserContext';
import { createUser } from '../../../Services/ms_auth/UserService';
import { msAuthApi } from '../../../Services/AxiosService';
import { useInstructorsContext } from '../../../Context/InstructorsContext';

const AddInstRepInstructorModal = ({ open, onClose }) => {


    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [phonenumber, setPhonenumber] = useState("");
    const [institution, setInstitution] = useState("");
    const [password, setPassword] = useState("");
    const [repPassword, setRepPassword] = useState("");
    const [visible, setVisible] = useState(false);
    const institutionId = JSON.parse(localStorage.getItem("user"))?.user.institution.id;
    const {data, refetchInstructors} = useInstructorsContext();

    const [inputValue, setValue] = useState('');
    const [selectedValue, setSelectedValue] = useState(null);
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

    const handleAddInstructor = async(event) =>
    {
        event.preventDefault();
        var confirm_password = document.getElementById("rep-password");
        if (password !== repPassword) {
            confirm_password.setCustomValidity("Passwords Don't Match");
        } else {
        try {
            const response = await createUser(username, email, phonenumber, password, 5, institutionId);
                if (response.status === 200 || response.status === 201) {
                    success();
                    setVisible(true);
                    refetchInstructors();
                    setTimeout(() => {
                        setVisible(false);
                    }, 3000); // Keep modal visible for 5 seconds
                    setEmail("")
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
                    <form onSubmit={handleAddInstructor}>
                    <div className={styles.add_inst_rep_hg}>
                        <span>Add Instructor</span>
                    </div>
                    <div className={styles.content}>
                       
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
                                <label htmlFor={styles.email}>Email</label>
                                <input placeholder="Email address"
                                       className={styles.input}
                                       type="email"
                                       name='email'
                                       id='email'
                                       value={email}
                                       onChange={(e) => {
                                           setEmail(e.target.value);
                                       }}
                                       required
                                       autoComplete="off"/>
                            </div>

                            <div className={styles.area}>
                                <label htmlFor={styles.phone}>Phone Number</label>
                                <input placeholder="Phone number"
                                       className={styles.input}
                                       type="text"
                                       name='phonenumber'
                                       id='phonenumber'
                                       value={[phonenumber]}
                                       onChange={(e) => {
                                           setPhonenumber(e.target.value);
                                       }}
                                       required
                                       autoComplete="off"/>
                            </div>

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
                            </div>
                        </div>
                    </div>
                    <div className={styles.btn_container}>
                        <button type='submit' className={styles.add_btn}>
                            <span>Add</span>
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

};

export default AddInstRepInstructorModal;