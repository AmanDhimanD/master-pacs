import React, { useEffect, useState } from "react";

const DataPurgeRules = () => {
    const [APIdata, setAPIdata] = useState([]);
    const [patientName, setPatientName] = useState("");
    const [patientID, setPatientID] = useState("");
    const [keepReports, setKeepReports] = useState(false);

    //const [modOptions, setmodOptions] = useState([])
    const modOptions = [
        "CT",
        "OT",
        "MR",
        "CR",
    ];
    const fetchAPI = async () => {
        try {
            const responseAPI = await fetch("http://localhost:8000/api/studydata");
            const resJson = await responseAPI.json();
            //console.log(resJson.map(item=>item.mod))

            setAPIdata(resJson);

        } catch (err) {
            console.log("Api Error Study: ", err);
        }
    };

    const [selectedMods, setSelectedMods] = useState([]); // Initialize with all options

    const handleModChange = (e) => {
        const option = e.target.value;
        if (option === "All") {
            if (e.target.checked) {
                setSelectedMods(modOptions);
            } else {
                setSelectedMods([]);
            }
        } else {
            if (e.target.checked) {
                setSelectedMods([...selectedMods, option]);
            } else {
                setSelectedMods(selectedMods.filter(mod => mod !== option));
            }
        }
    };


    useEffect(() => {
        fetchAPI();
        setSelectedMods(modOptions);
    }, []);

    const handleSelectAllMods = () => {
        if (selectedMods.length === modOptions.length) {
            setSelectedMods([]);
        } else {
            setSelectedMods(modOptions);
        }
    };


    const handleAdd = () => {
        if (patientName && patientID && selectedMods.length > 0) {
            const newRule = {
                ruleName: patientName,
                modality: selectedMods.join(", "),
                numberOfDays: patientID,
                keepReports: keepReports,
                assignEditCenter: "",
            };

            // Update the state by adding the new rule to the APIdata array
            setAPIdata([...APIdata, newRule]);

            // Clear input fields after adding
            setPatientName("");
            setPatientID("");
            setSelectedMods(modOptions);
            setKeepReports(false); // Reset checkbox state
        } else {
            alert("Please fill in all fields and select at least one modality.");
        }
    };

    const handleDelete = () => {
        // Add logic to perform the "Delete" button action
        // For example, you might remove items from the state or perform some action
    };


    return (
        <>

            <div className="main-container">
                <div className="xs-pd-20-10 pd-ltr-20">
                    <div className="page-header ">
                        <h4>Rules</h4>
                        <div className="row d-flex justify-content-around">
                            <div className="">
                                {modOptions.map((option, index) => (
                                    (index % 4 === 0) && (
                                        <div className="row mb-3" key={index}>
                                            {modOptions.slice(index, index + 4).map((subOption, subIndex) => (
                                                <div className="col-md-3" key={subIndex}>
                                                    <div className="form-check">
                                                        <input
                                                            className="form-check-input"
                                                            type="checkbox"
                                                            id={`checkbox${index + subIndex}`}
                                                            value={subOption}
                                                            checked={selectedMods.includes(subOption)}
                                                            onChange={handleModChange}
                                                        />
                                                        <label className="form-check-label studymanagement" htmlFor={`checkbox${index + subIndex}`}>
                                                            {subOption}
                                                        </label>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )
                                ))}
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        id="selectAllMods"
                                        checked={selectedMods.length === modOptions.length}
                                        onChange={() => handleSelectAllMods()}
                                    />
                                    <label className="form-check-label studymanagement" htmlFor="selectAllMods">
                                        Select All Mods
                                    </label>
                                </div>
                            </div>

                            {/* patient inputs */}
                            <div>
                                <div className="row ml-5 mt-2">
                                    <div className="mb-3 mr-2">
                                        <label htmlFor="patientName" className="form-label">Rule Name:</label>
                                        <input
                                            type="text"
                                            className="form-control form-control-sm"
                                            id="patientName"
                                            placeholder="Enter Name of Rule"
                                            style={{ fontSize: "14px" }}
                                            value={patientName}
                                            onChange={e => setPatientName(e.target.value)}
                                        />
                                    </div>

                                    <div className="mb-3 mr-2">
                                        <label htmlFor="patientID" className="form-label" style={{ fontSize: "14px" }}>Number of Days:</label>
                                        <input
                                            type="text"
                                            className="form-control form-control-sm"
                                            id="patientID"
                                            placeholder="Enter Days"
                                            style={{ fontSize: "14px" }}
                                            value={patientID}
                                            onChange={e => setPatientID(e.target.value)}
                                        />
                                    </div>

                                </div>
                                <div className="row d-flex justify-content-center ">
                                    <div className="">
                                        <input
                                            type="checkbox"
                                            className="form-check-input ml-3 mr-4 mt-2"
                                            id="keepReports"
                                            checked={keepReports}
                                            onChange={e => setKeepReports(e.target.checked)}
                                        />
                                        <label htmlFor="keepReports" className="form-label ml-5">Keep Reports:</label>

                                    </div>
                                </div>


                            </div>

                            <div className="ml-5">
                                <button className="btn btn-primary mr-2 " onClick={handleAdd}>Add</button>
                                <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="xs-pd-20-10 pd-ltr-20">
                    <div className="pd-20 card-box mb-30">
                        <div className="table-responsive">
                            <table class="data-table table stripe hover nowrap">
                                <thead>
                                    <tr>
                                        <th>
                                        </th>
                                        <th scope="col">S.No</th>
                                        <th scope="col">Rule Name</th>
                                        <th scope="col">Modality</th>
                                        <th scope="col">Number of Days</th>
                                        <th scope="col">Keep Reports</th>
                                        <th scope="col">Assign/Edit center</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {APIdata.map((item, index) => (
                                        <tr key={index}> {/* Add key here */}
                                            <td></td>
                                            <td scope="col">{index + 1}</td>
                                            <td scope="col">{item.ruleName}</td>
                                            <td scope="col">{item.modality}</td>
                                            <td scope="col">{item.numberOfDays}</td>
                                            <td scope="col">{item.keepReports}</td>
                                            <td scope="col">{item.assignEditCenter}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DataPurgeRules;
