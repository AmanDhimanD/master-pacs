import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './Components/Auth/Login'
import Register from './Components/Auth/Register'
import Welcome from '../src/Components/WelcomePage'
import SessionManagement from './Components/SessionManagement';
import StudyManagement from './Components/StudyManagement'
import UserManagement from './Components/UserManagement'
import GroupManagement from './Components/GroupManagement'
import CenterManagement from './Components/CenterManagement'
import DataPurge from './Components/DataPurge'
import ReportTemplate from './Components/ReportTemplate'
import AuditTrail from './Components/AuditTrail'
import Alerts from './Components/Alerts'
import InnerPages from './Pages/InnerPages';
import ProtectedRouter from './ConfigRouting/ProtectedRouter';
import Dashboard from './Components/Dashboard';
import ErrorPage from './Components/ErrorPage';
import SampleData from './Components/SessionTableData';
import Profile from './Components/Profile';
import TempTableAPI from './TempTableAPI';
import UserNewAdd from './Components/UserNewAdd';


function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Welcome />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />

        <Route path='/dashboard' element={<ProtectedRouter Component={DashData} />} />

        <Route path="/session-management" element={<ProtectedRouter Component={SessionManagement} />} />
        <Route path="/study-management" element={<ProtectedRouter Component={StudyManagement} />} />
        <Route path="/user-management" element={<ProtectedRouter Component={UserManagement} />} />
        <Route path="/addNewUser" element={<ProtectedRouter Component={UserNewAdd} />} />

        <Route path="/group-management" element={<ProtectedRouter Component={GroupManagement} />} />
        <Route path="/center-management" element={< ProtectedRouter Component={CenterManagement} />} />
        {/* <Route path="/data-purge" element={<ProtectedRouter Component={DataPurge} />} /> */}
        <Route path="/rules" element={<ProtectedRouter Component={DataPurge} />} />
        <Route path="/logs" element={<ProtectedRouter Component={DataPurge} />} />
        <Route path="/report-template" element={<ProtectedRouter Component={ReportTemplate} />} />
        <Route path="/audit-trail" element={<ProtectedRouter Component={AuditTrail} />} />
        <Route path="/alerts" element={<ProtectedRouter Component={Alerts} />} />
        <Route path="/profile" element={<ProtectedRouter Component={Profile} />} />


        <Route path="/Sample" element={<SampleData />} />
        <Route path="/apitesting" element={<TempTableAPI />} />

        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
}

const DashData = () => {
  const admin = localStorage.getItem("userName")
  //const userEmail = localStorage.getItem("")

  const usersData = localStorage.getItem('formData');
  const users = usersData ? JSON.parse(usersData) : [];
  const userName = users.name || admin
  return (
    <>

      <div className="main-container">
        <div className="xs-pd-20-10 pd-ltr-20">
          <div className="page-header">
            <div className="row">
              <div className="col-md-6 col-sm-12">
                <div className="title">
                  {/* <h4>Dashboard</h4> */}
                  <h4 style={{ fontFamily: 'serif', fontSize: "25px" }}>Welcome,
                    <span style={{ fontSize: '30px' }}>  Dr. {userName.toLocaleUpperCase()} 👨‍⚕️</span>
                  </h4>
                </div>
              </div>
            </div>

            <div className="login-wrap d-flex align-items-center flex-wrap justify-content-center">
              <div className="container">
                <div className="row align-items-center">
                  <div className="col-md-6 col-lg-5">
                    <img src="vendors/images/login-page-img.png" alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>



    </>
  )
}

export default App;
