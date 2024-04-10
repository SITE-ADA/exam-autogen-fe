import React, {useState} from "react";
import styles from '../AddInstitutionModal/AddInstitutionModal.module.css';
import { ToastContainer, toast } from "react-toastify";
import { addContact, getContacts, updateContactPatch } from "../../../Services/ms_auth/ContactService";
import { addInstitution, getAllInstitutions, getInstitution, updateInstitution } from "../../../Services/ms_auth/InstitutionService";
import { createAddress, getAllAddresses, updateAddressPatch } from "../../../Services/ms_auth/AddressService";
import { useInstitutionContext } from "../../../Context/InstitutionsContext";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRef } from "react";
const  CreateEditInstitutionModal = ({ open, onClose, mode, id }) =>
{
    const [institutionName, setInstitutionName] = useState("");
    const [primaryEmail, setPrimaryEmail] = useState("");
    const [primaryPhone, setPrimaryPhone] = useState("");
    const [secondaryEmail, setSecondaryEmail] = useState("");
    const [secondaryPhone, setSecondaryPhone] = useState("");
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");
    const [zip, setZip] = useState("");
    const [street, setStreet] = useState("");
    const [status, setStatus] = useState(1);
    const [visible, setVisible] = useState(false);
    const [addressId, setAddressId] = useState(0);
    const [contactId, setContactId] = useState(0);

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

    const stopPropagation = (e) => {
        e.stopPropagation();
    };

    const clearFields = () => {
        setInstitutionName("");
        setPrimaryEmail("");
        setPrimaryPhone("");
        setSecondaryEmail("");
        setSecondaryPhone("");
        setCity("");
        setCountry("");
        setStreet("");
        setZip("");
        setStatus(1);
    }


    const {data, isLoading, error, refetch} = useQuery({
        queryKey: ['institution'],
        queryFn: async() => {
            try {
                if(mode === 1){
                    const response = await getInstitution(id);
                    setInstitutionName(response.data.institutionName);
                    setCountry(response.data.address.country);
                    setCity(response.data.address.city);
                    setStreet(response.data.address.street);
                    setZip(response.data.address.zip);
                    setPrimaryEmail(response.data.contact.primaryEmail);
                    setPrimaryPhone(response.data.contact.primaryPhone);
                    setSecondaryEmail(response.data.contact.secondaryEmail);
                    setSecondaryPhone(response.data.contact.secondaryPhone);
                    setAddressId(response.data.address.id);
                    setContactId(response.data.contact.id);
                    setStatus(response.data.status)
                }
            }catch(e){
                errorT("Error occurred");
            }
        }
    })

    const prevIdRef = useRef();

    useEffect(() => {
        clearFields();
        if(prevIdRef.current !== id)
        {
            prevIdRef.current = id;
            refetch();
        }
    }, [id, refetch]);

    const {refetchInstitutions} = useInstitutionContext();

    const handleEditInstitution = async (e) => {
        e.preventDefault();
                try {
                const r1 = await updateContactPatch(contactId, primaryEmail, primaryPhone, secondaryEmail, secondaryPhone);
                const r2 = await updateAddressPatch(addressId, country, city, street, zip);

                console.log(r1);
                console.log(r2);
                console.log(addressId + " " + contactId)
                const responseInstitution = (await updateInstitution(id, institutionName, addressId, contactId, status))
                if(responseInstitution.status === 200)
                {
                    refetchInstitutions();
                    success("Institution successfully updated!");
                }
                }catch(e)
                {
                    errorT("Error occurred while updating...")
                }
    
}

    const handleAddInstitution = async (e) => 
    {
        
        e.preventDefault();
        if(await checkInstitution()){
            errorT("Such an institution name already exists!");
        } else
        {
            const {message, exists} = await checkContact();
            if(exists)
            {
                errorT(message);
            }
            else if(await checkAddress())
            {
                errorT("Such a street already exists!");
            }
            else
            {
                let newContactId, newAddressId;
                try {
                newContactId = (await addContact(primaryEmail, primaryPhone, secondaryEmail, secondaryPhone)).data.id;
                newAddressId = (await updateAddressPatch(country, city, street, zip)).data.id;
                const responseInstitution = (await addInstitution(institutionName, newAddressId, newContactId, 'active'))
                if(responseInstitution.status === 200)
                {
                    success("Institution successfully created!");
                    refetchInstitutions();
                    setInstitutionName("");
                    setPrimaryEmail("");
                    setPrimaryPhone("");
                    setSecondaryEmail("");
                    setSecondaryPhone("");
                    setCity("");
                    setCountry("");
                    setStreet("");
                    setZip("");
                    setStatus(1);
                }
                }catch(e)
                {
                    errorT("Error occurred while creating...")
                }
            }

        }


    }

    const checkContact = async () =>
    {
        try {
            const response = await getContacts();
            const contacts = response.data;
            if(contacts.some(contact => contact.primaryEmail.trim() === primaryEmail.trim()))
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
            console.log(addresses);
            if(addresses.some(address => address.street.trim() === street))
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
            return institutions.some((inst) => inst.institutionName.trim() === institutionName.trim());
        }catch(error)
        {
            errorT("Error occurred");
        }
    }

    console.log(open)
    if (!open)
        return null;

    return (
        <div onClick={onClose} className={visible ? 'overlay' : 'overlay hidden'}>

            <div className={styles.modalContainer} onClick={stopPropagation}>

                <div className={styles.modalRight}>

                    <form onSubmit={mode === 0 ? handleAddInstitution : handleEditInstitution}>

                        <div className={styles.add_inst_rep_hg}>
                            <span>{mode === 0 ? 'Add Institution' : 'Edit Institution'}</span>
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
                                    <label htmlFor="">Status</label>
                                    <div className={styles.dropdown_list}>
                                        <select value={status} onChange={(e) =>{ setStatus(e.target.value); console.log(status)}} >
                                            <option value="1">Active</option>
                                            <option value="0">Inactive</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.btn_container}>
                            <button type='submit' className={styles.add_btn}>
                                <span>Add</span>
                            </button>
                            <button onClick={() => { onClose();}} className={styles.cancel_btn}>
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

export default CreateEditInstitutionModal;