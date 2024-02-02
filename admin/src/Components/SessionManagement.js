import React, { useEffect, useRef, useState } from 'react'
import Dashboard from './Dashboard'
import { writeFileSync } from "xlsx";
import * as XLSX from "xlsx";
import '../App.css';
import $, { data } from "jquery"; // Import jQuery (required for DataTables)
import "datatables.net"; // Import DataTables CSS and JS
import "datatables.net-dt";

import swal from "sweetalert";
import SessionTableData from './SessionTableData';
import CustomDataTable from '../CustomDataTable';
import DataTable from 'react-data-table-component';


const SessionManagement = () => {
  const [datavalue, setData] = useState([])

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

  const handleEndSession = (id) => {
    swal({
      title: "Are you sure?",
      text: "This will end the session.",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willEnd) => {
      if (willEnd) {
        setData(prevData => prevData.map(item => {
          if (item.id === id) {
            return { ...item, isSessionEnded: true };
          }
          return item;
        }));
        swal("Session ended.", {
          icon: "success",
        });
      } else {
        swal("Session not ended.");
      }
    });
  };



  const tableRef = useRef(null);

  useEffect(() => {
    const dataTable = $(tableRef.current).DataTable({
      paging: true,
      pageLength: 5,
      searching: true,
      responsive: true,
      lengthMenu: [5, 10, 25, 50, 100],
      dom: '<"top"lf>rt<"bottom"ip><"clear">',
      language: {
        paginate: {
          previous: 'Previous',
          next: 'Next',
        },
      },
    });
    handleData()

    return () => {
      // Destroy the DataTable when the component unmounts
      dataTable.destroy();
    };
  }, []);

  // const TableHeaders = [
  //   {
  //     name: 'S.No.',
  //     selector: (row) => row.SNo,
  //   },
  //   {
  //     name: 'Login',
  //     selector: (row) => row.Login,
  //   },
  //   {
  //     name: 'Login Time',
  //     selector: (row) => row.LoginTime,
  //   },
  //   {
  //     name: 'Client IP',
  //     selector: (row) => row.ClientIP,
  //   },
  //   {
  //     name: 'Last Activity',
  //     selector: (row) => row.lastLogin,
  //   },
  //   {
  //     name: 'Session Ended',
  //     selector: (row) => row.SessionEnded,
  //   },
  // ];
  const TableHeaders = [
    {
      name: 'Unique UID',
      selector: (row) => row._id, // Replace with the appropriate field from your API response
    },
    {
      name: 'Login',
      selector: (row) => row.lastLogin,
    },
    // Add more headers for other fields as needed
  ];


  const handleData = async () => {
    try {
      const responseAPI = await fetch("http://localhost:8000/session");
      const resJson = await responseAPI.json();

      setData([resJson]);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <div className="main-container">
        <div className="xs-pd-20-10 pd-ltr-20">
          <div className="page-header">
            <div className="row">
              <div className="col-md-6 col-sm-12">
                <div className="title">
                  <h4>Session Management</h4>
                </div>
                <nav aria-label="breadcrumb" role="navigation">
                  <ol className="breadcrumb">
                    {/* <li className="breadcrumb-item">
                      <a href="">Home</a>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                    
                    </li> */}
                  </ol>
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
                    Add Group
                  </a>
                  <div className="dropdown-menu dropdown-menu-right">
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

            {/* Button to navigate the session */}
            <div className="clearfix mb-30">
              <div class="btn-group mr-2" role="group" aria-label="First group">
                <button type="button" class="btn btn-outline-primary">
                  User Session
                </button>

                <button type="button" class="btn btn-outline-primary">
                  Center Session
                </button>
              </div>
            </div>


            <div className="table-responsive ">
              <div>
                <table className="table">
                  <thead>
                    <tr>
                      {TableHeaders.map((header, columnIndex) => (
                        <th key={columnIndex}>{header.name}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>


                    {datavalue.map((row, rowIndex) => (
                      <tr key={rowIndex}>
                        {TableHeaders.map((header, columnIndex) => (
                          <td key={columnIndex}>{header.selector(row)}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}



const CustomLoader = () => {
  return (
    <h4>Loading.........</h4>
  )
}


export default SessionManagement


