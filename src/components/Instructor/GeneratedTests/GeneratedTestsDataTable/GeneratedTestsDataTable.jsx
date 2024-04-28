import React from "react";
import styles from './GeneratedTestsDataTable.module.css';
import { DeleteGeneratedTestModal } from "../GeneratedTest/DeleteGeneratedTestModal/DeleteGeneratedTestModal";
import { useState } from "react";
import RowDeleteBtn from '../../../../icons/buttons-icons/rowdelete.svg';
import RowEditBtn from '../../../../icons/buttons-icons/rowedit.svg';
import TripleDots from '../../../../icons/buttons-icons/tripledots.svg';
import { CreateEditGenerateTestModal } from "../GeneratedTest/CreateEditGeneratedTestModal/CreateEditGenerateTestModal";
import { useLocation, useNavigate } from "react-router-dom";

export const GeneratedTestsDataTable = () => {

    const [gtests, setGTests] = useState([{id: 1, name: "Generated Test #1", test: {name: "test #1"}, nbVariants: 12}]);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [gTestToDelete, setgTestToDelete] = useState(null);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [mode, setMode] = useState(0);
    const [editId, setEditId] = useState(0);
    const navigate = useNavigate();

    const handleRowClick = (id) => {
        navigate(window.location.pathname + '/' + id);
    }

    const handleEditButtonClick = (event, id) => {
        event.stopPropagation(); 
        setMode(1);
        setOpenEditModal(true);
        setEditId(id);
    }

    const handleDeleteButtonClick = (event, gtest) => {
        event.stopPropagation(); 
        setgTestToDelete(gtest)
        setOpenDeleteModal(true);
    }

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th><input type="checkbox" name="checkboxAll" id="checkboxAll" /></th>
                        <th>Name</th>
                        <th>Source Test</th>
                        <th>Number of Variants</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {gtests?.map((gtest) => (
                        <tr key={gtest.id} onClick={() => handleRowClick(gtest.id)}>
                            <td><input checked={gtest.checked} type="checkbox" name="checkboxAll" id={`checkbox-${gtest.id}`} /></td>
                            <td className="user">{gtest.name == null ? "no data" : gtest.name}</td>
                            <td className="username">{gtest?.test?.name == null ? "no data" : gtest?.test?.name}</td>
                            <td className="institution">{gtest.nbVariants == null ? "no data" : gtest.nbVariants}</td> 
                            <td className="actions">
                                <div className="triple-dots">
                                    <img src={TripleDots} alt="" />
                                    <div className="buttons-container">
                                        <span onClick={(event) => handleDeleteButtonClick(event, gtest)}>
                                            <img src={RowDeleteBtn} alt="" />
                                        </span>
                                        <span onClick={(event) => handleEditButtonClick(event, gtest.id)}>
                                            <img src={RowEditBtn} alt="" />
                                        </span>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <DeleteGeneratedTestModal
                open={openDeleteModal}
                onClose={() => setOpenDeleteModal(false)}
                gtest={gTestToDelete} />
                
            <CreateEditGenerateTestModal open={openEditModal} onClose={() => setOpenEditModal(false)} mode={mode} id={editId} />
        </div>
    );
}