import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import * as XLSX from "xlsx";

const UserManagement = () => {
    const [userData, setUserData] = useState([]);
    const [openModal, setOpenModal] = useState(false);

    const handleExport = () => {
        const table = document.getElementById("ExportData"); // Replace with your table ID
        const tableData = XLSX.utils.table_to_sheet(table);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, tableData, "Sheet1");

        // Convert workbook to array buffer
        const wbArrayBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });

        // Create a Blob from the array buffer
        const blob = new Blob([wbArrayBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });

        // Create a download link and trigger the click event
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "table-data.xlsx";
        link.click();
    };

    const handleUser = async () => {
        const token = localStorage.getItem('accessToken');
        const headers = {
            'Authorization': `Bearer ${token}` // Assuming it's a Bearer token, adjust if needed
        };

        const requestOptions = {
            method: 'GET', // You can change the HTTP method as needed
            headers: headers
        };

        const apiUrl = "http://localhost:8000/userauth/all"; // Replace with your API URL
        try {
            const responseAPI = await fetch(apiUrl, requestOptions);
            const resJson = await responseAPI.json();
            setUserData(resJson.users);
            console.log(resJson)
        } catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        handleUser()
    }, [])



    return (
        <>
            <div className="main-container">
                <div className="xs-pd-20-10 pd-ltr-20">
                    <div className="page-header">
                        <div className="row">
                            <div className="col-md-6 col-sm-12">
                                <div className="title">
                                    <h4>User Management</h4>
                                    <p className='text-sm'>(Dummy data no user)</p>
                                </div>
                                <nav aria-label="breadcrumb" role="navigation">
                                </nav>
                            </div>
                            <div className="col-md-6 col-sm-12 text-right">
                                <div className="dropdown">
                                    <a
                                        className="btn btn-primary dropdown-toggle"
                                        href="#"
                                        role="button"
                                        data-toggle="dropdown"
                                    >
                                        More Options
                                    </a>
                                    <div className="dropdown-menu dropdown-menu-right">
                                        <Link className="dropdown-item" to="/addNewUser">
                                            Add New User
                                        </Link>
                                        <a className="dropdown-item" href="#" onClick={handleExport}>
                                            Export List
                                        </a>
                                        <a className="dropdown-item" href="#">
                                            Policies
                                        </a>
                                        <a className="dropdown-item" href="#">
                                            View Assets
                                        </a>
                                    </div>
                                </div>

                            </div>

                        </div>

                    </div>

                    <div className="pd-20 card-box mb-30">
                        <div className="clearfix mb-20">
                            <div className="pull-left">
                            </div>

                        </div>
                        <div className="table-responsive">
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th scope="col">Login</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Group</th>
                                        <th scope="col">Change Password</th>
                                        <th scope="col">Status</th>
                                        <th scope="col">Edit</th>
                                        <th scope="col">Delete</th>
                                        <th scope="col">Lock</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {userData.map((user, index) => (
                                        <tr key={index}>
                                            <th scope="row">{user.name}</th>
                                            <td>{user.email}</td>
                                            <td>User</td> {/* You can replace 'Admin' with user.role if available */}
                                            <td>Change Password</td>
                                            <td>
                                                <span className="badge badge-success">Disable</span>
                                            </td>
                                            <td>
                                                <span
                                                    className="badge badge-primary"
                                                    style={{ cursor: "pointer" }}
                                                    onClick={() => {
                                                        setOpenModal(true);
                                                    }}
                                                >
                                                    Edit
                                                </span>
                                            </td>
                                            <td>
                                                <span className="badge badge-danger">Delete</span>
                                            </td>
                                            <td>
                                                <span className="badge badge-info">Lock</span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                        </div>

                    </div>


                </div>
            </div>
        </>
    )
}

export default UserManagement


const EditModal = ({ closeModal }) => {
    return (
        <>
            <div
                className="modal fade show"
                id="login-modal"
                tabIndex={-1}
                role="dialog"
                aria-labelledby="myLargeModalLabel"
                style={{
                    paddingRight: 17,
                    display: "block",
                    backgroundColor: "rgb(94 96 99 / 82%)",
                }}
                aria-modal="true"
            >
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div class="modal-header">
                            <div className="login-title">
                                <h4 className="text-center text-primary">Edit</h4>
                            </div>
                            <button class="close" onClick={() => closeModal(false)}>
                                ×
                            </button>
                        </div>
                        <div className="login-box bg-white box-shadow border-radius-10">
                            <form>

                                <div className="input-group custom">
                                    <input
                                        type="text"
                                        className="form-control form-control-lg"
                                        placeholder="Username"
                                    />
                                    <div className="input-group-append custom">
                                        <span className="input-group-text">
                                            <i className="icon-copy dw dw-user1" />
                                        </span>
                                    </div>
                                </div>
                                <div className="input-group custom">
                                    <input
                                        type="password"
                                        className="form-control form-control-lg"
                                        placeholder="**********"
                                    />
                                    <div className="input-group-append custom">
                                        <span className="input-group-text">
                                            <i className="dw dw-padlock1" />
                                        </span>
                                    </div>
                                </div>
                                <div className="row pb-30">
                                    <div className="col-6">
                                        <div className="custom-control custom-checkbox">
                                            <input
                                                type="checkbox"
                                                className="custom-control-input"
                                                id="customCheck1"
                                            />
                                            <label
                                                className="custom-control-label"
                                                htmlFor="customCheck1"
                                            >
                                                Remember
                                            </label>
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="forgot-password">
                                            <a href="forgot-password.html">Forgot Password</a>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-12">
                                        <div className="input-group mb-0">
                                            {/*
																use code for form submit
																<input class="btn btn-primary btn-lg btn-block" type="submit" value="Sign In">
															*/}
                                            <a
                                                className="btn btn-primary btn-lg btn-block text-white"
                                                onClick={() => closeModal(false)}
                                            >
                                                Sign In
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

