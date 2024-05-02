import React, { useState } from "react";
import TripleDots from '../../../icons/buttons-icons/tripledots.svg';
import RowDeleteBtn from '../../../icons/buttons-icons/rowdelete.svg';
import RowEditBtn from '../../../icons/buttons-icons/rowedit.svg';
import Pagination from '../../Pagination/Pagination';
import DeleteModal from "../../Admin-General/Modals/DeleteModal/DeleteModal";
import { useUserContext } from "../../../Context/UsersContext";
import { useQuery } from '@tanstack/react-query';
import { errorT } from "../../../Toasts/toasters";
import { getUsersByInstitution } from "../../../Services/ms_auth/UserService";
//import { useCurrentUserContext } from "../../../Context/CurrentUserContext";
import { useEffect } from "react";
import {useInstructorsContext} from '../../../Context/InstructorsContext';
import DeleteInstructorModal from "../DeleteInstructorModal/DeleteInstructorModal";
const InstructorDataTable = ({checkBoxForAll}) =>
{
    const checkBoxForAllRows = checkBoxForAll;
    const [selectAll, setSelectAll] = useState(checkBoxForAllRows);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [userToDelete, setUserToDelete] = useState({})
    //const {user} = useCurrentUserContext();
    const onPageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    const {instructors, shouldRefetch, setShouldRefetch} = useInstructorsContext();
    //const {instructors, setInstructors} = useInstRepInstructorsContext();

    /* const handleSelectAll = () => {
        setSelectAll(!selectAll);
        const updatedInstReps = users.map(user => ({
            ...user,
            checked: !selectAll
        }));
        setUsers(updatedInstReps);
    }; */
    useEffect(() => {
        setShouldRefetch(true);
    }, []);

    return (
<div>
        <table>
            <thead>
                <tr>
                    <th><input checked={selectAll} type="checkbox" name="checkboxAll" id="checkboxAll" /></th>
                    <th>Full Name</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Birth Date</th>
                </tr>
            </thead>
            <tbody>
                {instructors?.map((instructor) => (
                    <tr key={instructor.instructorID}>
                        <td><input   type="checkbox" name="checkboxAll" id={`checkbox-${instructor?.instructorID}`} /></td>
                        <td className="full_name">{instructor?.fullName == null ? ("no data") : (instructor?.fullName)}</td>
                        <td className="username">{instructor?.username == null ? ("no data") : instructor?.username}</td>
                        <td className="email">{instructor?.contactDTO?.primaryEmail == null ? ("no data") : instructor?.contactDTO?.primaryEmail }</td>
                        <td className="phone">{instructor?.contactDTO?.primaryPhone == null ? ("no data") : instructor?.contactDTO?.primaryPhone}</td>
                        <td className="birth_date">{instructor?.dob == null ? ("no data") : (instructor?.dob)}</td>
                        <td className="actions">
                            <div className="triple-dots">
                                <img src={TripleDots} alt="" />
                                <div className="buttons-container">
                                    <span onClick={() =>
                                    {
                                        setUserToDelete(instructor);
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
                totalItems={instructors.length}
                itemsPerPage={itemsPerPage}
                onPageChange={onPageChange}
            />

        <DeleteInstructorModal
            open={openDeleteModal}
            instructor={userToDelete}
            onClose={() => setOpenDeleteModal(false)}
        />
        </div>
    );
}

export default InstructorDataTable;