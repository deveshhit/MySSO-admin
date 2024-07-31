import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import swal from 'sweetalert';
import { Container, Row, Modal, Button } from 'react-bootstrap';
import profile from "../../../assets/profile.png"
import API_URL from '../../../config';
import { CFormSwitch, CSpinner } from '@coreui/react';

const Users = () => {

    const Navigate = useNavigate();

    const [data, setData] = useState([]);
    const [perPage] = useState(10);
    const [pageCount, setPageCount] = useState(0);
    const [page, setPage] = useState(1);
    const [isloading, setIsloading] = useState(false);

    const [searchid, setSearchid] = useState('');
    const [searchname, setSearchname] = useState('');
    const [searchemail, setSearchemail] = useState('');
    const [searchmobile, setSearchmobile] = useState('');


    useEffect(() => {
        getUserdata(page, perPage)
    }, [])

    useEffect(() => {
        getUserdata(page, perPage)
    }, [searchid, searchname, searchemail, searchmobile])


    const getUserdata = async (page, perPage) => {
        try {
            setIsloading(true)
            const requestOptions = {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            }
            await fetch(`${API_URL}/api/getUsersList?page=${page}&limit=${perPage}&searchid=${searchid}&searchname=${searchname}&searchemail=${searchemail}&searchmobile=${searchmobile}`, requestOptions)
                .then(response => response.json())
                .then((data) => {
                    if (data.status == 200) {
                        const total = data.total;
                        const slice = total / perPage;
                        const pages = Math.ceil(slice);
                        setPageCount(pages);
                        setData(data.data)
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

        } catch (error) {
            console.log(error)
        }
    };

    console.log(data)

    const handlePageClick = (e) => {
        const selectedPage = e.selected + 1;
        setPage(selectedPage);
        getUserdata(selectedPage, perPage);
    };

    const startFrom = (page - 1) * perPage;



    // const updatestatusverify = async (status,id) => {
    //     try {

    //         console.log(status)
    //         setIsloading(true)
    //         const requestOptions = {
    //             method: "PUT",
    //             headers: {
    //                 "Content-Type": "application/json",
    //                 "Authorization": `Bearer ${localStorage.getItem('token')}`
    //             },
    //             body: JSON.stringify({id:id, isMatrimonyVerified: status })
    //         }
    //         await fetch(`${API_URL}/api/updatestatus`, requestOptions)
    //             .then(response => response.json())
    //             .then((data) => {
    //                 if (data.status == 200) {
    //                     swal({
    //                         text: data.message,
    //                         icon: "success",
    //                     });
    //                     // Update the data state directly
    //                     const updatedData = data.map(user =>
    //                         user._id === id ? { ...user, isMatrimonyVerified: status } : user
    //                     );
    //                     setData(updatedData);
    //                     setIsloading(false)
    //                 } else {
    //                     console.log(data.message)
    //                     swal({
    //                         text: data.message,
    //                         icon: "error",
    //                     });
    //                     setIsloading(false)
    //                 }
    //             })
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    const updatestatusverify = async (status, id,email) => {
        try {
            setIsloading(true)
            const requestOptions = {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id: id, isMatrimonyVerified: status,email:email })
            }
            await fetch(`${API_URL}/api/updatestatus`, requestOptions)
                .then(response => response.json())
                .then((data) => {
                    if (data.status == 200) {
                        swal({
                            text: data.message,
                            icon: "success",
                        });
                        setIsloading(false)
                        getUserdata(page, perPage)
                    } else {
                        console.log(data.message)
                        swal({
                            text: data.message,
                            icon: "error",
                        });
                        setIsloading(false)
                    }
                })
        }
        catch (error) {
            console.log(error);
        }
    }

    const deleteuser = async (id) => {
        try {
            setIsloading(true)
            const requestOptions = {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                }
            }
            await fetch(`${API_URL}/api/deleteuser?id=${id}`, requestOptions)
                .then(response => response.json())
                .then((data) => {
                    if (data.status == 200) {
                        swal({
                            text: data.message,
                            icon: "success",
                        });
                        setIsloading(false)
                        getUserdata(page, perPage)
                    } else {
                        console.log(data.message)
                        swal({
                            text: data.message,
                            icon: "error",
                        });
                        setIsloading(false)
                    }
                })
        }
        catch (error) {
            console.log(error);
        }
    }

    const formatDate = (isoString) => {
        const date = new Date(isoString);
        return date.toISOString().slice(0, 19).replace('T', ' ');
    };


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
                                            <h4 className="card-title">Users</h4>
                                        </div>
                                        <div className="card-body">
                                            <div className='row card-header' style={{ marginLeft: '10px', marginRight: '10px', alignItems: 'center', paddingTop: '5px', paddingBottom: '5px' }}>
                                                <div className='col-lg-3'>
                                                    <label><strong>Search By Memberid</strong></label><br />
                                                    <input type="text" className="form-control" placeholder="Search" onChange={(e)=> setSearchid(e.target.value)} />
                                                </div>
                                                <div className='col-lg-3'>
                                                    <label><strong>Search By Name</strong></label><br />
                                                    <input type="text" className="form-control" placeholder="Search" onChange={(e) => setSearchname(e.target.value)} />
                                                </div>
                                                <div className='col-lg-3'>
                                                    <label><strong>Search By Email</strong></label><br />
                                                    <input type="text" className="form-control" placeholder="Search" onChange={(e) => setSearchemail(e.target.value)} />
                                                </div>
                                                <div className='col-lg-3'>
                                                    <label><strong>Search By Mobile Number</strong></label><br />
                                                    <input type="text" className="form-control" placeholder="Search" onChange={(e) => setSearchmobile(e.target.value)} />
                                                </div>
                                            </div>
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
                                                            <th>Profile Picture</th>
                                                            <th>Memberid</th>
                                                            <th>Name</th>
                                                            <th>Email</th>
                                                            <th>Mobile Number</th>
                                                            <th>Plan</th>
                                                            {/* <th>Created At</th> */}
                                                            <th>Status</th>
                                                            <th>Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {isloading ? (
                                                            <tr>

                                                                <td colSpan={9} className='loadercenter'> <CSpinner color="primary" variant="grow" /></td>

                                                            </tr>
                                                        ) : (

                                                            <>
                                                                {data.length > 0 ?
                                                                    data?.map((item, index) => {
                                                                        return (
                                                                            <tr key={index}>
                                                                                <td>{startFrom + index + 1}</td>
                                                                                <td> <img className='img-icon' src={!item?.profile_image || !item?.profile_image.length ? profile : `${API_URL}/uploads/user_profile/${item?.profile_image?.map(val => val.filename)}`} alt="Profile" height={50} width={50} /></td>
                                                                                <td>{item.member_id}</td>
                                                                                <td>{`${item?.first_name} ${item?.middle_name} ${item?.last_name}`}</td>
                                                                                <td>{item.email}</td>
                                                                                <td>{item.phone}</td>
                                                                                <td>{item?.plan_details?.map(val => val.name)}</td>
                                                                                {/* <td>{formatDate(item.createdAt)}</td> */}
                                                                                {/* <td>{item.isMatrimonyVerified === true ? 'Active' : 'Inactive'}</td> */}
                                                                                <td>
                                                                                    <CFormSwitch 
                                                                                    id="formSwitchCheckChecked" 
                                                                                        defaultChecked={item.isMatrimonyVerified === true}
                                                                                    onChange={(e) => updatestatusverify(e.target.checked, item._id,item.email)}
                                                                                    />
                                                                                </td>
                                                                                <td>
                                                                                    <button className="btn btn-primary" onClick={() => Navigate(`/Usersdetail?id=${item._id}`)} ><i className='fa fa-eye'></i></button>{' '}
                                                                                    {/* <button className="btn btn-danger" >Delete</button> */}
                                                                                    <button className='btn btn-danger' onClick={() => { if (window.confirm('Are you sure you wish to delete this user?')) deleteuser(item._id) }}><i className='fa fa-trash'></i></button>
                                                                                </td>
                                                                                
                                                                            </tr>
                                                        )
                                                                    })
                                                        :
                                                        <tr>
                                                            <td colSpan={9} className='loadercenter'>No Records Found</td>
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
        </div>
        </div >
    )
}

export default Users