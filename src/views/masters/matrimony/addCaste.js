import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import API_URL from '../../../config';

const AddCaste = () => {
    const navigate = useNavigate();
    const [rowsData, setRowsData] = useState([]);
    const [errors, setErrors] = useState({});

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const hasEmptyFields = rowsData.some((row) => row.type.trim() === '');

            if (hasEmptyFields) {
                swal({
                    title: "Warning!",
                    text: "Please fill in all fields for each row.",
                    icon: "warning",
                });
                return;
            }

            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(rowsData),
            };

            const response = await fetch(`${API_URL}/api/addCast`, requestOptions);
            const data = await response.json();

            if (data.status === 200) {
                swal({
                    text: data.message,
                    icon: "success",
                    button: false,
                });
                navigate('/Viewmedicalplantype');
                setTimeout(() => swal.close(), 1000);
            } else {
                swal({
                    title: "Error!",
                    text: data.message,
                    icon: "error",
                    button: false,
                });
                setTimeout(() => swal.close(), 1000);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const addTableRows = () => {
        setRowsData([...rowsData, { type: '' }]);
    };

    const deleteTableRows = (index) => {
        const rows = [...rowsData];
        rows.splice(index, 1);
        setRowsData(rows);
    };

    const handleChange = (index, evnt) => {
        const { name, value } = evnt.target;
        if (value.trim() === '') {
            setErrors((prevErrors) => ({
                ...prevErrors,
                [name]: 'This is required',
            }));
        } else {
            setErrors((prevErrors) => ({
                ...prevErrors,
                [name]: '',
            }));
        }
        const rowsInput = [...rowsData];
        rowsInput[index][name] = value;
        setRowsData(rowsInput);
    };

    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-header">
                            <div className="row">
                                <div className="col-md-6">
                                    <h4 className="card-title">Add Caste</h4>
                                </div>
                            </div>
                        </div>
                        <div className="card-body">
                            <div className="table-responsive">
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th>
                                                <button
                                                    className="btn btn-outline-success"
                                                    onClick={addTableRows}
                                                >
                                                    +
                                                </button>
                                            </th>
                                            <th>Type</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {rowsData.map((data, index) => (
                                            <tr key={index}>
                                                <td>
                                                    <button
                                                        className="btn btn-outline-danger"
                                                        onClick={() => deleteTableRows(index)}
                                                    >
                                                        x
                                                    </button>
                                                </td>
                                                <td>
                                                    <input
                                                        type="text"
                                                        onChange={(evnt) => handleChange(index, evnt)}
                                                        className="form-control"
                                                        name="type"
                                                        placeholder="Type"
                                                        autoComplete="off"
                                                        required
                                                    />
                                                    {errors.type && (
                                                        <span className="text-danger">{errors.type}</span>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="card-footer">
                            <button
                                disabled={rowsData.length === 0}
                                className="btn btn-outline-success"
                                onClick={handleSubmit}
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddCaste;
