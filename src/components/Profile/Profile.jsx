import React, { useState } from "react";
import styles from './Profile.module.css';
import { useQuery } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { getUser, getUserDetails } from "../../Services/ms_auth/UserService";

export const Profile = () => {
    const [activeIndex, setActiveIndex] = useState(1);

    const handleItemClick = (index) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
    };

    const user = JSON.parse(localStorage.getItem("user"))?.user;
    const navigate = useNavigate();
    const rootPath = useLocation().pathname.split("/")[1];

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [addressId, setNewAddressId] = useState('');
    const [contactId, setNewContactId] = useState('');
    const [newPasswordRepeat, setNewPasswordRepeat] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [street, setStreet] = useState('');
    const [zip, setZip] = useState('');
    const [primaryEmail, setPrimaryEmail] = useState('');
    const [primaryPhone, setPrimaryPhone] = useState('');
    const [secondaryEmail, setSecondaryEmail] = useState('');
    const [secondaryPhone, setSecondaryPhone] = useState('');
    const [dob, setDob] = useState('');

    const {data, error, isLoading, refetch} = useQuery({
        queryKey: ['currentUser'],
        queryFn: async() => {
            try {
               const response = await getUserDetails(user.id);
               console.log(response.data);
            }catch(e)
            {

            }
        }
    });

    const NavigateToMain = () => {
        navigate(`/${rootPath}`);
    }

    const descryptPassword = () => {

    };

    return (
        <div className={styles.profile}>
            <div className={styles.profile_heading}>
                <h1>Account Profile</h1>
            </div>
            <main className={styles.general_information}>

            <div key={1} className={styles.accordion_item}>
                    <div className={styles.accordion_title} onClick={() => handleItemClick(1)}>
                        <div>Bio</div>
                        <div>{activeIndex === 1 ? '-' : '+'}</div>
                </div>
                {activeIndex === 1 && <div className={styles.accordion_content}>
                    <div className={styles.input_fields}>
                        <div className={styles.input_area}>
                            <label htmlFor="">First Name</label>
                                <br />
                                <input 
                                    type="text"
                                    className={styles.input}
                                    name="first_name"
                                    id="first_name"
                                    value={firstName}
                                    onChange={(event) => setFirstName(event.target.value)} />
                        </div>
                        <div className={styles.input_area}>
                            <label htmlFor="">Last Name</label>
                            <br />
                            <input 
                                type="text"
                                className={styles.input}
                                name="last_name"
                                id="last_name"
                                value={lastName}
                                onChange={(event) => setLastName(event.target.value)} />
                        </div>
                        <div className={styles.input_area}>
                            <label htmlFor="">Date of Birth</label>
                                <br />
                                <input 
                                    type="date"
                                    className={styles.input}
                                    name="dob"
                                    id="dob"
                                    value={dob}
                                    onChange={(event) => setDob(event.target.value)} />
                        </div>
                    </div>
                </div>
}
            </div>

            <div key={2} className={styles.accordion_item}>
                <div className={styles.accordion_title} onClick={() => handleItemClick(2)} >
                    <div>Password</div>
                    <div>{activeIndex === 2 ? '-' : '+'}</div>
                </div>
                {activeIndex === 2 && <div className={styles.accordion_content}>
                    <div className={styles.input_fields}>
                        <div className={styles.input_area}>
                            <label htmlFor="">Old Password</label>
                            <br />
                            <input 
                                type="password"
                                className={styles.input}
                                name="old_password"
                                id="old_password"
                                value={oldPassword}
                                onChange={(event) => setOldPassword(event.target.value)} />
                        </div>
                        <div className={styles.input_area}>
                            <label htmlFor="">New Password</label>
                            <br />
                            <input 
                                type="password"
                                className={styles.input}
                                name="new_password"
                                id="new_password"
                                value={newPassword}
                                onChange={(event) => setNewPassword(event.target.value)} />
                        </div>
                        <div className={styles.input_area}>
                            <label htmlFor="">Repeat New Password</label>
                            <br />
                            <input 
                                type="password"
                                className={styles.input}
                                name="new_password_rep"
                                id="new_password_rep"
                                value={newPasswordRepeat}
                                onChange={(event) => setNewPasswordRepeat(event.target.value)} />
                        </div>
                        </div>
                    </div>} 
            </div>

            <div key={3} className={styles.accordion_item}>
                <div className={styles.accordion_title} onClick={() => handleItemClick(3)} >
                    <div>Address</div>
                    <div>{activeIndex === 3 ? '-' : '+'}</div>
                </div>
                {activeIndex === 3 && <div className={styles.accordion_content}>
                    <div className={styles.input_fields}>
                        <div className={styles.group}>
                            <div className={styles.input_area}>
                                <label htmlFor="">City</label>
                                <br />
                                <input 
                                    type="text"
                                    className={styles.input}
                                    name="city"
                                    id="city"
                                    value={city}
                                    onChange={(event) => setCity(event.target.value)} />
                            </div>
                            <div className={styles.input_area}>
                                <label htmlFor="">Country</label>
                                <br />
                                <input 
                                    type="text"
                                    className={styles.input}
                                    name="country"
                                    id="country"
                                    value={country}
                                    onChange={(event) => setCountry(event.target.value)} />
                            </div>
                        </div>
                        <div className={styles.group}>
                            <div className={styles.input_area}>
                                <label htmlFor="">Street</label>
                                <br />
                                <input 
                                    type="text"
                                    className={styles.input}
                                    name="street"
                                    id="street"
                                    value={street}
                                    onChange={(event) => setStreet(event.target.value)} />
                            </div>
                            <div className={styles.input_area}>
                                <label htmlFor="">Zip</label>
                                <br />
                                <input 
                                    type="text"
                                    className={styles.input}
                                    name="zip"
                                    id="zip"
                                    value={zip}
                                    onChange={(event) => setZip(event.target.value)} />
                            </div>
                        </div>
                    </div>
                </div>}
                </div>

                <div key={4} className={styles.accordion_item}>
                <div className={styles.accordion_title} onClick={() => handleItemClick(4)} >
                    <div>Contact</div>
                    <div>{activeIndex === 4 ? '-' : '+'}</div>
                </div>
                {activeIndex === 4 && <div className={styles.accordion_content}>
                    <div className={styles.input_fields}>
                        <div className={styles.group}>
                            <div className={styles.input_area}>
                                <label htmlFor="">Primary Email</label>
                                <br />
                                <input 
                                    type="text"
                                    className={styles.input}
                                    name="primary_email"
                                    id="primary_email"
                                    value={primaryEmail}
                                    onChange={(event) => setPrimaryEmail(event.target.value)} />
                            </div>
                            <div className={styles.input_area}>
                                <label htmlFor="">Primary Phone</label>
                                <br />
                                <input 
                                    type="text"
                                    className={styles.input}
                                    name="primary_phone"
                                    id="primary_phone"
                                    value={primaryPhone}
                                    onChange={(event) => setPrimaryPhone(event.target.value)} />
                            </div>
                        </div>
                        <div className={styles.group}>
                            <div className={styles.input_area}>
                                <label htmlFor="secondary_email">Secondary Email</label>
                                <br />
                                <input 
                                    type="text"
                                    className={styles.input}
                                    name="secondary_email"
                                    id="secondary_email"
                                    value={secondaryEmail}
                                    onChange={(event) => setSecondaryEmail(event.target.value)} />
                            </div>
                            <div className={styles.input_area}>
                                <label htmlFor="secondary_phone">Secondary Phone</label>
                                <br />
                                <input 
                                    type="text"
                                    className={styles.input}
                                    name="secondary_phone"
                                    id="secondary_phone"
                                    value={secondaryPhone}
                                    onChange={(event) => setSecondaryPhone(event.target.value)} />
                            </div>
                        </div>
                    </div>
                    </div>}
                </div>
            </main>

            <div className={styles.btn_container}>
                <button type='submit' className={styles.update_btn}>
                    <span>Update</span>
                </button>
                <button onClick={() => NavigateToMain()} className={styles.cancel_btn}>
                    <span>Cancel</span>
                </button>
            </div>
        </div>
    );
}