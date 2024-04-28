import React, { useEffect, useState } from "react";
import TripleDots from '../../icons/buttons-icons/tripledots.svg';
import RowDeleteBtn from '../../icons/buttons-icons/rowdelete.svg';
import RowEditBtn from '../../icons/buttons-icons/rowedit.svg';
import styles from '../CustomDataTable/DataTable.css'
import Pagination from '../Pagination/Pagination';
import DeleteModal from "../Admin-General/Modals/DeleteModal/DeleteModal";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useUserContext } from "../../Context/UsersContext";
import CreateEditInstRepModal from "../Admin-General/Modals/CreateEditInstRepModal/CreateEditInstRepModal";

const DataTable = ({totalItems, checkBoxForAll}) => {
    const [openCreateEditModal, setOpenCreateEditModal] = useState(false);
    const checkBoxForAllRows = checkBoxForAll;
    const [selectAll, setSelectAll] = useState(checkBoxForAllRows);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null)
    const [mode, setMode] = useState(0);
    const {users, setUsers, refetchUsers, shouldRefetch, setShouldRefetch} = useUserContext();
    const [userId, setUserId] = useState(0);
    const [rerender, setRerender] = useState(false);

    const onPageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleSelectAll = () => {
        setSelectAll(!selectAll);
        const updatedInstReps = users.map(user => ({
            ...user,
            checked: !selectAll
        }));
        setUsers(updatedInstReps);
    };

    const handleCheckboxChange = (id) => {
        const updatedInstReps = users.map(user => {
            if (user.id === id) {
                return {
                    ...user,
                    checked: !user.checked
                };
            }
            return user;
        });
        setUsers(updatedInstReps);
        setSelectAll(updatedInstReps.every(user => user.checked));
    };

    useEffect(() =>{
        setShouldRefetch(true);
    }, [])

    return (
        <div>
        <table>
            <thead>
                <tr>
                    <th><input checked={selectAll} onChange={handleSelectAll} type="checkbox" name="checkboxAll" id="checkboxAll" /></th>
                    <th>Full Name</th>
                    <th>Username</th>
                    <th>Institution</th>
                    <th>Email</th>
                    <th>Phone Number</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {users?.filter(user => user.userTypeId === 2).slice(indexOfFirstItem, indexOfLastItem).map((user) => 
                    (
                    <tr key={user.id}>
                        <td><input checked={user.checked} onChange={() => handleCheckboxChange(user.id)} type="checkbox" name="checkboxAll" id={`checkbox-${user.id}`} /></td>
                        <td className="user">{user.fullName == null ? ("no data") : (user.fullname)}</td>
                        <td className="username">{user.username == null ? ("no data") : user.username}</td>
                        <td className="institution">{user.institution.institutionName == null ? ("no data") : (user.institution.institutionName)}</td> 
                        <td className="email">{user.email == null ? ("no data") : user.email}</td>
                        <td className="phone">{user.phone == null ? ("no data") : user.phone}</td> 
                        <td className="actions">
                            <div className="triple-dots">
                                <img src={TripleDots} alt="" />
                                <div className="buttons-container">
                                    <span onClick={() =>{setUserToDelete(user);setOpenDeleteModal(true)}}><img src={RowDeleteBtn} alt="" /></span>
                                    <span onClick={() => {setRerender(true);setOpenCreateEditModal(true); setMode(1); setUserId(user.id); }}><img src={RowEditBtn} alt="" /></span>
                                </div>
                            </div>
                        </td>
                    </tr>
                    )
                )}
            </tbody>
        
        </table>
        <Pagination
                totalItems={totalItems}
                itemsPerPage={itemsPerPage}
                onPageChange={onPageChange}
            />

        <DeleteModal 
            open={openDeleteModal}
            user={userToDelete}
            onClose={() => setOpenDeleteModal(false)}
            />

        <CreateEditInstRepModal 
        rerender={rerender}
        setRerender={setRerender}
        open={openCreateEditModal} 
        onClose={() => setOpenCreateEditModal(false)} 
        mode={mode} 
        id={userId}  /> 
        </div>
    );
}

export default DataTable;