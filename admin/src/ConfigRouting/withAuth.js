import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const withAuth = (Component) => {
    const AuthenticatedComponent = (props) => {
        const navigate = useNavigate();

        // Simulate logged in state for demonstration purposes.
        // In a real application, this should be handled using proper authentication mechanisms.
        const isLoggedIn = true; // Replace this with your actual login status check.

        useEffect(() => {
            if (!isLoggedIn) {
                navigate('/login');
            }
        }, [isLoggedIn, navigate]);

        return isLoggedIn ? <Component {...props} /> : null;
    };

    return AuthenticatedComponent;  
};

export default withAuth;
