import React, { useState } from "react";
import '../Admin-General/AdminGeneral.css';
import Switchon from '../../icons/buttons-icons/switchon.svg';
import Switchoff from '../../icons/buttons-icons/switchoff.svg';
import Aslan from '../images/aslan.jpg';
import DeleteBtn from '../../icons/buttons-icons/delete.svg'
import Plus from '../../icons/buttons-icons/plus.svg';
import AddInstRepModal from "./Modals/AddInstRepModal";

const AdminGeneral = () =>
{
    const [listView, setListView] = useState(false);
    const [openModal, setOpenModal] = useState(false);

    const switchHandler = () =>
    { 
        document.getElementsByTagName('body').style.backgroundColor = 'background-color: rgba(0, 0, 0, 0.5);';
        setListView(listView => !listView);

    }



    return (
    <div className="general-main-content">

        <div className="heading">
            <h1 className="admin-panel-heading">Admin Panel</h1>
        </div>

        <div className="list-view-toggle">

            <div>
                <span>List/View</span>
                <br />
                <div className="switchClickDiv" onClick={switchHandler}>
                    <img src={listView ? Switchon : Switchoff} alt="" />
                </div>
            </div>
        </div>

        <div className="institution-representatives-container">
            <div className="institution-rep-heading">
                <h2>Institution Representatives</h2>
            </div>

            <div className="cards">
                <div className="info-card">
                    <div className="delete"><img className="delete_btn" src={DeleteBtn} alt="" /></div>
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
            </div>
        </div>

        <AddInstRepModal 
            open={openModal} 
            onClose={() => setOpenModal(false)} 
            />

    </div>
    )
}

export default AdminGeneral;