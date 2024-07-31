import React from 'react';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import swal from 'sweetalert';
import { Container, Row, Modal, Button } from 'react-bootstrap';
import API_URL from '../../../../config';
import Select from 'react-select'
import { CSpinner } from '@coreui/react';


const State = () => {

    const [userTypelist, setUserTypelist] = useState([]);
    const [perPage] = useState(20);
    const [pageCount, setPageCount] = useState(0);
    const [page, setPage] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [visibleedit, setVisibleedit] = useState(false);
    const [id, setId] = useState('');
    const [type, setType] = useState('');
    const [addstatetype, setStatetype] = useState('');
    const [options, setOptions] = useState([]);
    const [selectedOption, setSelectedOption] = useState("");
    const [country_id, setCountry_id] = useState('');
    const [searchcountry, setSearchcountry] = useState('');
    const [searchstate, setSearchstate] = useState('');
    const [searchcountryvalue, setSearchcountryvalue] = useState('');
    const [isloading, setIsloading] = useState(false);


    useEffect(() => {
        getStateList(page, perPage)
        getCountryList()
    }, [])

    useEffect(() => {
        getStateList(page, perPage)
    }, [searchcountry, searchstate])


    const handleSelectChange = (selectedOption) => {
        const selectedValue = selectedOption;
        console.log('selectedValue', selectedValue)
        setSelectedOption(selectedValue);
    };

    const handleeditSelectChange = (selectedOption) => {
        const selectedValue = selectedOption;
        console.log('selectedValue', selectedValue)
        setCountry_id(selectedValue);
    };

    const handleSearchCountry = (selectedstate) => {
        setSearchcountry(selectedstate)
        setSearchcountryvalue(selectedstate.value)
    }


    const getStateList = async (page, perPage) => {
        try {
            setIsloading(true)
            const requestOption = {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            }
            await fetch(`${API_URL}/api/stateList?page=${page}&limit=${perPage}&country=${searchcountryvalue}&state=${searchstate}`, requestOption)
                .then((response) => response.json())
                .then((data) => {
                    console.log(data.data.data)
                    if (data.status == 200) {
                        const total = data.total;
                        const slice = total / perPage;
                        const pages = Math.ceil(slice);
                        setPageCount(pages);
                        setUserTypelist(data.data.data)
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
        getStateList(selectedPage, perPage);
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
            await fetch(`${API_URL}/api/getStateDetailsById?id=${id}`, requestOption)
                .then((response) => response.json())
                .then((data) => {
                    if (data.status == 200) {
                        console.log(data)
                        setType(data?.data[0]?.state_name)
                        setCountry_id(data?.data.map((item) => {
                            return { value: item.country._id, label: item.country.country_name }
                        }))
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
        console.log("addusertype>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", addstatetype)
        try {

            if (!selectedOption.value) {
                swal("Please Select Country", {
                    icon: "warning",
                });
                return;
            }
            else if (!addstatetype) {
                swal("Please Enter Type", {
                    icon: "warning",
                });
                return;
            }

            const requestOption = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ country_id: selectedOption.value, state_name: addstatetype }),
            }
            await fetch(`${API_URL}/api/addState`, requestOption)
                .then((response) => response.json())
                .then((data) => {
                    if (data.status == 200) {
                        swal(data.message, {
                            icon: "success",
                        });
                        setShowModal(false)
                        setSelectedOption('')
                        getStateList(page, perPage)

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
            await fetch(`${API_URL}/api/stateUpdate`, {
                method: 'put',
                body: JSON.stringify({ id: id, state_name: type, country_id: country_id["value"] }),
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
                            getStateList(page, perPage);
                        });
                    }
                    else {
                        setVisibleedit(false)
                        swal({
                            text: data.message,
                            type: "error",
                            icon: "error"
                        }).then(function () {
                            getStateList(page, perPage);

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
            fetch(`${API_URL}/api/stateUpdate`, requestOption)
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    if (data.status === 200) {
                        swal({
                            text: "Status Updated Successfully",
                            icon: "success",
                            button: "OK",
                        });
                        getStateList(page, perPage)
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



    const getCountryList = async () => {
        try {
            const requestOption = {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            }
            await fetch(`${API_URL}/api/countryList`, requestOption)
                .then((response) => response.json())
                .then((data) => {
                    console.log(data)
                    if (data.status == 200) {
                        const countrydata = data.data.map((item) => {
                            return { value: item._id, label: item.country_name }
                        }
                        )
                        setOptions(countrydata)


                    } else {
                        console.log(data.message)
                    }
                })

        } catch (err) {
            console.error(err.message)
        }
    }

    // console.log('Option', options)

    console.log('searchcountry', searchcountry)
    console.log('searchstate', searchstate)


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
                                            <h4 className="card-title">State List</h4>
                                        </div>

                                        <div className="col-md-6">
                                            <button className='btn btn-primary' style={{ float: "right" }} onClick={() => setShowModal(true)}>Add State</button>
                                        </div>

                                    </div>
                                </div>
                                <div className="card-body">
                                    <div className='row card-header' style={{ marginLeft: '10px', marginRight: '10px', alignItems: 'center', paddingTop: '5px', paddingBottom: '5px' }}>
                                        <div className='col-lg-3'>
                                            <label><strong>Select Country</strong></label><br />
                                            <Select options={options}
                                                name='type'
                                                placeholder='select country'
                                                selected={searchcountry}
                                                defaultValue={searchcountry}
                                                required
                                                autoComplete="off"
                                                onChange={handleSearchCountry}
                                            />
                                        </div>
                                        <div className='col-lg-3'>
                                            <label><strong>Search State</strong></label><br />
                                            <input type="text" className="form-control" placeholder="Search" onChange={(e) => setSearchstate(e.target.value)} />
                                        </div>
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
                                                        <th>State</th>
                                                        <th>Country</th>
                                                        <th>Status</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {isloading ? (
                                                        <tr>

                                                            <td colSpan={5} className='loadercenter'> <CSpinner color="primary" variant="grow" /></td>

                                                        </tr>
                                                    ) : (

                                                        <>
                                                            {
                                                                userTypelist.length > 0 ?
                                                                    (
                                                                        userTypelist?.map((item, index) => {
                                                                            return (
                                                                                <tr key={index}>
                                                                                    <td>{startFrom + index + 1}</td>
                                                                                    <td>{item.state_name}</td>
                                                                                    <td>{item.country.country_name}</td>
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

                                                                                        </div>
                                                                                    </td>
                                                                                    <td>
                                                                                        <button className="btn btn-primary" onClick={() => getdetails(item._id)}>Edit</button>
                                                                                    </td>
                                                                                </tr>
                                                                            );
                                                                        })
                                                                    )
                                                                    :
                                                                    (
                                                                        <tr>
                                                                                <td colSpan={5}> No Records Found</td>
                                                                        </tr>
                                                                    )
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
                    <Modal.Title>Add State</Modal.Title>
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

                                                    <label className="form-label"><strong>Select Country</strong></label>
                                                    <Select
                                                        options={options}
                                                        name='type'
                                                        placeholder='select country'
                                                        selected={selectedOption}
                                                        defaultValue={selectedOption}
                                                        required
                                                        autoComplete="off"
                                                        onChange={handleSelectChange}
                                                    />
                                                </div>
                                                <div className="col-md-6">

                                                    <label className="form-label"><strong>Add State</strong></label>
                                                    <input type='text' className="form-control"
                                                        name='type'
                                                        placeholder='Enter State Name'
                                                        defaultValue=""
                                                        required
                                                        autoComplete="off"
                                                        onChange={(e) => setStatetype(e.target.value)}
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

                                                    <label className="form-label"><strong>Select Country</strong></label>
                                                    <Select
                                                        options={options}
                                                        name='type'
                                                        placeholder='select country'
                                                        selected={country_id}
                                                        defaultValue={country_id}
                                                        required
                                                        autoComplete="off"
                                                        onChange={handleeditSelectChange}
                                                    />
                                                </div>
                                                <div className="col-md-6">
                                                    <label className="form-label"><strong>Edit State</strong></label>
                                                    <input type='text' className="form-control"
                                                        name='usertype'
                                                        placeholder='Enter State Name'
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

export default State;