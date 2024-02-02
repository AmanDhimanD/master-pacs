import React from "react";
import * as XLSX from "xlsx";


const GroupManagement = () => {

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
  return (
    <>
      <div className="main-container">
        <div className="xs-pd-20-10 pd-ltr-20">
          <div className="page-header">
            <div className="row">
              <div className="col-md-6 col-sm-12">
                <div className="title">
                  <h4>Group Management</h4>
                  <p className='text-sm'>(Dummy data no group)</p>
                </div>
              
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
            <div className="clearfix mb-20">
              <div className="pull-left">
              </div>
            </div>
            <div className="table-responsive">
              <table className="table table-striped" id="ExportData">
                <thead>
                  <tr>
                    <th scope="col">Group</th>
                    <th scope="col">Status</th>
                    <th scope="col">Delete</th>
                    <th scope="col">Rules</th>
                    <th scope="col">Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Admin</td>
                    <td>
                      <span class="badge badge-primary">Disable</span>
                    </td>

                    <td>
                      <span class="badge badge-danger">Delete</span>
                    </td>
                    <td>Unrestricted Access</td>
                    <td>The admin group</td>
                  </tr>
                  <tr>
                    <td>Admin</td>
                    <td>
                      <span class="badge badge-primary">Disable</span>
                    </td>

                    <td>
                      <span class="badge badge-danger">Delete</span>
                    </td>
                    <td>Unrestricted Access</td>
                    <td>The admin group</td>
                  </tr>
                  <tr>
                    <td>Admin</td>
                    <td>
                      <span class="badge badge-primary">Disable</span>
                    </td>

                    <td>
                      <span class="badge badge-danger">Delete</span>
                    </td>
                    <td>Unrestricted Access</td>
                    <td>The admin group</td>
                  </tr>
                  <tr>
                    <td>Admin</td>
                    <td>
                      <span class="badge badge-primary">Disable</span>
                    </td>

                    <td>
                      <span class="badge badge-danger">Delete</span>
                    </td>
                    <td>Unrestricted Access</td>
                    <td>The admin group</td>
                  </tr>
                  <tr>
                    <td>Admin</td>
                    <td>
                      <span class="badge badge-primary">Disable</span>
                    </td>

                    <td>
                      <span class="badge badge-danger">Delete</span>
                    </td>
                    <td>Unrestricted Access</td>
                    <td>The admin group</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GroupManagement;
