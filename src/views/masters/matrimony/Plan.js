import React from 'react';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import swal from 'sweetalert';
import { Container, Row, Modal, Button } from 'react-bootstrap';
import API_URL from '../../../config';
import { CSpinner } from '@coreui/react';


const Plan = () => {

    const [userTypelist, setUserTypelist] = useState([]);
    const [perPage] = useState(10);
    const [pageCount, setPageCount] = useState(0);
    const [page, setPage] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [visibleedit, setVisibleedit] = useState(false);
    const [id, setId] = useState('');
    const [type, setType] = useState('');

    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [content, setContent] = useState([]);
    const [position, setPosition] = useState('');

    const [newName,setNewName] = useState('');
    const [newprice, setNewPrice] = useState('');
    const [newcontent, setNewContent] = useState([]);
    const [newposition, setNewPosition] = useState('');

    const [isloading, setIsloading] = useState(false);




    useEffect(() => {
        getPlanList(page, perPage)
    }, [])

    const getPlanList = async (page, perPage) => {
        try {
            setIsloading(true)
            const requestOption = {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            }
            await fetch(`${API_URL}/api/planList?page=${page}&limit=${perPage}`, requestOption)
                .then((response) => response.json())
                .then((data) => {
                    if (data.status == 200) {
                        const total = data.total;
                        const slice = total / perPage;
                        const pages = Math.ceil(slice);
                        setPageCount(pages);
                        setUserTypelist(data.data)
                        setIsloading(false)

                    } else {
                        console.log(data.message)
                        swal({
                            text: data.message,
                            icon: "error",
                        });
                        setIsloading(false)
                    }
                })

        } catch (err) {
            console.error(err.message)
        }
    }

    const handlePageClick = (e) => {
        const selectedPage = e.selected + 1;
        setPage(selectedPage);
        getPlanList(selectedPage, perPage);
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
            await fetch(`${API_URL}/api/getPlandetailsbyid?id=${id}`, requestOption)
                .then((response) => response.json())
                .then((data) => {
                    if (data.status == 200) {
                       setNewName(data.data.name)
                       setNewPrice(data.data.price)
                       setNewPosition(data.data.position)
                       setNewContent(data.data.content)

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
        try {

            if (!name) {
                swal("Please Enter Name", {
                    icon: "warning",
                });
                return;
            }
            else if (!price) {
                swal("Please Enter price", {
                    icon: "warning",
                });
                return;
            }
            else if (!content || !content.length) {
                swal("Please Enter content", {
                    icon: "warning",
                });
                return;
            }
            else if (!position) {
                swal("Please Enter position", {
                    icon: "warning",
                });
                return;
            } 

            const requestOption = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name: name, price: price, content: content, position: position }),
            }
            await fetch(`${API_URL}/api/addPlan`, requestOption)
                .then((response) => response.json())
                .then((data) => {
                    if (data.status == 200) {
                        swal(data.message, {
                            icon: "success",
                        });
                        setShowModal(false)
                        getPlanList(page, perPage)
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
            

            console.log(newName)
            console.log(newprice)
            console.log(newcontent)
            console.log(newposition)



            if (!newName) {
                swal("Please Enter Name", {
                    icon: "warning",
                });
                return;
            }
            else if (!newprice) {
                swal("Please Enter price", {
                    icon: "warning",
                });
                return;
            } 
            else if (!newcontent) {
                swal("Please Enter content", {
                    icon: "warning",
                });
                return;
            } 
            else if (!newposition) {
                swal("Please Enter position", {
                    icon: "warning",
                });
                return;
            } 

            await fetch(`${API_URL}/api/planUpdate`, {
                method: 'put',
                body: JSON.stringify({ id: id, name: newName, price: newprice, content: newcontent, position: newposition }),
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
                            getPlanList(page, perPage);
                        });
                    }
                    else {
                        setVisibleedit(false)
                        swal({
                            text: data.message,
                            type: "error",
                            icon: "error"
                        }).then(function () {
                            getPlanList(page, perPage);

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
            fetch(`${API_URL}/api/planUpdate`, requestOption)
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    if (data.status === 200) {
                        swal({
                            text: "Status Updated Successfully",
                            icon: "success",
                            button: "OK",
                        });
                        getPlanList(page, perPage)
                    } else {
                        swal({
                            text: "Status Not Updated",
                            icon: "error",
                            button: "OK",
                        });
                        getPlanList(page, perPage)
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        } catch (err) {
            console.log(err)
        }
    }


    const handleContentChange = (index, event) => {
        const newContent = [...content];
        newContent[index] = event.target.value;
        setContent(newContent);
    };

    const addContentField = () => {
        setContent([...content, '']);
    };

    const removeContentField = (index) => {
        const newContent = [...content];
        newContent.splice(index, 1);
        setContent(newContent);
    };


    const handleEditContentChange = (index, event) => {
        const updatedContent = [...newcontent];
        updatedContent[index] = event.target.value;
        setNewContent(updatedContent);
    };

    const addEditContentField = () => {
        setNewContent([...newcontent, '']);
    };

    const removeEditContentField = (index) => {
        const updatedContent = [...newcontent];
        updatedContent.splice(index, 1);
        setNewContent(updatedContent);
    };


    const allowOnlyNumbers = (e) => {
        e.preventDefault();
        const input = e.target;
        let value = input.value.replace(/[^\d.]/g, ''); // Replace any non-numeric characters except the decimal point

        // Ensure there's only one decimal point
        const parts = value.split('.');
        if (parts.length > 2) {
            value = parts[0] + '.' + parts.slice(1).join(''); // Keep the first decimal point and remove the others
        }

        input.value = value; // Set the input value to the filtered value
    };













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
                                            <h4 className="card-title">Plan List</h4>
                                        </div>

                                        {/* <div className="col-md-6">
                                            <button className='btn btn-primary' style={{ float: "right" }} onClick={() => setShowModal(true)}>Add Plan</button>
                                        </div> */}

                                    </div>
                                </div>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-md-12">
                                            {/* {isloading && (
                                                <div className="d-flex justify-content-center">
                                                    <CSpinner color="primary" variant="grow" />
                                                </div>
                                            )} */}
                                            <table className="table table-bordered">
                                                <thead>
                                                    <tr>
                                                        <th>Sr No.</th>
                                                        <th>Name</th>
                                                        <th>Price</th>
                                                        <th>Content</th>
                                                        <th>Status</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {isloading ? (
                                                        <tr>

                                                            <td colSpan={6} className='loadercenter'> <CSpinner color="primary" variant="grow" /></td>

                                                        </tr>
                                                    ) : (

                                                        <>
                                                {userTypelist?.length > 0 ?
                                                    userTypelist?.map((item, index) => {
                                                        return (
                                                            <tr key={index}>
                                                                <td>{startFrom + index + 1}</td>
                                                                <td>{item.name}</td>
                                                                <td>{item.price}</td>
                                                                <td style={{textAlign:'start'}}>{item.content.map((val,index1)=>
                                                                <div key={index1}>
                                                                <li style={{paddingLeft:'20px'}}>{val}</li>
                                                                </div>
                                                                )}</td>
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
                                                    })
                                                    :
                                                    <tr>
                                                        <td colSpan={6} className='loadercenter'>No Records Found</td>
                                                    </tr>
                                                }
                                                </>
                                                    )}


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

                                                    <label className="form-label"><strong>Add Name</strong></label>
                                                    <input type='text' className="form-control"
                                                        name='type'
                                                        placeholder='Enter Name'
                                                        defaultValue=""
                                                        required
                                                        autoComplete="off"
                                                        onChange={(e) => setName(e.target.value)}
                                                    />
                                                </div>
                                                <div className="col-md-6">

                                                    <label className="form-label"><strong>Add Price</strong></label>
                                                    <input type='text' className="form-control"
                                                        name='type'
                                                        placeholder='Enter Price'
                                                        defaultValue=""
                                                        required
                                                        autoComplete="off"
                                                        onChange={(e) => setPrice(e.target.value)}
                                                        onInput={allowOnlyNumbers}
                                                        min={0}


                                                    />
                                                </div>
                                                
                                                <div className="col-md-6">

                                                    <label className="form-label"><strong>Add Position</strong></label>
                                                    <input type='text' className="form-control"
                                                        name='type'
                                                        placeholder='Enter Position'
                                                        defaultValue=""
                                                        required
                                                        autoComplete="off"
                                                        onChange={(e) => setPosition(e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="row mt-3">
                                                    <div className="col-md-12">
                                                        <label className="form-label"><strong>Content</strong></label>
                                                        {content.map((contentItem, index) => (
                                                            <div key={index} className="d-flex align-items-center mb-2">
                                                                <input type='text' className="form-control"
                                                                    placeholder='Enter Content'
                                                                    required
                                                                    autoComplete="off"
                                                                    value={contentItem}
                                                                    onChange={(e) => handleContentChange(index, e)}
                                                                />
                                                                <button type="button" className="btn btn-danger ms-2" onClick={() => removeContentField(index)}>Remove</button>
                                                            </div>
                                                        ))}
                                                        <button type="button" className="btn btn-secondary" onClick={addContentField}>Add Content</button>
                                                    </div>
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
                    <Modal.Title>Edit Plan</Modal.Title>
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
                                                    <label className="form-label"><strong>Name</strong></label>
                                                    <input type='text' className="form-control"
                                                        placeholder='Enter Name'
                                                        value={newName}
                                                        autoComplete="off"
                                                        required
                                                        onChange={(e) => setNewName(e.target.value)}
                                                    />
                                                </div>
                                                <div className="col-md-6">
                                                    <label className="form-label"><strong>Price</strong></label>
                                                    <input type='text' className="form-control"
                                                        placeholder='Enter Price'
                                                        value={newprice}
                                                        autoComplete="off"
                                                        required
                                                        onChange={(e) => setNewPrice(e.target.value)}
                                                        onInput={allowOnlyNumbers}
                                                        min={0}
                                                    />
                                                </div>
                                                {/* <div className="col-md-6">
                                                    <label className="form-label"><strong>Position</strong></label>
                                                    <input type='text' className="form-control"
                                                        placeholder='Enter Position'
                                                        value={newposition}
                                                        autoComplete="off"
                                                        required
                                                        onChange={(e) => setNewPosition(e.target.value)}
                                                    />
                                                </div> */}
                                            </div>
                                            <div className="row mt-3">
                                                <div className="form-group">
                                                    <label><strong>Content:</strong></label>
                                                    {newcontent.map((item, index) => (
                                                        <div key={index} className="input-group mb-2">
                                                            <input type="text" className="form-control" value={item} onChange={(e) => handleEditContentChange(index, e)} />
                                                            <div className="input-group-append">
                                                                <button className="btn btn-danger" type="button" onClick={() => removeEditContentField(index)}>x</button>
                                                            </div>
                                                        </div>
                                                    ))}
                                                    <button type="button" className="btn btn-secondary" onClick={addEditContentField}>Add Content</button>
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

export default Plan;