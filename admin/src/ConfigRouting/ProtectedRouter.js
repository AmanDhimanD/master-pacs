import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Dashboard from '../Components/Dashboard';
import '../App.css';

const ProtectedRouter = (props) => {
    const { Component } = props;
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [isFirstLogin, setFirstLogin] = useState(false); // State to track first login

    useEffect(() => {
        let isLoggedIn = localStorage.getItem("isLoggedIn");
        console.log(isLoggedIn)
        if (!isLoggedIn) {
            navigate('/login');
        } else {
            // Simulate some asynchronous operation like an API call for inserting data
            // For the purpose of this example, we'll use setTimeout to simulate the delay
            setTimeout(() => {
                setLoading(false);
            }, 2000); // 2 seconds, adjust the delay as needed
        }

        // Check if it's the user's first login
        const isFirst = localStorage.getItem('firstLogin') === null;
        setFirstLogin(isFirst);
        //for solve the issue of the first Time Reload Property for the Left Drawer
        if (isFirst) {
            window.location.reload()
            localStorage.setItem('firstLogin', 'false'); // Set the flag to indicate first login
        }
    }, [navigate]);


    return (
        <div>
            <Dashboard />
            {loading ? (
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100vh',
                        fontSize: '50px',
                    }}
                >
                    🎇 Loading...
                </div>
            ) : (
                <Component />
            )}
        </div>
    );
};

export default ProtectedRouter;
