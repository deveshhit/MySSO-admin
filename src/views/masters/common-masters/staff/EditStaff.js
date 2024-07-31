
import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import swal from 'sweetalert'
import API_URL from '../../../../config'

const EditStaff = () => {
    const navigate = useNavigate()

    const [userTypelist, setUserTypelist] = useState([]);
    const [details, setDetails] = useState([])
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [usertype, setUsertype] = useState('');
    const [password, setPassword] = useState('');




    const url = window.location.href;
    const url1 = url.split("/")[3];
    const url2 = url1.split("?")[1];
    const id = url2.split("=")[1];
    const urlusr = url1.split("?")[2]
    const urlusrtype = urlusr.split("=")[1]
    console.log(id, ">>>>>>>>", urlusrtype)

    useEffect(() => {
        getusertype()
    }, [])
    useEffect(() => {
        getstaffbyid()
    }, [id])

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

    const getstaffbyid = async () => {
        try {
            const requestOption = {
                method: "GET"
            }
            await fetch(`${API_URL}/api/getAdmindetailsbyid?id=${id}`, requestOption)
                .then((response) => response.json())
                .then((data) => {
                    console.log(data)
                    if (data.status == 200) {
                        const list = data.data
                        setDetails(list)
                        setName(list.name)
                        setEmail(list.email)
                        setPhone(list.phone)
                        setUsertype(list.usertype)
                    

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
            const requestOption = {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: id,
                    name: name,
                    email: email,
                    phone: phone,
                    usertype: usertype,
                    password: password
                })
            }
            await fetch(`${API_URL}/api/adminUpdate`, requestOption)
                .then((response) => response.json())
                .then((data) => {
                    console.log(data)
                    if (data.status == 200) {
                        swal({
                            title: "Staff Updated",
                            icon: "success",
                        })
                            .then(willDelete => {
                                if (willDelete) {
                                    navigate('/Staff')
                                }
                            });
                    } else {
                        console.log(data.message)
                    }
                })

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
                                    <h4 className="card-title">Edit Staff</h4>
                                </div>
                                <div className="col-md-6">
                                    <a href="/Staff" className="btn btn-primary" style={{ float: 'right' }}>Back</a>
                                </div>
                                <div className="card-body">
                                    <form action="/" method="POST" onSubmit={handlesubmit}>
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
                                                        defaultValue={details.name}
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
                                                        defaultValue={details.email}
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
                                                        defaultValue={details.phone}
                                                        onChange={(e) => setPhone(e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group mb-3">
                                                    <label>User Role</label>
                                                    <select className="form-control"
                                                        name="staff_usertype"
                                                        required
                                                        defaultValue={details.usertype}
                                                        onChange={(e) => setUsertype(e.target.value)}
                                                    >
                                                        <option value="" hidden>Select User Role</option>
                                                        {
                                                            userTypelist.length > 0 &&
                                                            userTypelist.map((item, index) => (
                                                                <option key={index} value={item._id} selected={details.usertype == item._id ? true : false}>{item.usertype}</option>
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
                                                        onChange={(e) => setPassword(e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-md-12" style={{ textAlign: 'right' }}>
                                                <button type="submit" className="btn btn-primary" >Save</button>
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

export default EditStaff