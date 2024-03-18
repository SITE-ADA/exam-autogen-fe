import React, {useState} from "react";
import styles from '../AddInstitutionModal/AddInstitutionModal.module.css';
import { authApi } from "../../../Services/AxiosService";
import { ToastContainer, toast } from "react-toastify";
import { addContact, getContact, getContacts } from "../../../Services/ms_auth/ContactService";
import { addInstitution, getAllInstitutions } from "../../../Services/ms_auth/InstitutionService";
import { getAllAddresses } from "../../../Services/ms_auth/AddressService";
import { useInstitutionContext } from "../../../Context/InstitutionsContext";

const  AddInstitutionModal = ({ open, onClose }) =>
{
    const [institutionName, setInstitutionName] = useState(null);
    const [primaryEmail, setPrimaryEmail] = useState(null);
    const [primaryPhone, setPrimaryPhone] = useState(null);
    const [secondaryEmail, setSecondaryEmail] = useState(null);
    const [secondaryPhone, setSecondaryPhone] = useState(null);
    const [city, setCity] = useState(null);
    const [country, setCountry] = useState(null);
    const [zip, setZip] = useState(null);
    const [street, setStreet] = useState(null);
    const [visible, setVisible] = useState(false);
    
    const stopPropagation = (e) => {
        e.stopPropagation();
    };

    const {refetchInstitutions} = useInstitutionContext();

    const handleAddInstitution = async (e) => 
    {
        
        e.preventDefault();
        if(checkInstitution()){
            errorT("Such an institution name already exists!");
        } else if(true)
        {
            const {contactErrorMsg, exists} = checkContact();
            if(exists)
            {
                errorT(contactErrorMsg);
            }
            else if(checkAddress())
            {
                errorT("Such a street already exists!");
            }
            else
            {
                let new_contact_id, new_address_id
                try {
                    new_contact_id = (await addContact(primaryEmail, primaryPhone, secondaryEmail, secondaryPhone)).data.id;
                    //new_address_id = (await ad)


                }
                catch(error)
                {
                    
                }
            }

        }


    }

    const checkContact = async () =>
    {
        try {
            const response = await getContacts();
            const contacts = response.data;
            if(contacts.some(contact => contact.primaryEmail === primaryEmail))
            return {"message": "A contact with such primary email already exists!", "exists": true};
            else if(contacts.some(contact => contact.primaryPhone === primaryPhone))
            return {"message": "A contact with such primary phone already exists!", "exists": true}
            return false;
        }catch(error){

        }
    }
    
    const checkAddress = async () =>
    {
        try {
            const response = await getAllAddresses();
            const addresses = response.data;
            if(addresses.some(address => address.street === street))
            return true;
            return false;
        }catch(error)
        {

        }
    }

    const checkInstitution = async () =>
    {
        try {
            const response = await getAllInstitutions();
            const institutions = response.data;
            if(institutions.some(inst => inst.institutionName === institutionName))
            return true;
            return false;
        }catch(error)
        {
            errorT("Error occurred");
        }
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

                <div className={styles.modalRight}>

                    <form onSubmit={handleAddInstitution}>

                        <div className={styles.add_inst_rep_hg}>
                            <span>Add Institution</span>
                        </div>

                        <div className={styles.content}>
                        
                            <div className={styles.input_area}>

                                <div className={styles.area}>
                                    <label htmlFor="institutionName">Institution Name</label>
                                    <input 
                                    type="text" 
                                    className={styles.input} 
                                    id="institutionName" 
                                    name="institutionName"
                                    value={institutionName}
                                    onChange={(e) => setInstitutionName(e.target.value)} 
                                    />
                                </div>

                                <div className={styles.area}>
                                    <h3>Contact Information</h3>
                                    <div className={styles.group}>

                                        <div className={styles.group_input}>
                                            <label htmlFor="primaryEmail">Primary Email</label>
                                            <input 
                                            type="text" 
                                            className={styles.input} 
                                            id="primaryEmail" 
                                            name="primaryEmail"
                                            value={primaryEmail}
                                            onChange={(e) => setPrimaryEmail(e.target.value)}
                                            required 
                                            />
                                        </div>

                                        <div className={styles.group_input}>
                                            <label htmlFor="primaryPhone">Primary Phone</label>
                                            <input 
                                            type="text" 
                                            className={styles.input} 
                                            id="primaryPhone" 
                                            name="primaryPhone"
                                            value={primaryPhone}
                                            onChange={(e) => setPrimaryPhone(e.target.value)} 
                                            required
                                            />
                                        </div>
                                        
                                        <div className={styles.group_input}>
                                            <label htmlFor="secondaryEmail">Secondary Email</label>
                                            <input 
                                            type="text" 
                                            className={styles.input} 
                                            id="secondaryEmail" 
                                            name="secondaryEmail"
                                            value={secondaryEmail}
                                            onChange={(e) => setSecondaryEmail(e.target.value)} 
                                            />
                                        </div>

                                        <div className={styles.group_input}>

                                            <label htmlFor="secondaryPhone">Secondary Phone</label>
                                            <input 
                                            type="text" 
                                            className={styles.input} 
                                            id="secondaryPhone" 
                                            name="secondaryPhone"
                                            value={secondaryPhone}
                                            onChange={(e) => setSecondaryPhone(e.target.value)} 
                                            />
                                        </div>

                                    </div>
                                </div>
                                <div className={styles.area}>
                                    <h3>Address Information</h3>
                                    <div className={styles.group}>
                                        <div className={styles.group_input}>
                                            <label htmlFor="city">City</label>
                                            <input
                                            type="text"
                                            className={styles.input}
                                            id="city"
                                            name="city"
                                            value={city}
                                            onChange={(e) => setCity(e.target.value)}
                                            required 
                                            />
                                        </div>
                                        <div className={styles.group_input}>
                                            <label htmlFor="city">Country</label>
                                            <input
                                            type="text"
                                            className={styles.input}
                                            id="country"
                                            name="country"
                                            value={country}
                                            onChange={(e) => setCountry(e.target.value)} 
                                            required
                                            />
                                        </div>
                                        <div className={styles.group_input}>
                                            <label htmlFor="city">Street</label>
                                            <input
                                            type="text"
                                            className={styles.input}
                                            id="street"
                                            name="street"
                                            value={street}
                                            onChange={(e) => setStreet(e.target.value)} 
                                            required
                                            />
                                        </div>
                                        <div className={styles.group_input}>
                                            <label htmlFor="city">Zip</label>
                                            <input
                                            type="text"
                                            className={styles.input}
                                            id="zip"
                                            name="zip"
                                            value={zip}
                                            onChange={(e) => setZip(e.target.value)} 
                                            required
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.area}>
                                    
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
}

export default AddInstitutionModal;