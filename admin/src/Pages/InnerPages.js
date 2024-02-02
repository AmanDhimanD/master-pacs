import React from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import {
    SessionManagement,
    StudyManagement,
    UserManagement,
    GroupManagement,
    CenterManagement,
    DataPurge,
    ReportTemplate,
    AuditTrail,
    Alerts
} from '../Components/index';
import Dashboard from '../Components/Dashboard';
import '../App.css';
import ProtectedRouter from '../ConfigRouting/ProtectedRouter';

const InnerPages = () => {
    return (
        <>
            <Dashboard />
            <Routes>
                <Route path="/dashboard/session-management" element={<ProtectedRouter Component={SessionManagement} />} />
                <Route path="/study-management" element={<ProtectedRouter Component={StudyManagement} />} />
                <Route path="/user-management" element={<ProtectedRouter Component={UserManagement} />} />
                <Route path="/group-management" element={<ProtectedRouter Component={GroupManagement} />} />
                <Route path="/center-management" element={< ProtectedRouter Component={CenterManagement} />} />
                <Route path="/data-purge" element={<ProtectedRouter Component={DataPurge} />} />
                <Route path="/report-template" element={<ProtectedRouter Component={ReportTemplate} />} />
                <Route path="/audit-trail" element={<ProtectedRouter Component={AuditTrail} />} />
                <Route path="/alerts" element={<ProtectedRouter Component={Alerts} />} />


                <Route path="*" element={<h1>PageNotFound</h1>} />
            </Routes>
        </>
    );

};


export default InnerPages;