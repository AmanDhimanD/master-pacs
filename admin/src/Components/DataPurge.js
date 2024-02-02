import React from 'react'
import DataPurgeRules from './DataPurgeRules'
import DataPurgeLogs from './DataPurgeLogs'
import { useLocation, useNavigate } from 'react-router-dom'

const DataPurge = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const path = location.pathname;
    const showRules = path === '/rules';
    const showLogs = path === '/logs';

    return (
        <>

            {showRules && <DataPurgeRules />}
            {showLogs && <DataPurgeLogs />}
        </>
    )
}


export default DataPurge