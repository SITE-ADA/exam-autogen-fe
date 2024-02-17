import React, { useState } from "react";
import TripleDots from '../../icons/buttons-icons/tripledots.svg';
import RowDeleteBtn from '../../icons/buttons-icons/rowdelete.svg';
import RowEditBtn from '../../icons/buttons-icons/rowedit.svg';

const DataTable = (props) => {
    const checkBoxForAllRows = props.checkboxForAll;
    const [selectAll, setSelectAll] = useState(checkBoxForAllRows);
    const [instReps, setInstReps] = useState(props.data);

    const handleSelectAll = () => {
        setSelectAll(!selectAll);
        const updatedInstReps = instReps.map(instRep => ({
            ...instRep,
            checked: !selectAll
        }));
        setInstReps(updatedInstReps);
    };

    const handleCheckboxChange = (id) => {
        const updatedInstReps = instReps.map(instRep => {
            if (instRep.id === id) {
                return {
                    ...instRep,
                    checked: !instRep.checked
                };
            }
            return instRep;
        });
        setInstReps(updatedInstReps);
        setSelectAll(updatedInstReps.every(instRep => instRep.checked));
    };

    return (
        <table>
            <thead>
                <tr>
                    <th><input checked={selectAll} onChange={handleSelectAll} type="checkbox" name="checkboxAll" id="checkboxAll" /></th>
                    <th>Full Name</th>
                    <th>Status</th>
                    <th>Institution</th>
                    <th>Username</th>
                    <th>Password</th>
                    <th>Email</th>
                    <th>Phone Number</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {instReps.map((instRep) => (
                    <tr key={instRep.id}>
                        <td><input checked={instRep.checked} onChange={() => handleCheckboxChange(instRep.id)} type="checkbox" name="checkboxAll" id={`checkbox-${instRep.id}`} /></td>
                        <td className="user"><img src={instRep.image} alt="" /><span>{instRep.fullname}</span></td>
                        <td className="status">{instRep.status}</td>
                        <td className="institution">{instRep.institution}</td>
                        <td className="username">{instRep.username}</td>
                        <td className="password">{instRep.password}</td>
                        <td className="email">{instRep.email}</td>
                        <td className="phone">{instRep.phone}</td>
                        <td className="actions">
                            <div className="triple-dots">
                                <img src={TripleDots} alt="" />
                                <div className="buttons-container">
                                    <span><img src={RowDeleteBtn} alt="" /></span>
                                    <span><img src={RowEditBtn} alt="" /></span>
                                </div>
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
            <tfoot></tfoot>
        </table>
    );
}

export default DataTable;
