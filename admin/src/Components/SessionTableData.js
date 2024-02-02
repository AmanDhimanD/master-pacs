import React, { useState, useEffect } from 'react';
import swal from 'sweetalert';

function SessionTableData() {
    const [sessions, setSessions] = useState([]);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const fetchSessions = async () => {
        try {
            //const response = await fetch('http://localhost:8000/api/data');
            const response = await fetch('http://localhost:8000/api/data');
            const resData = await response.json();
            setSessions(resData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchSessions();
    }, []);

    const handleRowsPerPageChange = event => {
        setRowsPerPage(parseInt(event.target.value));
    };

    const handleEndSession = id => {
        const sessionToModify = sessions.find(session => session.id === id);
        if (!sessionToModify || sessionToModify.isSessionEnded) {
            return;
        }
        swal({
            title: 'Are you sure?',
            text: 'This will end the session.',
            icon: 'warning',
            buttons: true,
            dangerMode: true,
        }).then(willEnd => {
            if (willEnd) {
                const updatedSessions = sessions.map(session =>
                    session.id === id ? { ...session, isSessionEnded: true } : session
                );
                setSessions(updatedSessions);
                swal('Session ended.', {
                    icon: 'success',
                });
            } else {
                swal('Session not ended.');
            }
        });
    };
    // const paginatedSessions = sessions.slice(0, rowsPerPage);
    const [currentPage, setCurrentPage] = useState(1);
    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };
    const handleNextPage = () => {
        const maxPage = Math.ceil(sessions.length / rowsPerPage);
        if (currentPage < maxPage) {
            setCurrentPage(currentPage + 1);
        }
    };

    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const paginatedSessions = sessions.slice(startIndex, endIndex);


    return (
        <div className="table-responsive">
            <div className="d-flex align-items-center mb-3">
                <label htmlFor="rowsPerPageSelect" className="form-label me-2 mr-2 mb-0">
                    Show:
                </label>
                <select
                    id="rowsPerPageSelect"
                    className="form-select"
                    value={rowsPerPage}
                    onChange={handleRowsPerPageChange}
                >
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                </select>
            </div>
            <table className="table" id="ExportData">
                <thead>
                    <tr>
                        <th>S.No.</th>
                        <th>Login</th>
                        <th>Login Time</th>
                        <th>Client IP</th>
                        <th>Last Activity</th>
                        <th>Session Ended</th>
                    </tr>
                </thead>
                <tbody>
                    {paginatedSessions.map(session => (
                        <tr key={session.id}>
                            <td>{session.id}</td>
                            <td>{session.login}</td>
                            <td>{session.loginTime}</td>
                            <td>{session.clientIP}</td>
                            <td>{session.lastActivity}</td>
                            <td>
                                <button
                                    className={`badge badge-danger end-session-button ${session.isSessionEnded ? 'disabled' : ''
                                        }`}
                                    disabled={session.isSessionEnded}
                                    onClick={() => handleEndSession(session.id)}
                                >
                                    {session.isSessionEnded ? 'Session Ended' : 'End Session'}
                                </button>
                                {session.isSessionEnded && <div className="black-background" />}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className='mr-20'>
                <div className="pagination-buttons float-right ">
                    <div
                        class="btn-toolbar mb-15"
                        role="toolbar"
                        aria-label="Toolbar with button groups"
                    >
                        <div
                            class="btn-group mr-2 "
                            role="group"
                            aria-label="First group"
                        >
                            <button type="button" class="btn btn-outline-primary" onClick={handlePreviousPage} disabled={currentPage === 1}>
                                Previous
                            </button>
                            {/* <button type="button" class="btn btn-outline-primary">
                            1
                        </button>
                        <button type="button" class="btn btn-outline-primary">
                            2
                        </button>
                        <button type="button" class="btn btn-outline-primary">
                            3
                        </button>
                        <button type="button" class="btn btn-outline-primary">
                            4
                        </button> */}
                            <button type="button" class="btn btn-outline-primary" onClick={handleNextPage} disabled={currentPage >= Math.ceil(sessions.length / rowsPerPage)}>
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default SessionTableData;