import React, { useState } from "react";
import TripleDots from '../../../icons/buttons-icons/tripledots.svg';
import RowDeleteBtn from '../../../icons/buttons-icons/rowdelete.svg';
import RowEditBtn from '../../../icons/buttons-icons/rowedit.svg';
import Pagination from '../../Pagination/Pagination';
import DeleteModal from "../../Admin-General/Modals/DeleteModal/DeleteModal";
import { useUserContext } from "../../../Context/UsersContext";

const InstructorDataTable = ({checkBoxForAll}) =>
{
    const checkBoxForAllRows = checkBoxForAll;
    const [selectAll, setSelectAll] = useState(checkBoxForAllRows);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null)

    const {users, refetchUsers} = useUserContext();

    const onPageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    /* const handleSelectAll = () => {
        setSelectAll(!selectAll);
        const updatedInstReps = users.map(user => ({
            ...user,
            checked: !selectAll
        }));
        setUsers(updatedInstReps);
    }; */

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
        // setUsers(updatedInstReps);
        setSelectAll(updatedInstReps.every(user => user.checked));
    };



    return (
<div>
        <table>
            <thead>
                <tr>
                    <th><input checked={selectAll} type="checkbox" name="checkboxAll" id="checkboxAll" /></th>
                    <th>Full Name</th>
                    <th>Username</th>
                    <th>Status</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Birth Date</th>
                </tr>
            </thead>
            <tbody>
                {users?.filter(user => user.userTypeId === 5).slice(indexOfFirstItem, indexOfLastItem).map((user) => (
                    <tr key={user.id}>
                        <td><input checked={user.checked} type="checkbox" name="checkboxAll" id={`checkbox-${user.id}`} /></td>
                        <td className="full_name">{user.fullname == null ? ("no data") : (user.fullname)}</td>
                        <td className="username">{user.username == null ? ("no data") : user.username}</td>
                        <td className="status">{user.status == null ? ("no data") : (user.status)}</td>
                        <td className="email">{user.email == null ? ("no data") : user.email}</td>
                        <td className="phone">{user.phone == null ? ("no data") : user.phone}</td>
                        <td className="birth_date">{user.dob == null ? ("no data") : (user.dob)}</td>
                        <td className="actions">
                            <div className="triple-dots">
                                <img src={TripleDots} alt="" />
                                <div className="buttons-container">
                                    <span onClick={() =>
                                    {
                                        setUserToDelete(user);
                                        setOpenDeleteModal(true)
                                    }
                                    }><img src={RowDeleteBtn} alt="" /></span>
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
                totalItems={users.length}
                itemsPerPage={itemsPerPage}
                onPageChange={onPageChange}
            />

        <DeleteModal 
            open={openDeleteModal}
            user={userToDelete}
            onClose={() => setOpenDeleteModal(false)}
        />
        </div>
    );
}

export default InstructorDataTable;