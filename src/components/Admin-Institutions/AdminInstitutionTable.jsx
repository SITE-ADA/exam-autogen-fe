import React, { useEffect, useState, useMemo } from "react";
import TripleDots from '../../icons/buttons-icons/tripledots.svg';
import RowDeleteBtn from '../../icons/buttons-icons/rowdelete.svg';
import RowEditBtn from '../../icons/buttons-icons/rowedit.svg';
import styles from '../Admin-Institutions/AdminInstitutionTable.module.css';
import Pagination from '../Pagination/Pagination';
import DeleteInstitutionModal from "./DeleteInstitutionModal/DeleteInstitutionModal";
import { useInstitutionContext } from "../../Context/InstitutionsContext";
import CreateEditInstRepModal from "../Admin-General/Modals/CreateEditInstRepModal/CreateEditInstRepModal";
import CreateEditInstitutionModal from "./CreateEditInstitutionModal/CreateEditInstitutionModal";

const AdminInstitutionDataTable = ({ checkBoxForAll}) => {
    const checkBoxForAllRows = checkBoxForAll;
    const [selectAll, setSelectAll] = useState(checkBoxForAllRows);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5; // Set items per page as you need
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [openCreateEditModal, setOpenCreateEditModal] = useState(false);
    const [institutionToDelete, setInstitutionToDelete] = useState(null);
    const {institutions} = useInstitutionContext();
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const [mode, setMode] = useState(0);
    const [instToEdit, setInsToEdit] = useState(0);
    const [rerender, setRerender] = useState(false);
    const onPageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th><input checked={selectAll}  type="checkbox" name="checkboxAll" id="checkboxAll" /></th>
                        <th>Institution Name</th>
                        <th>Status</th>
                        <th>Address</th>
                        <th>Primary Phone</th>
                        <th>Primary Email</th>
                    </tr>
                </thead>
                <tbody>
                    {institutions?.slice(indexOfFirstItem, indexOfLastItem).map((inst) => (
                        <tr key={inst.id}>
                            <td><input type="checkbox" name="checkboxAll" id={`checkbox-${inst.id}`} /></td>
                            <td className="institution">{inst.institutionName}</td>
                            <td className="status">{inst.status == 0 ? 'Inactive' : 'Active'}</td>
                            <td className="address">{inst.address.city}, {inst.address.country} {inst.address.street}</td>
                            <td className="primary_phone">{inst.contact.primaryPhone}</td>
                            <td className="primary_email">{inst.contact.primaryEmail}</td>
                            <td className="actions">
                                <div className={styles.triple_dots}>
                                    <img src={TripleDots} alt="" />
                                    <div className={styles.buttons_container}>
                                        <span onClick={() => {
                                                setInstitutionToDelete(inst);
                                                setOpenDeleteModal(true);
                                            }}>
                                            <img src={RowDeleteBtn} alt="" />
                                        </span>
                                        <span onClick={() =>{ setRerender(true); setOpenCreateEditModal(true);setInsToEdit(inst.id); setMode(1);}}><img src={RowEditBtn} alt="" /></span>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                </tfoot>
            </table>

            <Pagination
                totalItems={institutions.length}
                itemsPerPage={itemsPerPage}
                onPageChange={onPageChange}
            />

            <DeleteInstitutionModal
                open={openDeleteModal}
                institution={institutionToDelete}
                onClose={() => setOpenDeleteModal(false)}
            />
            <CreateEditInstitutionModal 
                open={openCreateEditModal} 
                onClose={setOpenCreateEditModal} 
                mode={mode} 
                id={instToEdit} 
                rerender={rerender}
                setRerender={setRerender}
                />
        </div>
    );
}

export default AdminInstitutionDataTable;
