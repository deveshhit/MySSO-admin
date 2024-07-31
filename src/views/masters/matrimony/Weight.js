import React from 'react';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import swal from 'sweetalert';
import { Container, Row, Modal, Button } from 'react-bootstrap';
import API_URL from '../../../config';


const Weight = () => {

    const [userTypelist, setUserTypelist] = useState([]);
    const [perPage] = useState(10);
    const [pageCount, setPageCount] = useState(0);
    const [page, setPage] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [visibleedit, setVisibleedit] = useState(false);
    const [id, setId] = useState('');
    const [type, setType] = useState('');
    const [addweighttype, setWeighttype] = useState('');



    useEffect(() => {
        getWeightList(page, perPage)
    }, [])

    const getWeightList = async (page, perPage) => {
        try {
            const requestOption = {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            }
            await fetch(`${API_URL}/api/weightList?page=${page}&limit=${perPage}`, requestOption)
                .then((response) => response.json())
                .then((data) => {
                    if (data.status == 200) {
                        const total = data.total;
                        const slice = total / perPage;
                        const pages = Math.ceil(slice);
                        setPageCount(pages);
                        setUserTypelist(data.data)

                    } else {
                        console.log(data.message)
                    }
                })

        } catch (err) {
            console.error(err.message)
        }
    }

    const handlePageClick = (e) => {
        const selectedPage = e.selected + 1;
        setPage(selectedPage);
        getWeightList(selectedPage, perPage);
    };

    const getdetails = async (id) => {
        try {
            setId(id)
            const requestOption = {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            }
            await fetch(`${API_URL}/api/getWeightdetailsbyid?id=${id}`, requestOption)
                .then((response) => response.json())
                .then((data) => {
                    if (data.status == 200) {
                        setType(data.data.type)
                    } else {
                        console.log(data.message)
                    }
                })

            setVisibleedit(true)
        } catch (err) {
            console.error(err.message)
        }
    }

    const addusertypedata = async (e) => {
        e.preventDefault();
        console.log("addusertype>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", addweighttype)
        try {

            if (!addweighttype) {
                swal("Please Enter Type", {
                    icon: "error",
                });
                return;
            }

            const requestOption = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ type: addweighttype }),
            }
            await fetch(`${API_URL}/api/addWeight`, requestOption)
                .then((response) => response.json())
                .then((data) => {
                    if (data.status == 200) {
                        swal(data.message, {
                            icon: "success",
                        });
                        setShowModal(false)
                        getWeightList(page, perPage)
                    } else {
                        swal(data.message, {
                            icon: "error",
                        });
                    }
                })
        } catch (err) {
            console.error(err.message)
        }
    }

    const updateusertype = async (e) => {
        e.preventDefault();
        try {

            if (!type) {
                swal("Please Enter Role Name", {
                    icon: "warning",
                });
                return;
            }
            await fetch(`${API_URL}/api/weightUpdate`, {
                method: 'put',
                body: JSON.stringify({ id: id, type: type }),
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then(response => response.json())
                .then(data => {
                    if (data.status == 200) {
                        setVisibleedit(false)
                        swal({
                            text: data.message,
                            type: "success",
                            icon: "success"
                        }).then(function () {
                            getWeightList(page, perPage);
                        });
                    }
                    else {
                        setVisibleedit(false)
                        swal({
                            text: data.message,
                            type: "error",
                            icon: "error"
                        }).then(function () {
                            getWeightList(page, perPage);

                        });
                    }
                });
        } catch (err) {
            console.error(err.message)
        }
    }

    const updatestatus = (id, status) => {
        try {
            const requestOption = {
                method: 'Put',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: status, id: id })
            }
            fetch(`${API_URL}/api/weightUpdate`, requestOption)
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    if (data.status === 200) {
                        swal({
                            text: "Status Updated Successfully",
                            icon: "success",
                            button: "OK",
                        });
                        getstafflist(page, perPage)
                    } else {
                        swal({
                            text: "Status Not Updated",
                            icon: "error",
                            button: "OK",
                        });
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        } catch (err) {
            console.log(err)
        }
    }

    const startFrom = (page - 1) * perPage;


    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card">
                                <div className="card-header">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <h4 className="card-title">Weight List</h4>
                                        </div>

                                        <div className="col-md-6">
                                            <button className='btn btn-primary' style={{ float: "right" }} onClick={() => setShowModal(true)}>Add Type</button>
                                        </div>

                                    </div>
                                </div>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <table className="table table-bordered">
                                                <thead>
                                                    <tr>
                                                        <th>Sr No.</th>
                                                        <th>Type</th>
                                                        <th>Status</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {userTypelist.map((item, index) => {
                                                        return (
                                                            <tr key={index}>
                                                                <td>{startFrom + index + 1}</td>
                                                                <td>{item.type}</td>
                                                                <td>
                                                                    <div className="form-check form-switch">
                                                                        <input
                                                                            className="form-check-input"
                                                                            type="checkbox"
                                                                            id={`statusSwitch_${index}`}
                                                                            defaultChecked={item.status === 1}
                                                                            onChange={async (e) => {
                                                                                const isChecked = e.target.checked;
                                                                                if (window.confirm(`Are you sure you want to ${isChecked ? 'activate' : 'deactivate'} this Type?`)) {
                                                                                    // Update the item status based on the checkbox state
                                                                                    const newStatus = isChecked ? 1 : 0;
                                                                                    // Call the updatestatus function to update the status in the backend
                                                                                    await updatestatus(item._id, newStatus);
                                                                                    // // Show success alert
                                                                                    // alert(`Item ${isChecked ? 'activated' : 'deactivated'} successfully.`);
                                                                                } else {
                                                                                    // If user cancels, revert checkbox state
                                                                                    e.target.checked = !isChecked;
                                                                                }
                                                                            }}
                                                                        />
                                                                        {/* <label className="form-check-label" htmlFor={`statusSwitch_${index}`}>
                                                                    {item.status === 1 ? "Active" : "Inactive"}
                                                                </label> */}
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <button className="btn btn-primary" onClick={() => getdetails(item._id)}>Edit</button>
                                                                </td>
                                                            </tr>
                                                        )
                                                    })}

                                                </tbody>
                                            </table>
                                            <ReactPaginate
                                                previousLabel={"Previous"}
                                                nextLabel={"Next"}
                                                breakLabel={"..."}
                                                pageCount={pageCount}
                                                marginPagesDisplayed={2}
                                                pageRangeDisplayed={3}
                                                onPageChange={handlePageClick}
                                                containerClassName={"pagination justify-content-end"}
                                                pageClassName={"page-item"}
                                                pageLinkClassName={"page-link"}
                                                previousClassName={"page-item"}
                                                previousLinkClassName={"page-link"}
                                                nextClassName={"page-item"}
                                                nextLinkClassName={"page-link"}
                                                breakClassName={"page-item"}
                                                breakLinkClassName={"page-link"}
                                                activeClassName={"active"}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Modal size='lg' show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Add type</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="card">

                                    <div className="card-body">
                                        <form action="/" method="POST">
                                            <div className="row">
                                                <div className="col-md-6">

                                                    <label className="form-label"><strong>Add type</strong></label>
                                                    <input type='text' className="form-control"
                                                        name='type'
                                                        placeholder='Enter Looking For Type'
                                                        defaultValue=""
                                                        required
                                                        autoComplete="off"
                                                        onChange={(e) => setWeighttype(e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-12">
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button type="submit" className="btn btn-primary mt-2 submit_all" style={{ float: "right" }} onClick={addusertypedata}>Submit</button>
                    <button className="btn btn-secondary mt-2 submit_all" onClick={() => setShowModal(false)}>
                        Close
                    </button>
                </Modal.Footer>
            </Modal>

            <Modal size='lg' show={visibleedit} onHide={() => setVisibleedit(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Type</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="card">
                                    <div className="card-body">
                                        <form action="/" method="POST">
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <label className="form-label"><strong>Weight Type</strong></label>
                                                    <input type='text' className="form-control"
                                                        name='usertype'
                                                        placeholder='Enter Role Name'
                                                        defaultValue={type}
                                                        autoComplete="off"
                                                        required
                                                        onChange={(e) => setType(e.target.value)}
                                                    />
                                                </div>

                                            </div>
                                            <div className="row">
                                                <div className="col-md-12">
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button type="submit" className="btn btn-primary mt-2 submit_all" style={{ float: "right" }} onClick={updateusertype}>Submit</button>
                    <button className="btn btn-secondary mt-2 submit_all" onClick={() => setVisibleedit(false)}>
                        Close
                    </button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default Weight;