import React, { useEffect, useState } from 'react';
import styles from './AddInstRepModal.module.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-toastify/dist/ReactToastify.min.css';
import { useMutation } from '@tanstack/react-query';

const baseURL = "http://localhost:8080/api/v1/auth/";

const AddInstRepModal = ({ open, onClose, refetch }) => {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [phonenumber, setPhonenumber] = useState("");
    const [institution, setInstitution] = useState("");
    const [password, setPassword] = useState("");
    const [repPassword, setRepPassword] = useState("");
    const [visible, setVisible] = useState(false);

    const addNewInstitutionRepresentative = async() =>
    {
        const response = await axios.post(baseURL + "register", {
            "username": username,
            "email": email,
            "phone": phonenumber,
            "password": password
        });

        return response;
    }

    const mutation = useMutation({mutationFn: addNewInstitutionRepresentative})

    const handleAddInstitutionRep = async(event) =>
    {
        event.preventDefault();
        var confirm_password = document.getElementById("rep-password");
        if (password !== repPassword) {
            confirm_password.setCustomValidity("Passwords Don't Match");
        } else {
        try {
            const response = await mutation.mutateAsync({username, email, phonenumber, password})
                if (response.status === 200 || response.status === 201) {
                    success();
                    setVisible(true);
                    refetch();
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
                console.log(error)
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
                    <form onSubmit={handleAddInstitutionRep}>
                    <div className={styles.add_inst_rep_hg}>
                        <span>Add Institution Representative</span>
                    </div>
                    <div className={styles.content}>
                       
                        <div className={styles.input_area}>
                            <div className={styles.group_usr_email}>
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
                                <div className={styles.email_area}>
                                    <label htmlFor={styles.email}>Email</label>
                                    <input placeholder="Email"
                                           className={styles.input}
                                           type="email"
                                           name='email'
                                           id='email'
                                           value={email}
                                           onChange={(e) => setEmail(e.target.value)}
                                           required
                                           autoComplete="off"/>
                                </div>
                            </div>
                            <div className={styles.area}>
                                <label htmlFor={styles.phonenumber}>Phone Number</label>
                                <input placeholder="Phone number"
                                       className={styles.input}
                                       type="tel"
                                       name='phonenumber' 
                                       id='phonenumber'
                                       value={phonenumber}
                                       onChange={(e) => setPhonenumber(e.target.value)}
                                       required
                                       autoComplete="off"/>
                            </div>
                            <div className={styles.area}>
                                <label htmlFor={styles.institution}>Institution</label>
                                <input placeholder="Institution"
                                       className={styles.input}
                                       type="text"
                                       name='institution'
                                       id='institution'
                                       value={institution}
                                       onChange={(e) => setInstitution(e.target.value)}
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
                                           console.log(password)
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
                                        console.log(repPassword)
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

export default AddInstRepModal;