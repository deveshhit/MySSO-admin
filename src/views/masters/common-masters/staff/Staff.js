import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import swal from 'sweetalert'
import ReactPaginate from "react-paginate";
import API_URL from '../../../../config'
import { CSpinner } from '@coreui/react';

const Staff = () => {

    const [userTypelist, setUserTypelist] = useState([]);
    const [data , setData] = useState([])
    const [perPage] = useState(10);
    const [pageCount, setPageCount] = useState(0);
    const [page, setPage] = useState(1);
    const [searchname, setSearchname] = useState('');
    const [searchemail, setSearchemail] = useState('');
    const [searchphone, setSearchphone] = useState('');
    const [userTypefilter, setUserTypefilter] = useState('')
    const [isloading, setIsloading] = useState(false);

    useEffect(() => {
        if (localStorage.getItem('token') === null) {
            window.location.href = '/'
        } else {
        getstafflist(page, perPage)
        getusertype()
        }
    }, [])

    useEffect(() => {
        getstafflist(page, perPage);
    }, [searchname, searchemail, searchphone, userTypefilter]);


    const getusertype = async () => {
        try {
            setIsloading(true)
            const requestOption = {
                method: "GET"
            }
            await fetch(`${API_URL}/api/userTypeList`, requestOption)
                .then((response) => response.json())
                .then((data) => {

                    console.log(data)
                    if (data.status == 200) {
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


    const getstafflist = (page, perPage) => {
       try{
        const requestOption = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }
           fetch(`${API_URL}/api/adminList?page=${page}&limit=${perPage}&userType=${userTypefilter}&name=${searchname}&email=${searchemail}&phone=${searchphone}`, requestOption)
            .then(response => response.json())
            .then(data => {
                console.log(data.data)
                const total = data.data.total[0].total;
                const slice = total / perPage;
                const pages = Math.ceil(slice);
                setPageCount(pages);
                setData(data.data.data)
            })
            .catch(err => {
                console.log(err)
            })
       } catch (err) {
              console.log(err)
         }
    }



    const updatestatus = (id, status) => {
        try{
            const requestOption = {
                method: 'Put',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: status, id: id})
            }
            fetch(`${API_URL}/api/adminUpdate`, requestOption)
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

    const handlePageClick = (e) => {
        const selectedPage = e.selected + 1;
        setPage(selectedPage);
        getstafflist(selectedPage, perPage);
    };


    const startFrom = (page - 1) * perPage;


    return (
        <div className="container">

            <div className="row">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-header">
                            <div className="row">
                                <div className="col-md-6">
                                    <h4 className="card-title">Staff List</h4>
                                </div>

                                <div className="col-md-6">
                                  
                                    <a href="/AddStaff" className="btn btn-primary" style={{ float: 'right' }}>Add Staff</a>
                                       
                                </div>
                            </div>
                        </div>
                        <div className="card-body">
                            <div className='row card-header' style={{ marginLeft: '10px', marginRight: '10px', alignItems: 'center', paddingTop: '5px', paddingBottom: '5px' }}>
                                <div className='col-lg-3'>
                                    <label><strong>Search By Name</strong></label><br />
                                    <input type="text" className="form-control" placeholder="Search" onChange={(e) => setSearchname(e.target.value)} />
                                </div>
                                <div className='col-lg-3'>
                                    <label><strong>Search By Email</strong></label><br />
                                    <input type="text" className="form-control" placeholder="Search" onChange={(e) => setSearchemail(e.target.value)} />
                                </div>
                                <div className='col-lg-3'>
                                    <label><strong>Search By Phone</strong></label><br />
                                    <input type="text" className="form-control" placeholder="Search" onChange={(e) => setSearchphone(e.target.value)} />
                                </div>
                                <div className='col-lg-3'>
                                    <label><strong>Select User Type</strong></label><br />
                                    <select className='form-control'
                                        onChange={(e) => setUserTypefilter(e.target.value)}
                                        value={userTypefilter}
                                    >
                                        <option hidden>Select User Type</option>
                                        <option value="">All</option>
                                        {
                                            userTypelist?.map((item, index) => (
                                                <option key={index} value={item._id}>{item.usertype}</option>
                                            ))
                                        }
                                        {/* <option value="Customer">Customers</option> */}

                                    </select>
                                </div>
                            </div>
                        </div>


                        <div className="card-body">
                            {/* {isloading && (
                                <div className="d-flex justify-content-center">
                                    <CSpinner color="primary" variant="grow" />
                                </div>
                            )} */}
                            <div className="table-responsive">
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th>Sr No.</th>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Phone</th>
                                            <th>Role</th>
                                            <th>Status</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {isloading ? (
                                            <tr>

                                                <td colSpan={7} className='loadercenter'> <CSpinner color="primary" variant="grow" /></td>

                                            </tr>
                                        ) : (

                                            <>
                                        { data?.length > 0 ?
                                            data?.map((item, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td>{startFrom + index + 1}</td>
                                                        <td>{item.name}</td>
                                                        <td>{item.email}</td>
                                                        <td>{item.phone}</td>
                                                        <td>{item?.usertype?.usertype}</td>
                                                        {/* <td>
                                                            
                                                            {
                                                                item.status === 1 ?
                                                                    <button className="btn btn-danger" onClick={() => { if (window.confirm('Are you sure you wish to deactivate this item?')) updatestatus(item._id, 0) }}>Deactivate</button> :
                                                                    <button className="btn btn-success" onClick={() => { if (window.confirm('Are you sure you wish to activate this item?')) updatestatus(item._id, 1) }}>Activate</button>
                                                            }
                                                        </td> */}
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
                                                            <Link to={`/EditStaff?id=${item._id}?usertype=${item?.usertype?.usertype}`} className="btn btn-primary">Edit</Link>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                            :
                                            <tr>
                                                <td colSpan={7} className='loadercenter'>No Record Found</td>
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
    )
}

export default Staff