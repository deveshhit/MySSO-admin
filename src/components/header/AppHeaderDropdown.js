import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CAvatar,
  CBadge,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import {
  cilBell,
  cilCreditCard,
  cilCommentSquare,
  cilEnvelopeOpen,
  cilFile,
  cilLockLocked,
  cilSettings,
  cilTask,
  cilUser,
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'

import avatar8 from './../../assets/images/avatars/8.jpg'
import API_URL from '../../config'

const AppHeaderDropdown = () => {


  const navigate = useNavigate();
  const [profileimg, setProfileImg] = useState([]);
  const [profileName, setProfileName] = useState([]);
  const [usertype, setUsertype] = useState([]);



  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/login');
    }
    else {
      const userdata = JSON.parse(localStorage.getItem('user'));
      const usertype = userdata._id;
      usertypedetail(usertype);
      setProfileName(userdata.name);
      if (userdata.profile_image == null || userdata.profile_image == undefined || userdata.profile_image == '') {
        setProfileImg(avatar8);
      }
      else {
        const image = userdata.profile_image[0]['filename'];
        if (image == undefined || image == null || image == '') {
          setProfileImg(avatar8);
        }
        else {
          const profileimg = `${API_URL}/user_profile/` + userdata.profile_image[0]['filename'];
          setProfileImg(profileimg);
        }
      }
    }
  }, []);


  const usertypedetail = async (ParamValue) => {
    let result = await fetch(`${API_URL}/api/getAdmindetailsbyid?id=${ParamValue}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    result = await result.json();
    console.log(result?.data[0]?.usertype?.usertype);
    setUsertype(result?.data[0]?.usertype?.usertype);
  }

  const logout = () => {
    const reportdata = JSON.parse(localStorage.getItem('report'))
    const reportid = reportdata?._id
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: reportid })
    };
    fetch(`${API_URL}/api/adminLogout`, requestOptions)
      .then(response => response.json())
      .then(data => {
        localStorage.clear()
        window.location.href = '/'
        console.log(data)
      });


    // localStorage.clear()
    // window.location.href = '/'
  }


  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0 pe-0" caret={false}>
        <CAvatar src={avatar8} size="md" /><span style={{ fontSize: '14px', marginLeft: '10px', fontWeight: '700', position: 'relative', top: '16px', display: 'inline-block' }}>{profileName}<p style={{ fontSize: '13px', fontWeight: '700' }}>{usertype}</p></span>
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownHeader className="bg-body-secondary fw-semibold mb-2">Account</CDropdownHeader>

        <CDropdownItem onClick={logout}>
          <CIcon icon={cilLockLocked} className="me-2" />
          Log Out
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default AppHeaderDropdown
