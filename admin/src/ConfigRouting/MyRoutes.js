import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Dashboard from '../Components/Dashboard'
import SessionManagement from '../src/Components/SessionManagement'
import StudyManagement from './Components/StudyManagement';
import UserManagement from './Components/UserManagement';
import GroupManagement from './Components/GroupManagement';
import CenterManagement from './Components/CenterManagement';
import WelcomePage from './Components/WelcomePage'
import { DataPurge } from './Components/DataPurge';
import ReportTemplate from './Components/ReportTemplate';
import AuditTrail from './Components/AuditTrail';
import Alerts from './Components/Alerts';

const MyRoutes = () => {
    return (
        <>
            <Dashboard />
            <Routes>
                <Route path="/" element={<WelcomePage />} exact />
                <Route path="/session-management" element={<SessionManagement />} />
                <Route path="/study-management" element={<StudyManagement />} />
                <Route path="/user-management" element={<UserManagement />} />
                <Route path="/group-management" element={<GroupManagement />} />
                <Route path="/center-management" element={< CenterManagement />} />
                <Route path="/data-purge" element={<DataPurge />} />
                <Route path="/report-template" element={<ReportTemplate />} />
                <Route path="/audit-trail" element={<AuditTrail />} />
                <Route path="/alerts" element={<Alerts />} />



                <Route path="*" element={<h1>PageNotFound</h1>} />
            </Routes>
        </>
    )
}

export default MyRoutes   