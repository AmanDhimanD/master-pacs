import React from 'react'
import { Link } from 'react-router-dom'
import './Welcome.css'


const WelcomePage = () => {
    return (
        <>

            <div className="custom-main-container">
                <div className="custom-center-content">
                    <div className="custom-xs-pd-20-10 custom-pd-ltr-20">
                        <div className="custom-page-header">
                            <div className="custom-row">
                                <div className="custom-col-md-6 custom-col-sm-12">
                                    <div className="custom-title">
                                        <h4>Welcome Page</h4>
                                        <div className="custom-login-links">
                                            <Link to='/login' className="custom-login-link">Admin Login</Link>
                                            {/* <a href="http://localhost:3001/user/login" target="_blank" className="custom-login-link">User Login</a> */}
                                            {/* <a href="https://user-newdemo.vercel.app/user/login" target="_blank" className="custom-login-link">User Login</a> */}
                                            <a href="http://localhost:4001/user/login" target="_blank" className="custom-login-link">User Login</a>
                                            {/* <Link to='/register' className="custom-register-link" aria-disabled='true'>Register</Link><span> (For User and Admin)</span> */}
                                            <Link to='/' className="custom-register-link" aria-disabled='true'>Register</Link><span> (For User and Admin) </span>
                                            <span style={{ color: "red", paddingLeft: "10px" }}> Admin Access</span>
                                        </div>
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

export default WelcomePage  