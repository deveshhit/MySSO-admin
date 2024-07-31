import React, { useEffect, useState, useRef } from 'react';
import { Container, Col, Row, Modal, Button } from 'react-bootstrap';
import profileimg from "../../../assets/profile.png"


import API_URL from '../../../config';


const Usersdetail = () => {

    const [profiledata, setProfiledata] = useState([])

    useEffect(() => {
        const url = window.location.href;
        const url1 = url.split("/")[3];
        const url2 = url1.split("?")[1];
        const id = url2.split("=")[1];
        console.log(id)
        getProfiledata(id)
    }, [])


    const getProfiledata = async (id) => {
        try {
            const requestOption = {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            };
            await fetch(`${API_URL}/api/getUsersdetailbyId?id=${id}`, requestOption)
                .then((res) => res.json())
                .then((data) => {
                    console.log(data)
                    setProfiledata(data.data)
                })
        } catch (error) {
            console.log(error)
        }

    }


    const formatDate = (date) => {
        const d = new Date(date);
        let month = '' + (d.getMonth() + 1);
        let day = '' + d.getDate();
        const year = d.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        return [day, month, year].join('-');
    };

    console.log(profiledata.map(val => val))


    return (
        <div>
            {profiledata && profiledata?.map((user, index) =>
            //   console.log('testuser', user)
            (
                <Container key={index}>
                    <Col lg={12}>
                        <div className='basicsinformass'>

                            <div>
                                <Row className=' mb-5'>
                                    <Col lg={12} >
                                        <Col lg={4}>
                                            <div className='profileimgc'>

                                                <img src={!user?.profile_image || user?.profile_image == [] || !user?.profile_image.length ? profileimg : `${API_URL}/uploads/user_profile/${user?.profile_image?.map(val => val.filename)}`} alt="Profile" />
                                            </div>
                                        </Col>


                                        <h2>
                                            {`${user?.first_name} ${user?.middle_name} ${user?.last_name}`}
                                            {/* <img className='verified' width={"20px"} src="https://p1.hiclipart.com/preview/989/847/759/facebook-icons-verified-badge-symbol-account-verification-blue-turquoise-azure-electric-blue-png-clipart-thumbnail.jpg" alt="" /> */}
                                        </h2>
                                        <h6>Member ID: {user.member_id}</h6>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col lg={3}>
                                        <h5>Gender</h5>
                                        <p>{user.gender}</p>
                                    </Col>
                                    <Col lg={3}>
                                        <h5>Email</h5>
                                        <p>{user.email}</p>
                                    </Col>
                                    <Col lg={3}>
                                        <h5>Mobile Number</h5>
                                        <p>{user.phone}</p>
                                    </Col>
                                    <Col lg={3}>
                                        <h5>Date Of Birth</h5>
                                        <p>{formatDate(user.date_of_birth)}</p>
                                    </Col>
                                    <Col lg={3}>
                                        <h5>Address</h5>
                                        <p>{user.address}</p>
                                    </Col>
                                    <Col lg={3}>
                                        <h5>Country</h5>
                                        <p>{user?.country_details?.map(val => val.country_name)}</p>
                                    </Col>
                                    <Col lg={3}>
                                        <h5>Sanstha name</h5>
                                        <p>{user.sanstha_name}</p>
                                    </Col>
                                    <Col lg={3}>
                                        <h5>Sanstha Address</h5>
                                        <p>{user.sanstha_location}</p>
                                    </Col>
                                    <Col lg={3}>
                                        <h5>Reference Name (Sant)</h5>
                                        <p>{user.refrence_name_sant}</p>
                                    </Col>
                                    <Col lg={3}>
                                        <h5>Reference Mobile Number (Sant)</h5>
                                        <p>{user.reference_phone_sant}</p>
                                    </Col>
                                    <Col lg={3}>
                                        <h5>Reference Name (Haribhagat )</h5>
                                        <p>{user.refrence_name_haribhagat}</p>
                                    </Col>
                                    <Col lg={3}>
                                        <h5>Reference Mobile Number (Haribhagat )</h5>
                                        <p>{user.reference_phone_haribhagat}</p>
                                    </Col>
                                    <Col lg={3}>
                                        <h5>Reference Address</h5>
                                        <p> {user.refrence_location}</p>
                                    </Col>

                                </Row>


                            </div>


                        </div>
                    </Col>

                    <Col lg={12}>
                        <div className='basicsinformass'>
                            <h2>Document</h2>
                            <Row>
                                <Col lg={12}>
                                    {user.country == '66433282d3f1ba575ea7aa2d' ?
                                        <>
                                            <h5>Aadhar</h5>

                                            <p>
                                                <img style={{ width: '50%' }} src={`${API_URL}/uploads/documents/aadhar/${user.aadhar_photo?.map(val => val.filename)}`} />
                                            </p>
                                        </>
                                        :
                                        <>
                                            <Row className=' mb-5'>
                                                <Col lg={12} >
                                                    <h5>Passport</h5>
                                                </Col>
                                                <Col lg={6}>
                                                    <img style={{width:'100%'}} src={`${API_URL}/uploads/documents/passport/${user?.passport_front_photo?.map(val => val.filename)}`} />
                                                </Col>
                                                <Col lg={6}>
                                                    <img style={{ width: '100%' }} src={`${API_URL}/uploads/documents/passport/${user?.passport_back_photo?.map(val => val.filename)}`} />
                                                </Col>
                                            </Row>
                                        </>

                                    }
                                </Col>
                            </Row>
                        </div>
                    </Col>




                </Container>
            ))}
        </div>
    )
}

export default Usersdetail