import React, { useState } from 'react'
import '../All.css'
import swal from 'sweetalert';

const Profile = () => {
    const admin = localStorage.getItem("userName")
    //const userEmail = localStorage.getItem("")

    const usersData = localStorage.getItem('formData');
    const users = usersData ? JSON.parse(usersData) : [];
    const userName = users.name ||admin


    const [fullName, setFullName] = useState(userName);
    const [email, setEmail] = useState(userName);
    const [phone, setPhone] = useState("(239) 816-9029");
    const [mobile, setMobile] = useState("(320) 380-4539");
    const [address, setAddress] = useState("Bay Area, San Francisco, CA");

    const handleSaveChanges = () => {
        // Perform actions to save changes
        // For now, let's just console.log the updated values

        localStorage.setItem("userName", fullName)

        console.log("Full Name:", fullName);
        console.log("Email:", email);
        console.log("Phone:", phone);
        console.log("Mobile:", mobile);
        console.log("Address:", address);
        swal({
            title: "Are you sure?",
            text: "This will end the session.",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willEnd) => {
            if (willEnd) {
                // setData(prevData => prevData.map(item => {
                //     if (item.id === id) {
                //         return { ...item, isSessionEnded: true };
                //     }
                //     return item;
                // }));
                swal("Save Changes.", {
                });
            } else {
                swal("Save not Changes");
            }
        });
    };
    return (
        <>
            <div className="main-container">
                <div className="xs-pd-20-10 pd-ltr-20">
                    <div className="page-header">
                        <center>
                            <div className="col-md-6 col-sm-12">
                                <div class="row gutters-sm">
                                    <div class="col-md-4 mb-3">
                                        <div class="card">
                                            <div class="card-body">
                                                <div class="d-flex flex-column align-items-center text-center">
                                                    <img
                                                        src="https://bootdey.com/img/Content/avatar/avatar7.png"
                                                        alt="Admin"
                                                        class="rounded-circle"
                                                        width="150"
                                                    />
                                                    <div class="mt-3">
                                                        <h4>{userName.toLocaleUpperCase()}</h4>
                                                        <p class="text-secondary mb-1"></p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-8">
                                        <div class="card">
                                            <div class="card-body">
                                                <div class="row mb-3">
                                                    <div class="col-sm-3"><h6 class="mb-0">Full Name</h6></div>
                                                    <div class="col-sm-9 text-secondary">
                                                        <input type="text" class="form-control" value={fullName}
                                                            onChange={e => setFullName(e.target.value)} />
                                                    </div>
                                                </div>
                                                <div class="row mb-3">
                                                    <div class="col-sm-3"><h6 class="mb-0">Email</h6></div>
                                                    <div class="col-sm-9 text-secondary">
                                                        <input
                                                            type="text"
                                                            class="form-control"
                                                            value={email}
                                                            onChange={e => setEmail(e.target.value)}
                                                        />
                                                    </div>
                                                </div>
                                                <div class="row mb-3">
                                                    <div class="col-sm-3"><h6 class="mb-0">Phone</h6></div>
                                                    <div class="col-sm-9 text-secondary">
                                                        <input
                                                            type="text"
                                                            class="form-control"
                                                            value={phone}
                                                            onChange={e => setPhone(e.target.value)}
                                                        />
                                                    </div>
                                                </div>
                                                <div class="row mb-3">
                                                    <div class="col-sm-3"><h6 class="mb-0">Mobile</h6></div>
                                                    <div class="col-sm-9 text-secondary">
                                                        <input
                                                            type="text"
                                                            class="form-control"
                                                            value={mobile}
                                                            onChange={e => setMobile(e.target.value)}
                                                        />
                                                    </div>
                                                </div>
                                                <div class="row mb-3">
                                                    <div class="col-sm-3"><h6 class="mb-0">Address</h6></div>
                                                    <div class="col-sm-9 text-secondary">
                                                        <input
                                                            type="text"
                                                            class="form-control"
                                                            value={address}
                                                            onChange={e => setAddress(e.target.value)}
                                                        />
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-sm-3"></div>
                                                    <div class="col-sm-9 text-secondary">
                                                        <input
                                                            type="button"
                                                            class="btn btn-primary px-4"
                                                            value="Save Changes"
                                                            onClick={handleSaveChanges}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </center>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile