import React, { useEffect } from "react";
import styles from './PoolTable.module.css';
import '../../../GlobalStyles/table.css';
import { useState } from "react";
import RowDeleteBtn from '../../../../icons/buttons-icons/rowdelete.svg';
import RowEditBtn from '../../../../icons/buttons-icons/rowedit.svg';
import TripleDots from '../../../../icons/buttons-icons/tripledots.svg';
import DeleteModal from "../../../Admin-General/Modals/DeleteModal/DeleteModal";
import { useNavigate } from "react-router-dom";
import PoolDeleteModal from "../QuestionPoolDeleteModal/PoolDeleteModal";
import { msQuestionApi } from "../../../../Services/AxiosService";
import { getAllPools } from "../../../../Services/ms_question/QuestionService";
import { useQuery } from "@tanstack/react-query";
import CreateEditPoolModal from "../CreateQuestionPool/CreateEditPoolModal";
import { ToastContainer, toast } from 'react-toastify';
import { usePoolContext } from "../../../../Context/PoolsContext";

const PoolTable = ({checkBoxForAll}) =>
{
    const checkBoxForAllRows = checkBoxForAll;
    const [selectAll, setSelectAll] = useState(checkBoxForAllRows);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5; // Set items per page as you need
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [poolToDelete, setPoolToDelete] = useState(null);
    const [mode, setMode] = useState(null);
    const navigate = useNavigate();
    const [openModal, setOpenModal] = useState(false);
    const [poolId, setPoolId] = useState(null);

    const { pools, setPools, isLoading, error, refetchPools } = usePoolContext();
    // const [pools, setPools] = useState([]);
     /* const fetchPools = async() =>
    {
        try {
            const response = await msQuestionApi.get('/question-pool');
            const allPools = response.data;
            setPools(allPools);
        }catch(e)
        {

        }
    } */
    /*
    const {data, error, isLoading, refetch} =useQuery({
        queryKey: ['poolls'],
        queryFn: async() => {
            try {
                const response = await getAllPools();
                setPools(response.data);
                return response.data;
            }catch(e)
            {

            }
        }
    }) */


    /*const handleRefetchPools = async () => {
        try {
            // Call the function to fetch the updated list of pools
            const updatedPools = await fetchPools(); // Implement fetchPools function according to your needs
            setPools(updatedPools);
        } catch (error) {
            console.error("Error fetching pools:", error);
        }
    };*/

    const handleSelectAll = () => {
        setSelectAll(!selectAll);
        const updatedInstReps = pools.map(pool => ({
            ...pool,
            checked: !selectAll
        }));
        setPools(updatedInstReps);
    };

    const handleCheckboxChange = (id) => {
        const updatedInstReps = pools.map(pool => {
            if (pool.id === id) {
                return {
                    ...pool,
                    checked: !pool.checked
                };
            }
            return pool;
        });
        setPools(updatedInstReps);
        setSelectAll(updatedInstReps.every(pool => pool.checked));
    };

    const GoEditPage = (poolId) =>
        navigate(`/Instructor/QuestionPools/EditQuestionPool/${poolId}`)
    
    return (
        <div>
            
        <table>
            <thead>
                <tr>
                    <th><input checked={selectAll} onChange={handleSelectAll} type="checkbox" name="checkboxAll" id="checkboxAll" /></th>
                    <th>Name</th>
                    <th>Subject</th>
                    <th>Number of Questions</th>
                    <th>Last Edited</th>
                </tr>
            </thead>
            <tbody>
                {pools?.map((pool) => (
                    <tr key={pool.id}>
                        <td><input checked={pool.checked} onChange={() => handleCheckboxChange(pool.id)} type="checkbox" name="checkboxAll" id={`checkbox-${pool.id}`} /></td>
                        <td className="name">{pool.name == null ? ("no data") : (pool.name)}</td>
                        <td className="subject">{pool.subjectId == null ? ("no data") : pool.subjectId}</td>
                        <td className="question_count">{pool.question_count == null ? ("no data") : (pool.question_count)}</td>
                        <td className="last_edited">{pool.last_edited == null ? ("no data") : pool.last_edited}</td> 
                        <td className="actions">
                            <div className="triple-dots">
                                <img src={TripleDots} alt="" />
                                <div className="buttons-container">
                                    <span onClick={() =>
                                    {
                                        setPoolToDelete(pool);
                                        setOpenDeleteModal(true)
                                    }
                                    }><img src={RowDeleteBtn} alt="" /></span>
                                    <span onClick={() => {setOpenModal(true); setMode(1); console.log(mode);setPoolId(pool.id)}}><img src={RowEditBtn} alt="" /></span>
                                </div>
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
            <tfoot>
            </tfoot>
        </table> 
        <PoolDeleteModal 
            open={openDeleteModal}
            pool={poolToDelete}
            refetch={refetchPools}
            onClose={() => setOpenDeleteModal(false)}
            />
        <CreateEditPoolModal
        open={openModal} 
        onClose={() => setOpenModal(false)} 
        mode={mode}
        id={poolId}
        updatePools={refetchPools}
        refetchPools={refetchPools}
        setPools={() => setPools()}
         />

        </div>
    );
}

export default PoolTable;