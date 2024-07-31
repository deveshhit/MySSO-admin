import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import swal from 'sweetalert'
import API_URL from '../../../../config'

const AddStaff = () => {
    const navigate = useNavigate()

    const [userTypelist, setUserTypelist] = useState([]);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [usertype, setUsertype] = useState('');
    const [password, setPassword] = useState('');


    useEffect(() => {
        getusertype()
    }, [])


    const getusertype = async () => {
        try {
            const requestOption = {
                method: "GET"
            }
            await fetch(`${API_URL}/api/userTypeList`, requestOption)
                .then((response) => response.json())
                .then((data) => {

                    console.log(data)
                    if (data.status == 200) {
                        setUserTypelist(data.data)
                    } else {
                        console.log(data.message)
                    }
                })

        } catch (err) {
            console.error(err.message)
        }
    }

    const handlesubmit = async (e) => {
        e.preventDefault()
        try {
            if (!name) {
                swal({
                    title: "Please Enter Name",
                    icon: "warning",
                    dangerMode: true,
                })
                return
            }
            else if (!email) {
                swal({
                    title: "Please Enter Email",
                    icon: "warning",
                    dangerMode: true,
                })
                return
            }
            else if (!email.includes('@') || !email.includes('.')) {
                swal({
                    title: "Please Enter Valid Email",
                    icon: "warning",
                    dangerMode: true,
                })
                return
            }
            else if (!phone) {
                swal({
                    title: "Please Enter Phone Number",
                    icon: "warning",
                    dangerMode: true,
                })
                return
            }
            else if (!usertype) {
                swal({
                    title: "Please Select User Role",
                    icon: "warning",
                    dangerMode: true,
                })
                return
            }
            else if (!password) {
                swal({
                    title: "Please Enter Password",
                    icon: "warning",
                    dangerMode: true,
                })
                return
            }
            else{
            const requestOption = {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    phone: phone,
                    usertype: usertype,
                    password: password
                })
            }
                await fetch(`${API_URL}/api/adminRegister`, requestOption)
                .then((response) => response.json())
                .then((data) => {
                    console.log(data)
                    if (data.status == 200) {
                        swal({
                            title: "Staff Added Successfully",
                            icon: "success",
                        })
                            .then((willDelete) => {
                                if (willDelete) {
                                    navigate('/Staff')
                                }
                            });
                    } else if (data.status == 400) {
                        swal({
                            title: data.message,
                            icon: "warning",
                        })
                    } else {
                        swal({
                            title: "Something went wrong",
                            icon: "warning",
                        })
                    }
                })
            }
        } catch (err) {
            console.error(err.message)
        }
    }



    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <div className="card" style={{ marginTop: '20px' }}>
                        <div className="card-header">
                            <div className="row">
                                <div className="col-md-6">
                                    <h4 className="card-title">Add Staff</h4>
                                </div>
                                <div className="col-md-6">
                                    <a href="/Staff" className="btn btn-primary" style={{ float: 'right' }}>Back</a>
                                </div>
                                <div className="card-body">
                                    <form action="/" method="POST" >
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="form-group mb-3">
                                                    <label>Name</label>
                                                    <input type="text"
                                                        className="form-control"
                                                        name="staff_name"
                                                        placeholder="Enter Name"
                                                        autoComplete="off"
                                                        required
                                                        onChange={(e) => setName(e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group mb-3">
                                                    <label>Email</label>
                                                    <input type="email"
                                                        className="form-control"
                                                        name="staff_email"
                                                        placeholder="Enter Email"
                                                        autoComplete="off"
                                                        required
                                                        onChange={(e) => setEmail(e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="form-group mb-3">
                                                    <label>Phone Number</label>
                                                    <input type="text"
                                                        className="form-control"
                                                        name="staff_mobile"
                                                        placeholder="Enter Phone Number"
                                                        autoComplete="off"
                                                        required
                                                        onChange={(e) => setPhone(e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group mb-3">
                                                    <label>User Role</label>
                                                    <select className="form-control" name="staff_usertype" required onChange={(e) => setUsertype(e.target.value)} >
                                                        <option value="" hidden>Select User Role</option>
                                                        {
                                                            userTypelist.length > 0 &&
                                                            userTypelist.map((item, index) => (
                                                                <option key={index} value={item._id}>{item.usertype}</option>
                                                            ))
                                                        }
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group mb-3">
                                                    <label>Password</label>
                                                    <input type="text"
                                                        className="form-control"
                                                        name="staff_password"
                                                        placeholder="Enter Password"
                                                        autoComplete="off"
                                                        required
                                                        onChange={(e) => setPassword(e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-md-12" style={{ textAlign: 'right' }}>
                                                <button type="submit" className="btn btn-primary" onClick={handlesubmit}>Save</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddStaff