import React from 'react'
import { Navigate } from 'react-router-dom';







const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'));
const Widgets = React.lazy(() => import('./views/widgets/Widgets'));
const usertype = React.lazy(() => import('./views/masters/common-masters/usertype/Usertypes'));
const Staff = React.lazy(() => import('./views/masters/common-masters/staff/Staff'));
const AddStaff = React.lazy(() => import('./views/masters/common-masters/staff/AddStaff'));
const EditStaff = React.lazy(() => import('./views/masters/common-masters/staff/EditStaff'));
const UserManagement = React.lazy(() => import('./views/masters/user-management/Global_user_management'));
const ErrorPage = React.lazy(() => import('./views/Errorpage/ErrorPage'));
const Lookingfor = React.lazy(() => import('./views/masters/matrimony/Lookingfor'));
const MaritalStatus = React.lazy(() => import('./views/masters/matrimony/MaritalStatus'));
const Country = React.lazy(() => import('./views/masters/common-masters/country/Viewcountry'));
const State = React.lazy(() => import('./views/masters/common-masters/state/State'));
const City = React.lazy(() => import('./views/masters/common-masters/city/City'));
const MotherTongue = React.lazy(() => import('./views/masters/matrimony/MotherTongue'));
const Casts = React.lazy(() => import('./views/masters/matrimony/Casts'));
const SubCaste = React.lazy(() => import('./views/masters/matrimony/SubCaste'));
const Educations = React.lazy(() => import('./views/masters/matrimony/Educations'));
const Profession = React.lazy(() => import('./views/masters/matrimony/Profession'));
const Income = React.lazy(() => import('./views/masters/matrimony/Income'));
const Hobby = React.lazy(() => import('./views/masters/matrimony/Hobby'));
const Gotra = React.lazy(() => import('./views/masters/matrimony/Gotra'));
const Height = React.lazy(() => import('./views/masters/matrimony/Height'));
const Weight = React.lazy(() => import('./views/masters/matrimony/Weight'));
const Age = React.lazy(() => import('./views/masters/matrimony/Age'));
const Religion = React.lazy(() => import('./views/masters/matrimony/Religion'));
const Testimonials = React.lazy(() => import('./views/masters/common-masters/testimonial/Testimonials'));
const Plan = React.lazy(() => import('./views/masters/matrimony/Plan'));
const addCaste = React.lazy(() => import('./views/masters/matrimony/addCaste'));
const Language = React.lazy(() => import('./views/masters/matrimony/Language'));
const NewsLetter = React.lazy(() => import('./views/dashboard/NewsLetter'));
const Users = React.lazy(() => import('./views/masters/UsersList/Users'));
const MatrimonyUsers = React.lazy(() => import('./views/masters/matrimony/MatrimonyUsers'));
const Usersdetail = React.lazy(() => import('./views/masters/UsersList/Usersdetail'));
const MatrimonyUserdetail = React.lazy(() => import('./views/masters/matrimony/MatrimonyUserdetail'));



const permission = JSON.parse(localStorage.getItem('permission'))
console.log('permission', permission)

const master_permission = permission?.filter((item) => item?.module_name === 'Master').map((item) => item?.permission)[0][0] || {};
console.log('master_permission', master_permission)

const matrimony_permission = permission?.filter((item) => item?.module_name === 'Matrimony').map((item) => item?.permission)[0][0] || {};



const user = JSON.parse(localStorage.getItem('user'));
console.log('user', user)
const usertypepermission = user?.usertype || '';
console.log('usertypepermission', usertypepermission)


