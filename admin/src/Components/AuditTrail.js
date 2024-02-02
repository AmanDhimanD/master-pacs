import React from 'react'

const AuditTrail = () => {


    const handleSearch = () => {

        alert("No data Found as Match")
    }

    return (
        <>
            <div className="main-container">
                <div className="xs-pd-20-10 pd-ltr-20">
                    <div className="page-header">
                        <div className="row">
                            <div className="col-md-6 col-sm-12">
                                <div className="title">
                                    <h4>Audit Trails</h4>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="page-header">
                        <div className="row">
                            <div className="col-md-4 col-sm-4">
                                <div class="row">
                                    <div class="col-md-4 col-sm-4">
                                        <label for="selectField" class="custom-label">
                                            Event Type
                                        </label>
                                    </div>
                                    <div class="col-md-6 col-sm-6">
                                        <select class="form-control custom-input" id="selectField">
                                            <option value="option1">Select</option>
                                            <option value="option2">Report_Access</option>
                                        </select>
                                    </div>
                                </div>

                                <div class="row mt-4">
                                    <div class="col-md-4 col-sm-4">
                                        <label for="selectField" class="custom-label">
                                            User
                                        </label>
                                    </div>
                                    <div class="col-md-6 col-sm-6">
                                        <input type="text" className="form-control" />
                                    </div>
                                </div>

                                <div class="row mt-4">
                                    <div class="col-md-4 col-sm-4">
                                        <label for="selectField" class="custom-label">
                                            Event Details
                                        </label>
                                    </div>
                                    <div class="col-md-6 col-sm-6">
                                        <input type="text" className="form-control" />
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4 col-sm-4">
                                <div class="row">
                                    <div class="col-md-4 col-sm-4">
                                        <label for="selectField" class="custom-label">
                                            Scan Start Date
                                        </label>
                                    </div>
                                    <div class="col-md-6 col-sm-6">
                                        <select class="form-control custom-input" id="selectField">
                                            <option value="option1">Jan</option>
                                            <option value="option1">Feb</option>
                                        </select>
                                    </div>
                                </div>

                                <div class="row mt-5">
                                    <div class="col-md-4 col-sm-4">
                                        <label for="selectField" class="custom-label">
                                            Scan End Date
                                        </label>
                                    </div>
                                    <div class="col-md-6 col-sm-6">
                                        <select class="form-control custom-input" id="selectField">
                                            <option value="option1">Jan</option>
                                            <option value="option1">Feb</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4 col-sm-4">
                                <div class="row">
                                    <div class="col-md-12 col-sm-12">
                                        <button
                                            style={{ padding: "0.719rem 40px" }}
                                            type="button"
                                            class="btn btn-success" onClick={handleSearch}
                                        >
                                            Search
                                        </button>
                                        <span style={{ marginLeft: 31 }}>
                                            {" "}
                                            <button
                                                style={{ padding: "0.719rem 40px" }}
                                                type="button"
                                                class="btn btn-outline-danger"
                                            >
                                                Clear Search
                                            </button>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="pd-20 card-box mb-30">

                        <div className="table-responsive">
                            <table className="table table-striped">
                                <colgroup>
                                    <col style={{ width: "5%" }} /> {/* S.No. */}
                                    <col style={{ width: "15%" }} /> {/* Event Type */}
                                    <col style={{ width: "15%" }} /> {/* User */}
                                    <col style={{ width: "20%" }} /> {/* Date/Time */}
                                    <col style={{ width: "15%" }} /> {/* IP Address */}
                                    <col style={{ width: "30%" }} /> {/* Details */}
                                </colgroup>
                                <thead>
                                    <tr>
                                        <th scope="col">S.No.</th>
                                        <th scope="col">Event Type</th>
                                        <th scope="col">User</th>
                                        <th scope="col">Date/Time</th>
                                        <th scope="col">IP Address</th>
                                        <th scope="col">Details</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>1</td>
                                        <td>Report_Access</td>
                                        <td>isupport</td>
                                        <td>2023-01-27/19:09:40</td>
                                        <td>152.38.98.109</td>
                                        <td>
                                            Dr. Meddiff Viewed the report<br /> <strong>Details:</strong> <br /> Patient Name:MUNNA LAL Age:
                                            Patient ID: 08594 instituteName:RBM GOVT.HOSPITAL
                                            BHARATPUR Scan Date-Time:27-02-2023 18:01:18 Modality : CT
                                            Reported By:karan Report DateTime:27-02-2023 18:51:57
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>2</td>
                                        <td>Report_Access</td>
                                        <td>isupport</td>
                                        <td>2023-01-27/19:09:40</td>
                                        <td>152.38.98.109</td>
                                        <td>
                                            Dr. Meddiff Viewed the report<br /> <strong>Details:</strong> <br /> Patient Name:MUNNA LAL Age:
                                            Patient ID: 08594 instituteName:RBM GOVT.HOSPITAL
                                            BHARATPUR Scan Date-Time:27-02-2023 18:01:18 Modality : CT
                                            Reported By:karan Report DateTime:27-02-2023 18:51:57
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>3</td>
                                        <td>Report_Access</td>
                                        <td>isupport</td>
                                        <td>2023-01-27/19:09:40</td>
                                        <td>152.38.98.109</td>
                                        <td>
                                            Dr. Meddiff Viewed the report<br /> <strong>Details:</strong> <br /> Patient Name:MUNNA LAL Age:
                                            Patient ID: 08594 instituteName:RBM GOVT.HOSPITAL
                                            BHARATPUR Scan Date-Time:27-02-2023 18:01:18 Modality : CT
                                            Reported By:karan Report DateTime:27-02-2023 18:51:57
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AuditTrail