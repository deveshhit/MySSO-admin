import React from 'react';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import swal from 'sweetalert';
import { Container, Row, Modal, Button } from 'react-bootstrap';
import API_URL from '../../../config';


const SubCaste = () => {

    const [userTypelist, setUserTypelist] = useState([]);
    const [perPage] = useState(10);
    const [pageCount, setPageCount] = useState(0);
    const [page, setPage] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [visibleedit, setVisibleedit] = useState(false);
    const [id, setId] = useState('');
    const [castid, setCastid] = useState('');
    const [type, setType] = useState('');
    const [addsubcasttype, setSubcasttype] = useState('');
    const [addcasttype, setCasttype] = useState('');
    const [castListdata, setCastList] = useState([])




    useEffect(() => {
        getSubCasteList(page, perPage)
        castList()
    }, [])

    const castList = async () => {
        try {
            const requestOption = {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            }
            await fetch(`${API_URL}/api/castList`, requestOption)
                .then((response) => response.json())
                .then((data) => {
                    if (data.status == 200) {
                        console.log(data.data)
                        setCastList(data.data)
                    } else {
                        console.log(data.message)
                    }
                })

        } catch (err) {
            console.error(err.message)
        }
    }


    const getSubCasteList = async (page, perPage) => {
        try {
            const requestOption = {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            }
            await fetch(`${API_URL}/api/subcastList?page=${page}&limit=${perPage}`, requestOption)
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
        getSubCasteList(selectedPage, perPage);
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
            await fetch(`${API_URL}/api/getSubcastdetailsbyid?id=${id}`, requestOption)
                .then((response) => response.json())
                .then((data) => {
                   
                    if (data.status == 200) {
                        setType(data.data[0]?.type)
                        setCasttype(data.data[0]?.cast?.type)
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
        console.log("addusertype>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", addsubcasttype)
        try {

            if (!addsubcasttype) {
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
                body: JSON.stringify({ cast_id:castid ,type: addsubcasttype }),
            }
            await fetch(`${API_URL}/api/addSubcast`, requestOption)
                .then((response) => response.json())
                .then((data) => {
                    if (data.status == 200) {
                        swal(data.message, {
                            icon: "success",
                        });
                        setShowModal(false)
                        getSubCasteList(page, perPage)
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
            if (!addcasttype) {
                swal("Please Select Caste", {
                    icon: "warning",
                });
                return;
            }

            if (!type) {
                swal("Please Enter Sub Caste", {
                    icon: "warning",
                });
                return;
            }
            await fetch(`${API_URL}/api/subcasteUpdate`, {
                method: 'put',
                body: JSON.stringify({ id: id, type: type, cast_id: addcasttype}),
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
                            getSubCasteList(page, perPage);
                        });
                    }
                    else {
                        setVisibleedit(false)
                        swal({
                            text: data.message,
                            type: "error",
                            icon: "error"
                        }).then(function () {
                            getSubCasteList(page, perPage);

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
            fetch(`${API_URL}/api/subcasteUpdate`, requestOption)
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

    console.log('addcasttype', addcasttype)

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
                                            <h4 className="card-title">Sub Caste</h4>
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
                                                        <th>Caste</th>
                                                        <th>SubCaste</th>
                                                        <th>Status</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {userTypelist.map((item, index) => {
                                                        return (
                                                            <tr key={index}>
                                                                <td>{startFrom + index + 1}</td>
                                                                <td>{item.cast?.type}</td>
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
                    <Modal.Title>Add Sub Caste type</Modal.Title>
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
                                                    <label className="form-label"><strong>Caste Type</strong></label>
                                                    <select className="form-control" name="cast" id="cast" onChange={(e) => setCastid(e.target.value)}>
                                                        <option value="" hidden>Select Caste</option>
                                                        {castListdata.map((item, index) => {
                                                            return (
                                                                <option key={index} value={item._id}>{item.type}</option>
                                                            )
                                                        })}
                                                    </select>
                                                </div>
                                                <div className="col-md-6">

                                                    <label className="form-label"><strong>Add Sub Cast type</strong></label>
                                                    <input type='text' className="form-control"
                                                        name='type'
                                                        placeholder='Enter Sub Caste Type'
                                                        defaultValue=""
                                                        required
                                                        autoComplete="off"
                                                        onChange={(e) => setSubcasttype(e.target.value)}
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
                    <Modal.Title>Edit Sub Caste Type</Modal.Title>
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
                                                    <label className="form-label"><strong>Select Caste Type</strong></label>
                                                    <select className="form-control" name="cast" id="cast" onChange={(e) => setCasttype(e.target.value)} >
                                                        <option value="" hidden>Select Caste</option>
                                                        {castListdata.map((item, index) => {
                                                            return (
                                                                <option key={index} value={item._id} selected={addcasttype == item.type}>{item.type}</option>
                                                            )
                                                        })}
                                                    </select>
                                                </div>
                                                   
                                                <div className="col-md-6">
                                                    <label className="form-label"><strong>Enter Sub Caste Type</strong></label>
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

export default SubCaste;