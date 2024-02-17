import React, { useState } from "react";
import '../Admin-General/AdminGeneral.css';
import Switchon from '../../icons/buttons-icons/switchon.svg';
import Switchoff from '../../icons/buttons-icons/switchoff.svg';
import Aslan from '../images/aslan.jpg';
import DeleteBtn from '../../icons/buttons-icons/delete.svg'
import Plus from '../../icons/buttons-icons/plus.svg';
import AddInstRepModal from "./Modals/AddInstRepModel/AddInstRepModal";
import DataTable from "../CustomDataTable/DataTable";

const AdminGeneral = () =>
{
    const [listView, setListView] = useState(false);
    const [openModal, setOpenModal] = useState(false);

    const disableListView = () =>
    {
        setListView(listView => !listView);
    }

    const deleteUser = async() =>
    {
        // TO DO
    }

    const data = [
        {image: Aslan, fullname: "Aslan Ibadullayev", status: "Active", institution: "ADA University", username: "leon_master", password: "dscmsdeopwefocsdlkansdvka", email: "aibadullayev14824@ada.edu.az", phone: "+994501234567"},
        {image: Aslan, fullname: "Aslan Ibadullayev", status: "Deactive", institution: "ADA University", username: "leon_master", password: "23roeiwfedcergfegmdc", email: "aibadullayev14824@ada.edu.az", phone: "+994501234567"},
        {image: Aslan, fullname: "Aslan Ibadullayev", status: "Active", institution: "ADA University", username: "leon_master", password: "efefjaslfj", email: "aibadullayev14824@ada.edu.az", phone: "+994501234567"},
        {image: Aslan, fullname: "Aslan Ibadullayev", status: "Deactive", institution: "ADA University", username: "leon_master", password: "fwwef", email: "aibadullayev14824@ada.edu.az", phone: "+994501234567"},
        {image: Aslan, fullname: "Aslan Ibadullayev", status: "Active", institution: "ADA University", username: "leon_master", password: "ewfewfwef", email: "aibadullayev14824@ada.edu.az", phone: "+994501234567"},
    ];

    return (
    <div className="general-main-content">

        <div className="heading">
            <h1 className="admin-panel-heading">Admin Panel</h1>
        </div>

        <div className="list-view-toggle">

            <div>
                <span>List/View</span>
                <br />
                <div className="switchClickDiv" onClick={() => disableListView()}>
                    <img src={listView ? Switchon : Switchoff} alt="" />
                </div>
            </div>
        </div>

        {listView == false ? (
            <div >
        <div className="institution-representatives-container">
            <div className="institution-rep-heading">
                <h2>Institution Representatives</h2>
            </div>

            <div className="cards">
                <div className="create-card" onClick={() =>{ 
                        setOpenModal(true)
                    }}>
                        <div className="plus-sign"><img src={Plus} alt="" /></div>
                        <div className="add-label">
                            <span>Add</span>
                            <br />
                            <span>Representative</span>
                        </div>
                </div>
                <div className="info-card">
                    <div onClick={deleteUser} className="delete"><img className="delete_btn" src={DeleteBtn} alt="" /></div>
                    <div className="person-image">
                        <img src={Aslan} alt="Me" />
                    </div>
                    <div className="person-fullname">
                        <span className="first_name">Aslan</span>
                        <br />
                        <span className="last_name">Ibadullayev</span>
                    </div>
                    <div className="school_name">
                        <span>ADA University</span>
                    </div>
                </div>  
            </div>
        </div>

        <AddInstRepModal 
            open={openModal} 
            onClose={() => setOpenModal(false)} 
            />
            </div>
            )
            : (
                <DataTable checkBoxForAll={true} data={data} />
                )
        }

    </div>
    )
}

export default AdminGeneral;