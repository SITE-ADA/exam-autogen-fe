import React, { useEffect } from "react";
import styles from './SubjectsTable.module.css';
import { useState } from "react";
import TripleDots from '../../../../icons/buttons-icons/tripledots.svg';
import RowDeleteBtn from '../../../../icons/buttons-icons/rowdelete.svg';
import RowEditBtn from '../../../../icons/buttons-icons/rowedit.svg';
import { useMySubjectsContext } from "../../../../Context/MySubjectsContext";
import { useQuery } from "@tanstack/react-query";
import { getInstructorSubjects } from "../../../../Services/ms_auth/SubjectService";
import axios from "axios";
import DeleteInstSubject from "../DeleteInstructorSubjectsModal/DeleteInstSubject";
import EditSubjectModal from "../EditSubjectModal/EditSubjectModal";
export const SubjectsTable = ({ checkBoxForAll}) => {

    const checkBoxForAllRows = checkBoxForAll;
    const [selectAll, setSelectAll] = useState(checkBoxForAllRows);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5; // Set items per page as you need
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [subjectToDelete, setSubjectToDelete] = useState(null);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const [subjects, setSubjects] = useState([]);
    const [subject, setSubject] = useState(null);
    const {mySubjects, refetch} = useMySubjectsContext();
    const [rerender, setRerender] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [editId, setEditId] = useState(0);
    const onPageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    


    return (
        <div>
        <table>
                <thead>
                    <tr>
                        <th><input checked={selectAll}  type="checkbox" name="checkboxAll" id="checkboxAll" /></th>
                        <th>Name</th>
                        <th>CRN</th>
                        <th>Term</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {mySubjects?.map((mySubject) => (
                        <tr key={mySubject.id}>
                            <td><input type="checkbox" name="checkboxAll" id={`checkbox-${mySubject.id}`} /></td>
                            
                            <td className="institution">{mySubject.name}</td>
                            <td className="status">{mySubject.crn}</td>
                            <td className="primary_phone">{mySubject.term}</td>
                            <td className="primary_email">{mySubject.status}</td>
                            <td className="actions">
                                <div className="triple-dots">
                                    <img src={TripleDots} alt="" />
                                    <div className="buttons-container">
                                        <span onClick={() => {
                                                setSubjectToDelete(mySubject);
                                                setOpenDeleteModal(true);
                                            }}>
                                            <img src={RowDeleteBtn} alt="" />
                                        </span>
                                        <span onClick={() => {
                                                setRerender(true);
                                                setEditId(mySubject.id);
                                                setOpenEditModal(true);
                                            }}><img src={RowEditBtn} alt="" /></span>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                </tfoot>
            </table>
            <DeleteInstSubject open={openDeleteModal}  onClose={() =>{ setOpenDeleteModal(false);}} subject={subjectToDelete} /> 
            <EditSubjectModal open={openEditModal} onClose={() => setOpenEditModal(false)} id={editId} rerender={rerender} setRerender={setRerender} />
            </div>

    );
}