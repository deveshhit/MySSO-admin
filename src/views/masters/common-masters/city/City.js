import React from 'react';
import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import swal from 'sweetalert';
import { Container, Row, Modal, Button } from 'react-bootstrap';
import API_URL from '../../../../config';
import Select from 'react-select'
import { BounceLoader, ClipLoader } from 'react-spinners';
import { CSpinner } from '@coreui/react';



const City = () => {

    const [userTypelist, setUserTypelist] = useState([]);
    const [perPage] = useState(20);
    const [pageCount, setPageCount] = useState(0);
    const [page, setPage] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [visibleedit, setVisibleedit] = useState(false);
    const [id, setId] = useState('');
    const [type, setType] = useState('');
    const [addcitytype, setCitytype] = useState('');
    const [options, setOptions] = useState([]);
    const [selectedOption, setSelectedOption] = useState("");
    const [searchstate, setSearchstate] = useState('');
    const [searchcity, setSearchcity] = useState('');
    const [searchstatevalue, setSearchStatevalue] = useState('');
    const [state_id, setState_id] = useState('');
    const [loading, setLoading] = useState(false);
    const [addstatetype, setStatetype] = useState('');


    useEffect(() => {
        getCityList(page, perPage)
        getStateList()
    }, [])

    useEffect(() => {
        getCityList(page, perPage)
    }, [searchstate, searchcity])

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


    const handleSearchState = (selectedstate) => {
        setSearchstate(selectedstate)
        setSearchStatevalue(selectedstate.value)
    }

    const getCityList = async (page, perPage) => {
        try {
            setLoading(true)
            const requestOption = {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            }
            await fetch(`${API_URL}/api/cityList?page=${page}&limit=${perPage}&state=${searchstatevalue}&city=${searchcity}`, requestOption)
                .then((response) => response.json())
                .then((data) => {
                    if (data.status == 200) {
                        const total = data.total;
                        const slice = total / perPage;
                        const pages = Math.ceil(slice);
                        setPageCount(pages);
                        setUserTypelist(data.data.data)
                        setLoading(false)
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
        getCityList(selectedPage, perPage);
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
            await fetch(`${API_URL}/api/getCityDetailsById?id=${id}`, requestOption)
                .then((response) => response.json())
                .then((data) => {
                    if (data.status == 200) {
                        setType(data.data[0]?.city_name)
                        setState_id(data?.data?.map((item) => {
                            return { value: item.state._id, label: item.state.state_name }
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
        console.log("addusertype>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", addcitytype)
        try {

            if (!addcitytype) {
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
                body: JSON.stringify({ state_id: selectedOption?.value, city_name: addcitytype }),
            }
            await fetch(`${API_URL}/api/addCity`, requestOption)
                .then((response) => response.json())
                .then((data) => {
                    if (data.status == 200) {
                        swal(data.message, {
                            icon: "success",
                        });
                        setShowModal(false)
                        getCityList(page, perPage)
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
            await fetch(`${API_URL}/api/cityUpdate`, {
                method: 'put',
                body: JSON.stringify({ id: id, city_name: type, state_id: state_id["value"] }),
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
                            getCityList(page, perPage);
                        });
                    }
                    else {
                        setVisibleedit(false)
                        swal({
                            text: data.message,
                            type: "error",
                            icon: "error"
                        }).then(function () {
                            getCityList(page, perPage);

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
            fetch(`${API_URL}/api/cityUpdate`, requestOption)
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


    const getStateList = useCallback(async () => {
        try {
            const requestOption = {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            }
            await fetch(`${API_URL}/api/stateList`, requestOption)
                .then((response) => response.json())
                .then((data) => {
                    console.log(data)
                    if (data.status == 200) {
                        const countrydata = data.data.map((item) => {
                            return { value: item._id, label: item.state_name }
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
    }, [])

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
                                            <h4 className="card-title">City List</h4>
                                        </div>

                                        <div className="col-md-6">
                                            <button className='btn btn-primary' style={{ float: "right" }} onClick={() => setShowModal(true)}>Add Type</button>
                                        </div>

                                    </div>
                                </div>
                                <div className="card-body">
                                    <div className='row card-header' style={{ marginLeft: '10px', marginRight: '10px', alignItems: 'center', paddingTop: '5px', paddingBottom: '5px' }}>
                                        <div className='col-lg-3'>
                                            <label><strong>Select State</strong></label><br />
                                            <Select
                                                options={options}
                                                name='type'
                                                placeholder='Select State'
                                                selected={searchstate}
                                                defaultValue={searchstate}
                                                required
                                                autoComplete="off"
                                                onChange={handleSearchState}
                                            />
                                        </div>
                                        <div className='col-lg-3'>
                                            <label><strong>Search City</strong></label><br />
                                            <input type="text" className="form-control" placeholder="Search" onChange={(e) => setSearchcity(e.target.value)} />
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="table-responsive">
                                            <table className="table table-bordered">
                                                <thead>
                                                    <tr>
                                                        <th>Sr No.</th>
                                                        <th>City</th>
                                                        <th>State</th>
                                                        <th>Status</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                        {loading ? (    
                                                            <tr>
                                                              
                                                                <td colSpan={5} className='loadercenter'> <CSpinner color="primary" variant="grow" /></td>
                                                                
                                                            </tr>
                                                        ) : (

                                                    <>
                                                    {
                                                        userTypelist.length > 0 ?
                                                            (
                                                                userTypelist.map((item, index) => {
                                                                    return (
                                                                        <tr key={index}>
                                                                            <td>{startFrom + index + 1}</td>
                                                                            <td>{item?.city_name}</td>
                                                                            <td>{item?.state?.state_name}</td>
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
            </div>
            <Modal size='lg' show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Add City</Modal.Title>
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

                                                    <label className="form-label"><strong>Select State</strong></label>
                                                    <Select
                                                        options={options}
                                                        name='type'
                                                        placeholder='select State'
                                                        selected={selectedOption}
                                                        defaultValue={selectedOption}
                                                        required
                                                        autoComplete="off"
                                                        onChange={handleSelectChange}
                                                    />
                                                </div>
                                                <div className="col-md-6">

                                                    <label className="form-label"><strong>Add City</strong></label>
                                                    <input type='text' className="form-control"
                                                        name='type'
                                                        placeholder='Enter City Name'
                                                        defaultValue=""
                                                        required
                                                        autoComplete="off"
                                                        onChange={(e) => setCitytype(e.target.value)}
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

                                                    <label className="form-label"><strong>Select State</strong></label>
                                                    <Select
                                                        options={options}
                                                        name='type'
                                                        placeholder='select country'
                                                        selected={state_id}
                                                        defaultValue={state_id}
                                                        required
                                                        autoComplete="off"
                                                        onChange={handleeditSelectChange}
                                                    />
                                                </div>
                                                <div className="col-md-6">
                                                    <label className="form-label"><strong>Edit City</strong></label>
                                                    <input type='text' className="form-control"
                                                        name='usertype'
                                                        placeholder='Enter City Name'
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

export default City;