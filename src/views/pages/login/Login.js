import React,{useState,useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'

import logo from "src/images/MYSSO_LOGO.svg"
import API_URL from '../../../config';



const Login = () => {
  const navigate = useNavigate()


  const [clientIp, setClientIp] = useState(null);

  // const browserInfo = navigator.userAgentData;
  // const browserInfo = navigator.userAgent;
  // const deviceInfo = navigator.userAgent;
  // console.log("browserInfo",browserInfo);
  // console.log("deviceInfo",deviceInfo);


  useEffect(() => {
    fetch('https://api.ipify.org?format=json')
      .then((response) => response.json())
      .then((data) => {
        console.log(data.ip);
        setClientIp(data.ip);
      });
  }, []);

  const handleSubmit = async (e) => {
    try {
    e.preventDefault()
    const data = new FormData(e.target)
    const email = data.get('email')
    const password = data.get('password')
    console.log(email, password)

      if(!email){
        alert('Email is required')
        return
      }
      if(!email.includes('@') || !email.includes('.')){
        alert('Email is invalid')
        return
      }
      if(!password){
        alert('Password is required')
        return
      }



    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email, password: password, clientIp: clientIp, login_time : new Date()})
    };
      const response = await fetch(`${API_URL}/api/adminLogin`, requestOptions)
      const result = await response.json();
      console.log(result);

      if (result.status === 200) {
        localStorage.setItem('user', JSON.stringify(result.data))
        localStorage.setItem('token', result.token)
        localStorage.setItem('report', JSON.stringify(result.report))
        await getPermission(result.data.usertype)
          navigate('/dashboard')
      } else if (result.status === 403) {
        alert(result.message)
        }
        
        else {
        alert(result.message)
        }
     
    } catch (error) {
      console.log(error)
    }
  }


  const getPermission = async (usertype) => {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };
   await fetch(`${API_URL}/api/get_all_permission/${usertype}`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data.data)
        localStorage.setItem('permission', JSON.stringify(data.data))
      });
  }


 



  return (
   
    <>
      <CContainer>
        <Link to="/Login"><img style={{ width: '15%', marginTop: '20px', marginBottom: '20px' }} src={logo} /></Link>
        <div className="login-container">
          <div className="onboarding">
            <div className="swiper-container">
              <div className="swiper-wrapper">
                <div className="swiper-slide color-1">
                  <div className="slide-image">
                    <img src="https://mysso.org/assets/images/swami.png" loading="lazy" alt="" />
                    {/* <img src={loginbanner} loading="lazy" alt="" /> */}

                  </div>
                  <div className="slide-content">
                    <h2>MySSO.ORG</h2>
                    <p>SWAMINARAYAN SATSANGIS ORGANISATIONS </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="login-form">
            <div className="login-form-inner">
              <h5>Welcome Back</h5>
              <h4>Login to the Dashboard</h4>
              <form name="signin" className="form" action="/" method="POST" onSubmit={handleSubmit}>
                <div className="login-form-group">
                  <label htmlFor="email">Email <span className="required-star">*</span></label>
                  <input type="text" name="email" placeholder="Enter Email" id="email" autoComplete="off" />
                </div>
                <div className="login-form-group">
                  <label htmlFor="pwd">Password <span className="required-star">*</span></label>
                  <input autoComplete="off" type="password" name="password" placeholder="Enter Password" id="pwd" />
                </div>
                {/* <div className="login-form-group single-row">
                  <div className="custom-check">
                    <input autoComplete="off" type="checkbox" defaultChecked id="remember" /><label htmlFor="remember">Remember me</label>
                  </div>
                </div> */}
                <button type="submit" className="rounded-button login-cta"
                  id="submitbtn">Login</button>
                <div className="register-div">Trouble in login? <Link to="/Forgetpassword" className="link forgot-link">Forgot Password ?</Link></div>
              </form>
            </div>
          </div>

        </div>
      </CContainer>
      <div
        className="row login-footer"
        style={{
          color: "white",
          textAlign: "center",
          background: "#9A031E",
          paddingTop: "11px",
          width: "100%",
          marginTop: "7%",
        }}
      >
        <div className="col-lg-12">
          <p className="copyright12" style={{ fontSize: '14px' }}>
            © MYSSO 2024 All Rights Reserved
          </p>
        </div>
      </div>


    </>
  )
}

export default Login
