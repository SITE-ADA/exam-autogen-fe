import React, { useEffect, useState, useMemo } from "react";
import TripleDots from '../../icons/buttons-icons/tripledots.svg';
import RowDeleteBtn from '../../icons/buttons-icons/rowdelete.svg';
import RowEditBtn from '../../icons/buttons-icons/rowedit.svg';
import styles from '../Admin-Institutions/AdminInstitutionTable.module.css';
import Pagination from '../Pagination/Pagination';
import DeleteInstitutionModal from "./DeleteInstitutionModal/DeleteInstitutionModal";

const AdminInstitutionDataTable = ({ totalItems, checkBoxForAll, data, refetch, updateInstitutions }) => {
    const checkBoxForAllRows = checkBoxForAll;
    const [selectAll, setSelectAll] = useState(checkBoxForAllRows);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5; // Set items per page as you need
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [institutionToDelete, setInstitutionToDelete] = useState(null);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    // Memoize the sliced data array
    const slicedData = useMemo(() => data?.slice(indexOfFirstItem, indexOfLastItem), [data, indexOfFirstItem, indexOfLastItem]);

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
                    {slicedData?.map((inst) => (
                        <tr key={inst.id}>
                            <td><input type="checkbox" name="checkboxAll" id={`checkbox-${inst.id}`} /></td>
                            
                            <td className="institution">{inst.institutionName}</td>
                            <td className="status">{inst.status}</td>
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
                                        <span><img src={RowEditBtn} alt="" /></span>
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
                totalItems={totalItems}
                itemsPerPage={itemsPerPage}
                onPageChange={onPageChange}
            />

            <DeleteInstitutionModal
                open={openDeleteModal}
                institution={institutionToDelete}
                onClose={() => setOpenDeleteModal(false)}
                refetch={updateInstitutions}
            />
        </div>
    );
}

export default AdminInstitutionDataTable;
