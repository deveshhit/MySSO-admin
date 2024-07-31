import React,{ useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import swal from 'sweetalert';
import { Container, Row, Modal, Button } from 'react-bootstrap';
import API_URL from '../../../../config';
import { CSpinner } from '@coreui/react';



const Viewcountry = () => {

    const [usercountrydatalist, setUsercountrydatalist] = useState([]);
    const [perPage] = useState(20);
    const [pageCount, setPageCount] = useState(0);
    const [page, setPage] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [visibleedit, setVisibleedit] = useState(false);
    const [id, setId] = useState('');
    const [countrydata, setCountrydata] = useState('');
    const [country, setCountry] = useState('');
    const [countrysearch, setCountrysearch] = useState('');
    const [isloading, setIsloading] = useState(false);



    useEffect(() => {
        if (localStorage.getItem('token') === null) {
            window.location.href = '/'
        } else {
        getCountryList(page, perPage)
        }
    }, [])

    useEffect(() => {
        getCountryList(page, perPage)
    }, [countrysearch])

    const getCountryList = async (page, perPage) => {
        try {
            setIsloading(true)
            const requestOption = {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            }
            await fetch(`${API_URL}/api/countryList?page=${page}&limit=${perPage}&country=${countrysearch}`, requestOption)
                .then((response) => response.json())
                .then((data) => {
                    console.log(data)
                    if (data.status == 200) {
                        const total = data.total;
                        const slice = total / perPage;
                        const pages = Math.ceil(slice);
                        setPageCount(pages);
                        setUsercountrydatalist(data.data.data)
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
        getCountryList(selectedPage, perPage);
    };

    const getdetails = async (id) => {
        try {
            setId(id)
            const requestOption = {
                method: "GET",
                headers: {
                    "Content-countrydata": "application/json"
                }
            }
            await fetch(`${API_URL}/api/getCountrydetailsbyid?id=${id}`, requestOption)
                .then((response) => response.json())
                .then((data) => {
                    if (data.status == 200) {
                        setCountrydata(data.data.country_name)
                    } else {
                        console.log(data.message)
                    }
                })

            setVisibleedit(true)
        } catch (err) {
            console.error(err.message)
        }
    }

    const addusercountrydatadata = async (e) => {
        e.preventDefault();
        console.log("addusercountrydata>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", country)
        try {

            if (!country) {
                swal("Please Enter countrydata", {
                    icon: "error",
                });
                return;
            }

            const requestOption = {
                method: "POST",
                headers: {
                    "Content-countrydata": "application/json"
                },
                body: JSON.stringify({ country_name: country }),
            }
            await fetch(`${API_URL}/api/addCountry`, requestOption)
                .then((response) => response.json())
                .then((data) => {
                    if (data.status == 200) {
                        swal(data.message, {
                            icon: "success",
                        });
                        setShowModal(false)
                        getCountryList(page, perPage)
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

    const updateusercountrydata = async (e) => {
        e.preventDefault();
        try {

            if (!countrydata) {
                swal("Please Enter Country Name", {
                    icon: "warning",
                });
                return;
            }
            await fetch(`${API_URL}/api/countryUpdate`, {
                method: 'put',
                body: JSON.stringify({ id: id, country_name: countrydata }),
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
                            countrydata: "success",
                            icon: "success"
                        }).then(function () {
                            getCountryList(page, perPage);
                        });
                    }
                    else {
                        setVisibleedit(false)
                        swal({
                            text: data.message,
                            countrydata: "error",
                            icon: "error"
                        }).then(function () {
                            getCountryList(page, perPage);

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
            fetch(`${API_URL}/api/countryUpdate`, requestOption)
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
                                            <h4 className="card-title">Country List</h4>
                                        </div>

                                        <div className="col-md-6">
                                            <button className='btn btn-primary' style={{ float: "right" }} onClick={() => setShowModal(true)}>Add Country</button>
                                        </div>

                                    </div>
                                </div>
                                <div className="card-body">
                                    <div className='row card-header' style={{ marginLeft: '10px', marginRight: '10px', alignItems: 'center', paddingTop: '5px', paddingBottom: '5px' }}>
                                        <div className='col-lg-3'>
                                            <label><strong>Search By Name</strong></label><br />
                                            <input type="text" className="form-control" placeholder="Search" onChange={(e)=>setCountrysearch(e.target.value)} />
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
                                                        <th>Name</th>
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
                                                {usercountrydatalist.length > 0 ? 
                                                    usercountrydatalist?.map((item, index) => {
                                                        return (
                                                            <tr key={index}>
                                                                <td>{startFrom + index + 1}</td>
                                                                <td>{item.country_name}</td>
                                        
                                                                <td>
                                                                    <div className="form-check form-switch">
                                                                        <input
                                                                            className="form-check-input"
                                                                            type="checkbox"
                                                                            id={`statusSwitch_${index}`}
                                                                            defaultChecked={item.status === 1}
                                                                            onChange={async (e) => {
                                                                                const isChecked = e.target.checked;
                                                                                if (window.confirm(`Are you sure you want to ${isChecked ? 'activate' : 'deactivate'} this staff?`)) {
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
                                                        <td colSpan={5} className='loadercenter'>No Records Found</td>
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
                    <Modal.Title>Add Country</Modal.Title>
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

                                                    <label className="form-label"><strong>Add Country</strong></label>
                                                    <input countrydata='text' className="form-control"
                                                        name='countrydata'
                                                        placeholder='Enter Looking For countrydata'
                                                        defaultValue=""
                                                        required
                                                        autoComplete="off"
                                                        onChange={(e) => setCountry(e.target.value)}
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
                    <button countrydata="submit" className="btn btn-primary mt-2 submit_all" style={{ float: "right" }} onClick={addusercountrydatadata}>Submit</button>
                    <button className="btn btn-secondary mt-2 submit_all" onClick={() => setShowModal(false)}>
                        Close
                    </button>
                </Modal.Footer>
            </Modal>

            <Modal size='lg' show={visibleedit} onHide={() => setVisibleedit(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Country</Modal.Title>
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
                                                    <label className="form-label"><strong>Edit Country Name</strong></label>
                                                    <input countrydata='text' className="form-control"
                                                        name='usercountrydata'
                                                        placeholder='Enter Role Name'
                                                        defaultValue={countrydata}
                                                        autoComplete="off"
                                                        required
                                                        onChange={(e) => setCountrydata(e.target.value)}
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
                    <button countrydata="submit" className="btn btn-primary mt-2 submit_all" style={{ float: "right" }} onClick={updateusercountrydata}>Submit</button>
                    <button className="btn btn-secondary mt-2 submit_all" onClick={() => setVisibleedit(false)}>
                        Close
                    </button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default Viewcountry;