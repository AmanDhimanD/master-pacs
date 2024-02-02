import React, { useEffect, useState } from "react";
import CustomDataTable from "../CustomDataTable";
import { prettyFormat } from "@testing-library/react";
import MedicalImageDownloadButton from "./MedicalImageDownloadButton";

const StudyManagement = () => {
  const [APIdata, setAPIdata] = useState([]);
  const [modOptions, setModOptions] = useState([]);
  const [selectedMods, setSelectedMods] = useState([]);
  const [patientName, setPatientName] = useState("");
  const [patientID, setPatientID] = useState("");
  const [bodyPart, setBodyPart] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedCenter, setSelectedCenter] = useState("");
  const [selectedStartDate, setSelectedStartDate] = useState("");
  const [selectedEndDate, setSelectedEndDate] = useState("");
  const [centerOptions, setCenterOptions] = useState([]);
  const [timeOptions, setTimeOptions] = useState([]);


  useEffect(() => {
    fetchAPI();
  }, []);


  const fetchAPI = async () => {
    try {
      //old api data fetch url
      //const responseAPI = await fetch("http://localhost:8000/api/data");
      //New schema data API
      const responseAPI = await fetch("http://localhost:8000/api/v2/getdata");
      const resJson = await responseAPI.json();
      const processedData = resJson.map(item => ({
        patient: item.patient || {},
        study: item.study || {},
        series: item.series || {},
        image: item.image || {},
      }));

      setAPIdata(processedData);
      setCenterOptions([...new Set(resJson.map(item => item.center))]);
      setTimeOptions(
        resJson.map(item => new Date(item.scanDateTime)).sort(
          (a, b) => a - b
        )
      );
      setModOptions([...new Set(processedData.map(item => item.series.Modality))]);
      setSelectedMods([...new Set(resJson.map(item => item.series.Modality))]);
    } catch (err) {
      console.log("API Error Study: ", err);
    }
  };

  const handleModChange = (e) => {
    const option = e.target.value;
    if (option === "All") {
      setSelectedMods(modOptions);
    } else {
      setSelectedMods((prevSelected) =>
        prevSelected.includes(option)
          ? prevSelected.filter((mod) => mod !== option)
          : [...prevSelected, option]
      );
    }
  };

  const handleSelectAllMods = () => {
    if (selectedMods.length === modOptions.length) {
      setSelectedMods([]);
    } else {
      setSelectedMods(modOptions);
    }
  };

  const HeaderColumns = [
    {
      name: 'Patient ID',
      selector: row => row.PatientId,
    },
    {
      name: 'Patient Name',
      selector: row => row.PatientName,
      cell: row => <div className="table-plus datatable-nosort">{row.PatientName}</div>,
      sortable: true,
    },

    {
      name: 'Age',
      selector: row => row.Age,
    },
    {
      name: 'Sex',
      selector: row => row.Sex,
    },
    {
      name: 'Body Part',
      selector: row => row.BodyPartExamined,
    },
    {
      name: 'Mod.',
      selector: row => row.Modality,
    },
    {
      name: 'Center',
      selector: row => row.Center,
    },
    {
      name: 'Scan Date/Time',
      selector: row => row.StudyDate,
      cell: row => {
        const isoDateString = row.StudyDate;
        const date = new Date(isoDateString);
        const formattedDate = date.toLocaleString('default', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric'
        });
        return <div className="table-plus datatable-nosort">{formattedDate}</div>;
      }
    },
    // {
    //   name: 'Status',
    //   selector: row => row.Status,
    // },
    {
      name: 'Reported By',
      selector: row => row.PerformingPhysiciansName,
    },
    {
      name: 'Lock',
      selector: row => row.lock,
      cell: row => <div>🔐</div>
    },
    {
      name: 'Action',
      selector: row => row.action,
      sortable: false,
      cell: row => <div className="datatable-nosort"><span className='text-center mt-2 leading-none flex justify-center absolute bottom-0 left-0 w-full py-4 text-xs'>View/Download</span></div>,
    },
  ];

  const combinedData = APIdata.map(item => ({
    ...item.patient,
    ...item.series,
    ...item.study,
  }));


  const filteredData = combinedData.filter(
    (item) => {
      return (
        (selectedMods.includes(item.Modality) || selectedMods.includes("All")) &&
        (
          (item.PatientName?.toLowerCase()?.includes(patientName.toLowerCase())) ||
          patientName === ""
        ) &&
        (
          item.PatientID?.toLowerCase()?.includes(patientID.toLowerCase()) ||
          patientID === ""
        ) &&
        (
          item.BodyPartExamined?.toLowerCase()?.includes(bodyPart.toLowerCase()) ||
          bodyPart === ""
        ) &&
        (selectedStatus === "" || item.status === selectedStatus) &&
        (selectedCenter === "" || item.center === selectedCenter) &&
        (selectedStartDate === "" ||
          new Date(item.scanDateTime) >= new Date(selectedStartDate)) &&
        (selectedEndDate === "" ||
          new Date(item.scanDateTime) <= new Date(selectedEndDate))
      );
    }
  )

  return (
    <>
      <div className="main-container">
        <MedicalImageDownloadButton />

        {/* Header */}
        <div className="xs-pd-20-10 pd-ltr-20">
          <div className="page-header">
            <div className="row">
              <div className="col-md-6 col-sm-12 ">
                <div className="title">
                  <h4>Study Management</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Filters */}
        <div className="xs-pd-20-10 pd-ltr-20">
          <div className="page-header ">
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
                ))
                }

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
                    <label htmlFor="patientName" className="form-label">Patient Name:</label>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      id="patientName"
                      placeholder="Enter patient's name"
                      style={{ fontSize: "14px" }}
                      value={patientName}
                      onChange={e => setPatientName(e.target.value)}
                    />
                  </div>
                  <div className="mb-3 mr-2">
                    <label htmlFor="patientID" className="form-label" style={{ fontSize: "14px" }}>Patient ID:</label>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      id="patientID"
                      placeholder="Enter patient's ID"
                      style={{ fontSize: "14px" }}
                      value={patientID}
                      onChange={e => setPatientID(e.target.value)}
                    />
                  </div>
                  <div className="mb-3 mr-2">
                    <label htmlFor="bodyPart" className="form-label" style={{ fontSize: "14px" }}>Body Part:</label>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      id="bodyPart"
                      placeholder="Enter affected body part"
                      style={{ fontSize: "14px" }}
                      value={bodyPart}
                      onChange={e => setBodyPart(e.target.value)}
                    />
                  </div>
                </div>

                <div className="row d-flex justify-content-center ">
                  <div className="">
                    <button type="button" className="btn btn-primary btn-sm mx-4">Search</button>
                  </div>
                  <div className="">
                    <button
                      type="button"
                      className="btn btn-secondary btn-sm text-nowrap"
                      onClick={() => {
                        setSelectedMods([]); // Clear the selected mods
                        setModOptions('');   // Clear the mod filter
                        setPatientName(""); // Clear the patient name filter
                        setPatientID("");   // Clear the patient ID filter
                        setBodyPart("");    // Clear the body part filter
                        setSelectedStatus(""); // Clear the selected status filter
                        setSelectedCenter(""); // Clear the selected center filter
                        setSelectedStartDate(""); // Clear the selected start date filter
                        setSelectedEndDate("");   // Clear the selected end date filter

                      }}
                    >
                      Clear Search
                    </button>
                  </div>
                </div>
              </div>

              {/* Status and Center */}
              <div className="mr-4">
                <div className="">
                  <div class="mb-3 ml-5">
                    <label for="dropdown1" class="form-label">Status: </label> <br />
                    <select class="form-select" id="dropdown1" value={selectedStatus} onChange={e => setSelectedStatus(e.target.value)}>
                      <option value="">Select an option</option>
                      <option value="Signed off">Signed off</option>
                      <option value="Sign   On">Sign On</option>
                    </select>

                  </div>
                  <div class="mb-3 ml-5">
                    <label for="dropdown2" class="form-label">Center:</label> <br />
                    <select class="form-select" id="dropdown2" value={selectedCenter} onChange={e => setSelectedCenter(e.target.value)}>
                      <option value="">Select an option</option>
                      {centerOptions.map((center, index) => (
                        <option key={index} value={center}>
                          {center}
                        </option>
                      ))}

                    </select>

                  </div>
                </div>
                {/* Scan Dates */}
                <div className="">
                  <div class="mb-3 ml-5">
                    <label for="dropdown3" class="form-label">Scan Start Date:</label> <br />
                    <select
                      class="form-select"
                      id="dropdown3"
                      value={selectedStartDate}
                      onChange={e => setSelectedStartDate(e.target.value)}
                    >
                      <option value="">Select a date</option>
                      {timeOptions.map((date, index) => (
                        <option key={index} value={date}>
                          {date.toLocaleString('default', { month: 'short' })} {/* Format to month */}
                        </option>
                      ))}
                    </select>
                  </div>


                  <div class="mb-3 ml-5">
                    <label for="dropdown4" class="form-label">Scan End Date:</label> <br />
                    <select
                      class="form-select"
                      id="dropdown4"
                      value={selectedEndDate}
                      onChange={e => setSelectedEndDate(e.target.value)}
                    >
                      <option selected disabled>Select a date</option>
                      {timeOptions.map((date, index) => (
                        <option key={index} value={date}>
                          {date.toLocaleString('default', { month: 'short' })} {/* Format to month */}
                        </option>
                      ))}
                    </select>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="xs-pd-20-10 pd-ltr-20">
          <div className="pd-20 card-box mb-30">
            <div className="clearfix mb-20">
              <div class="btn-group mr-2" role="group" aria-label="First group">
                <button type="button" class="btn btn-outline-primary">
                  User Session
                </button>

                <button type="button" class="btn btn-outline-primary">
                  Center Session
                </button>
              </div>
            </div>
            <div className="table-responsive">
              {/* <table class="data-table table stripe hover nowrap">
              <thead>
                <tr>
                  <th>
                    <div class="dt-checkbox">
                      <input
                        type="checkbox"
                        name="select_all"
                        value="1"
                        id="example-select-all"
                      />
                      <span class="dt-checkbox-label"></span>
                    </div>
                  </th>
                  <th class="table-plus datatable-nosort">Patient Name</th>
                  <th>Patient ID</th>
                  <th>Age</th>
                  <th>Sex</th>
                  <th>Body Part</th>
                  <th>Mod.</th>
                  <th>Center</th>
                  <th>Scan Date/Time</th>
                  <th>Status</th>
                  <th>Reported By</th>
                  <th>Lock</th>
                  <th class="datatable-nosort">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((item, index) => (
                  <tr key={index}>
                    <td>
                      <div className="dt-checkbox">
                        <input
                          type="checkbox"
                          name="select_all"
                          value="1"
                          id={`example-select-all-${index}`}
                        />
                        <span className="dt-checkbox-label"></span>
                      </div>
                    </td>
                    <td className="table-plus">{item.patientName}</td>
                    <td>{item.patientID}</td>
                    <td>{item.age}</td>
                    <td>{item.sex}</td>
                    <td>{item.bodyPart}</td>
                    <td>{item.mod}</td>
                    <td>{item.center}</td>
                    <td>{item.scanDateTime}</td>
                    <td>{item.status}</td>
                    <td>{item.reportedBy}</td>
                    <td></td>
                    <td>
                      <div className="dropdown">
                        <a
                          className="btn btn-link font-24 p-0 line-height-1 no-arrow dropdown-toggle"
                          href="#"
                          role="button"
                          data-toggle="dropdown"
                        >
                          <i className="dw dw-more"></i>
                        </a>
                        <div className="dropdown-menu dropdown-menu-right dropdown-menu-icon-list">
                          <a className="dropdown-item" href="#">
                            <i className="dw dw-eye"></i> View
                          </a>
                          <a className="dropdown-item" href="#">
                            <i className="icon-copy bi bi-download"></i> Download
                          </a>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table> */}
              <CustomDataTable tittleName="" headers={HeaderColumns} filterData={filteredData} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StudyManagement;
