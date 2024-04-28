import React, { useState } from "react";
import TripleDots from '../../../../icons/buttons-icons/tripledots.svg';
import RowDeleteBtn from '../../../../icons/buttons-icons/rowdelete.svg';
import RowEditBtn from '../../../../icons/buttons-icons/rowedit.svg'
import { DeleteTestModal } from "../DeleteTestModal/DeleteTestModal";
import CreateEditTest from "../CreateEditTest/CreateEditTest";
import { useNavigate } from "react-router-dom";

export const TestsDataTable = () => {
    const [tests, setTests] = useState([{id: 1, name: "fewefwwe", subject: "efwwefwfe", nb_questions: 21}]);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [testToDelete, setTestToDelete] = useState(null);
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

    const handleDeleteButtonClick = (event, test) => {
        event.stopPropagation(); 
        setTestToDelete(test); 
        setOpenDeleteModal(true);
    }


    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th><input type="checkbox" name="checkboxAll" id="checkboxAll" /></th>
                        <th>Name</th>
                        <th>Subject</th>
                        <th>Number of Questions</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {tests?.map((test) => (
                        <tr key={test.id} onClick={() => handleRowClick(test.id)}>
                            <td><input checked={test.checked} type="checkbox" name="checkboxAll" id={`checkbox-${test.id}`} /></td>
                            <td className="user">{test.name == null ? "no data" : test.name}</td>
                            <td className="username">{test.subject == null ? "no data" : test.subject}</td>
                            <td className="institution">{test.nb_questions == null ? "no data" : test.nb_questions}</td> 
                            <td className="actions">
                                <div className="triple-dots">
                                    <img src={TripleDots} alt="" />
                                    <div className="buttons-container">
                                        <span onClick={(event) => handleDeleteButtonClick(event, test)}>
                                            <img src={RowDeleteBtn} alt="" />
                                        </span>
                                        <span onClick={(event) => handleEditButtonClick(event, test.id)}>
                                            <img src={RowEditBtn} alt="" />
                                        </span>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <DeleteTestModal 
                open={openDeleteModal}
                test={setTestToDelete}
                onClose={() => setOpenDeleteModal(false)} />

            <CreateEditTest open={openEditModal} onClose={() => setOpenEditModal(false)} mode={1} id={editId}/>
        </div>
    );
};
