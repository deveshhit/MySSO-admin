import React, { act } from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilBell,
  cilCalculator,
  cilChartPie,
  cilCursor,
  cilDescription,
  cilDrop,
  cilEnvelopeLetter,
  cilHandshake,
  cilNotes,
  cilPencil,
  cilPeople,
  cilPuzzle,
  cilSpeedometer,
  cilStar,
  cilUserPlus,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'
import API_URL from './config'

const userdata = JSON.parse(localStorage.getItem('user'))
const usertype = userdata?.usertype || ''
console.log('usertype', usertype)




// const getPermission = async() => {
//   const requestOptions = {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   };
//   await fetch(`${API_URL}/api/get_all_permission/${usertype}`, requestOptions)
//     .then((response) => response.json())
//     .then((data) => {
//       console.log(data.data)
//       localStorage.setItem('permission', JSON.stringify(data.data))
//     });
// }

// getPermission()

const permission = JSON.parse(localStorage.getItem('permission'))
console.log('permission', permission)

const master_permission = permission?.filter((item) => item?.module_name === 'Master').map((item) => item?.permission)[0][0] || {};
console.log('master_permission', master_permission)

const matrimony_permission = permission?.filter((item) => item?.module_name === 'Matrimony').map((item) => item?.permission)[0][0] || {};
console.log('matrimony_permission', matrimony_permission)




//Matrimony master
const MatrimonymasterNavItems = [
  matrimony_permission?.looking_for?.includes('view') &&{
    component: CNavItem,
    name: 'Looking For',
    to: '/looking_for',
  },
  // matrimony_permission?.age?.includes('view') && {
  //   component: CNavItem,
  //   name: 'Age',
  //   to: '/Age',
  // },
  matrimony_permission?.marital_status?.includes('view') &&{
    component: CNavItem,
    name: 'Marital status',
    to: '/marital_status',
  },
  matrimony_permission?.mother_tongue?.includes('view') && {
    component: CNavItem,
    name: 'Mother Tongue',
    to: '/MotherTongue',
  },
  matrimony_permission?.languages_known?.includes('view') && {
    component: CNavItem,
    name: 'Languages Known ',
    to: '/Language',
  },
  // matrimony_permission?.caste?.includes('view') && {
  //   component: CNavItem,
  //   name: 'Caste',
  //   to: '/Caste',
  // },
  // matrimony_permission?.sub_caste?.includes('view') && {
  //   component: CNavItem,
  //   name: 'Sub Caste',
  //   to: '/SubCaste',
  // },
  // matrimony_permission?.education?.includes('view') && {
  //   component: CNavItem,
  //   name: 'Education',
  //   to: '/Education',
  // },
  // matrimony_permission?.profession?.includes('view') && {
  //   component: CNavItem,
  //   name: 'Proffession',
  //   to: '/Proffession',
  // },
  // matrimony_permission?.income?.includes('view') && {
  //   component: CNavItem,
  //   name: 'Income',
  //   to: '/Income',
  // },
  // matrimony_permission?.hobby?.includes('view') && {
  //   component: CNavItem,
  //   name: 'Hobby',
  //   to: '/Hobby',
  // },
  // matrimony_permission?.gotra?.includes('view') && {
  //   component: CNavItem,
  //   name: 'Gotra',
  //   to: '/Gotra',
  // },
  // matrimony_permission?.height?.includes('view') && {
  //   component: CNavItem,
  //   name: 'Height',
  //   to: '/Height',
  // },
  // matrimony_permission?.weight?.includes('view') && {
  //   component: CNavItem,
  //   name: 'Weight',
  //   to: '/Weight',
  // },
  matrimony_permission?.matrimony_plan?.includes('view') && {
    component: CNavItem,
    name: 'Plan',
    to: '/Plan',
  },
  matrimony_permission?.matrimony_profile?.includes('view') && {
    component: CNavItem,
    name: 'Matrimonial Profile',
    to: '/MatrimonyUsers',
  },
].filter(Boolean)

const MatrimonymasterNavGroup =
  MatrimonymasterNavItems.length > 0
    ? {
      component: CNavGroup,
      name: 'Matrimony',
      icon: <CIcon  icon={cilHandshake} customClassName="nav-icon" />,
      items: MatrimonymasterNavItems,
      active: window.location.pathname === '/looking_for' ||
        window.location.pathname === '/marital_status'
    }
    : null


//Job master
// const JobmasterNavItems = [
//   {
//     component: CNavItem,
//     name: 'Plan Category',
//     to: '/plan-category',
//   },
//   {
//     component: CNavItem,
//     name: 'Nature Of Plan',
//     to: '/nature-of-plan',
//   },
// ].filter(Boolean)


// const JobmasterNavGroup =
//  JobmasterNavItems.length > 0
//     ? {
//       component: CNavGroup,
//       name: 'JOB',
//       icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
//       items: JobmasterNavItems,
//     }
//     : null



//common master
const CommonMastersNavItems = [
  master_permission?.roles?.includes('view') &&{
    component: CNavItem,
    name: 'Roles',
    to: '/usertype',
    active:
      window.location.pathname === '/usertype' ||
      window.location.pathname === '/EditUsertype',
  },
  master_permission?.staff?.includes('view') &&{
    component: CNavItem,
    name: 'Staff',
    to: '/Staff',
    active:
      window.location.pathname === '/AddStaff' ||
      window.location.pathname === '/EditStaff',
     
  },
  master_permission?.staff?.includes('view') && {
    component: CNavItem,
    name: 'Country',
    to: '/Country',
  },
  master_permission?.staff?.includes('view') && {
    component: CNavItem,
    name: 'State',
    to: '/State',
  },
  master_permission?.staff?.includes('view') && {
    component: CNavItem,
    name: 'City',
    to: '/City',
  },
  master_permission?.staff?.includes('view') && {
    component: CNavItem,
    name: 'Testimonials',
    to: '/Testimonials',
  },
 
].filter(Boolean)

const CommonMastersNavGroup =
  CommonMastersNavItems.length > 0
    ? {
      component: CNavGroup,
      name: 'Common Masters',
      icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
      items: CommonMastersNavItems,
    }
    : null

const UserNavgroup =
  usertype === '663de796b6f4eb777160a6d5'
    ? {
      component: CNavItem,
      name: 'Users',
      to: '/Users',
      icon: <CIcon icon={cilUserPlus} customClassName="nav-icon" />,
      active: 
          window.location.pathname === '/Users' ||
          window.location.pathname === '/Usersdetail'
    }
    : null
    
    const UserManagementNavgroup =
    usertype === '663de796b6f4eb777160a6d5'
    ? {
      component: CNavItem,
      name: 'Permissions',
      to: '/user_management',
      icon: <CIcon icon={cilUserPlus} customClassName="nav-icon" />,
      active: window.location.pathname === '/user_management'
    }
    : null

// const UserManagementNavgroup =
  
//      {
//       component: CNavItem,
//       name: 'Permissions',
//       to: '/user_management',
//       icon: <CIcon icon={cilUserPlus} customClassName="nav-icon" />,
//     }
    





const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'NewsLetter',
    to: '/NewsLetter',
    icon: <CIcon icon={cilEnvelopeLetter} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Master',
  },

  MatrimonymasterNavGroup,
  // JobmasterNavGroup,
  CommonMastersNavGroup,
  UserNavgroup,
  UserManagementNavgroup,

].filter(Boolean)

export default _nav