const routes = [
  // { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/widgets', name: 'Widgets', element: Widgets },

  // { path: '/usertype', name: 'usertype', element: usertype },
  // { path: '/Staff', name: 'Staff', element: Staff },
  // { path: '/AddStaff', name: 'AddStaff', element: AddStaff},
  // { path: '/EditStaff', name: 'EditStaff', element: EditStaff},
  // { path: '/user_management', name: 'User Management', element: UserManagement },

  // { path: '/Age', name: 'Age', element: Age },
  // { path: '/MotherTongue', name: 'Mother Tongue', element: MotherTongue },
  // { path: '/Caste', name: 'Caste', element: Casts },
  // { path: '/SubCaste', name: 'Sub Caste', element: SubCaste },
  // { path: '/Education', name: 'Education', element: Educations },
  // { path: '/Proffession', name: 'Proffession', element: Profession },
  // { path: '/Income', name: 'Income', element: Income },
  // { path: '/Hobby', name: 'Hobby', element: Hobby},
  // { path: '/Gotra', name: 'Gotra', element: Gotra },
  // { path: '/Height', name: 'Height', element: Height },
  // { path: '/Weight', name: 'Weight', element: Weight },
  
  { path: '/Religion', name: 'Religion', element: Religion },
  { path: '/Country', name: 'Country', element: Country },
  { path: '/State', name: 'State', element: State },
  { path: '/City', name: 'City', element: City },
  { path: '/Testimonials', name: 'Testimonials', element: Testimonials },
  { path: '/Plan', name: 'Plan', element: Plan },
  { path: '/Language', name: 'Language', element: Language },
  { path: '/NewsLetter', name: 'NewsLetter', element: NewsLetter },
  { path: '/Users', name: 'Users', element: Users },
  { path: '/Usersdetail', name: 'Usersdetail', element: Usersdetail },
  { path: '/MatrimonyUsers', name: 'MatrimonyUsers', element: MatrimonyUsers },
  { path: '/MatrimonyUserdetail', name: 'MatrimonyUserdetail', element: MatrimonyUserdetail },







   







]

if (master_permission) {
  // Check if the user has permission for usertype
  if (master_permission.roles?.includes('view')) {
    routes.push({ path: '/usertype', name: 'Usertype', element: usertype });
  }
  if (master_permission.staff?.includes('view')) {
    routes.push({ path: '/Staff', name: 'Staff', element: Staff });
    routes.push({ path: '/AddStaff', name: 'AddStaff', element: AddStaff });
    routes.push({ path: '/EditStaff', name: 'EditStaff', element: EditStaff });
  }
  if (matrimony_permission.looking_for?.includes('view')) {
    routes.push({ path: '/looking_for', name: 'Looking For', element: Lookingfor });
  }
  if (matrimony_permission.age?.includes('view')) {
    routes.push({ path: '/Age', name: 'Age', element: Age });
  }
  if (matrimony_permission.marital_status?.includes('view')) {
    routes.push({ path: '/marital_status', name: 'Marital status', element: MaritalStatus });
  }
  if (matrimony_permission.mother_tongue?.includes('view')) {
    routes.push({ path: '/MotherTongue', name: 'Mother Tongue', element: MotherTongue });
  }
  if (matrimony_permission.caste?.includes('view')) {
    routes.push({ path: '/Caste', name: 'Caste', element: Casts });
  }
  if (matrimony_permission.caste?.includes('view')) {
    routes.push({ path: '/AddCaste', name: 'AddCaste', element: addCaste });
  }
  if (matrimony_permission.sub_caste?.includes('view')) {
    routes.push({ path: '/SubCaste', name: 'Sub Caste', element: SubCaste });
  }
  if (matrimony_permission.education?.includes('view')) {
    routes.push({ path: '/Education', name: 'Education', element: Educations });
  }
  if (matrimony_permission.profession?.includes('view')) {
    routes.push({ path: '/Proffession', name: 'Proffession', element: Profession });
  }
  if (matrimony_permission.income?.includes('view')) {
    routes.push({ path: '/Income', name: 'Income', element: Income });
  }
  if (matrimony_permission.hobby?.includes('view')) {
    routes.push({ path: '/Hobby', name: 'Hobby', element: Hobby });
  }
  if (matrimony_permission.gotra?.includes('view')) {
    routes.push({ path: '/Gotra', name: 'Gotra', element: Gotra });
  }
  if (matrimony_permission.height?.includes('view')) {
    routes.push({ path: '/Height', name: 'Height', element: Height });
  }
  if (matrimony_permission.weight?.includes('view')) {
    routes.push({ path: '/Weight', name: 'Weight', element: Weight });
  }


  

 
  
}

if (usertypepermission === '663de796b6f4eb777160a6d5') {
  routes.push({ path: '/user_management', name: 'User Management', element: UserManagement });
}



export default routes
