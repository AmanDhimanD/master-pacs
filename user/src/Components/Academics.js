import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import CustomDataTable from './DataComponent/CustomDataTable'
import Loading from '../Loading'
import DataTable from 'react-data-table-component'

const Academics = () => {
  return (
    <>
      <Navbar />
      <AcademicsData />
    </>
  )
}

export default Academics

const AcademicsData = () => {
  const [data, setData] = useState([])
  const [userID, setUserID] = useState('')
  const [studyID, setstudyID] = useState('')
  const [ID, setID] = useState('')

  const handleSearch = () => {
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;
    console.log('Start Date:', startDate);
    console.log('End Date:', endDate);
  };

  const handleClearSearch = () => {
    document.getElementById('startDate').value = '';
    document.getElementById('endDate').value = '';
  };

  const fetchData = async () => {
    const BookMarkApi = 'http://localhost:8000/api/v2/bookmarks';
    try {
      const res = await fetch(BookMarkApi, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (res.ok) {
        const data = await res.json();
        const userId = data.map(x => x.userId).join(', ')
        const id = data.map(x => x._id).join(', ')
        setUserID(userId)
        setstudyID(id)
        if (userId == localStorage.getItem('email')) {
          //bookMarkData()
          fetchAPI()
        }
      } else {
        console.error("Failed to fetch bookmarks:", res.status, res.statusText);
      }
    } catch (error) {
      console.error("An error occurred while fetching bookmarks:", error);
    }
  };

  const fetchAPI = async () => {
    try {
      const responseAPI = await fetch(`http://localhost:8000/api/v2/getdata/${studyID}`);
      const resJson = await responseAPI.json();
      const processedData = resJson.map(item => ({
        patient: item.patient || {},
        study: item.study || {},
        series: item.series || {},
        image: item.image || {},
        id: setID(item._id)
      }));
      setData(processedData);
    } catch (err) {
      console.log("API Error Study: ", err);
    }
  };


  useEffect(() => {
    fetchData();
    //fetchAPI()
    //bookMarkData()
  }, []);

  // const data = [
  //   {
  //     patientName: 'John Doe',
  //     patientID: '123456',
  //     age: 30,
  //     sex: 'Male',
  //     bodyPart: 'Head',
  //     mod: 'CT',
  //     center: 'Center 1',
  //     scanDateTime: '2023-08-15 10:00 AM',
  //     reportedBy: 'Dr. Smith'
  //   },
  //   {
  //     patientName: 'Jane Smith',
  //     patientID: '789012',
  //     age: 25,
  //     sex: 'Female',
  //     bodyPart: 'Chest',
  //     mod: 'MR',
  //     center: 'Center 2',
  //     scanDateTime: '2023-08-16 02:30 PM',
  //     status: 'Singed On',
  //     reportedBy: 'Dr. Johnson'
  //   }
  // ];


  const combinedData = data.map(item => ({
    ...item.patient,
    ...item.series,
    ...item.study,
    ...item.image
  }));

  const handleViewData = () => {
    let studyDataID;
    combinedData.forEach(item => {
      studyDataID = item.StudyInstanceUid
    })
    //window.open(`http://localhost:3001/sampleview.html?studyId=` + studyDataID, '_blank', 'width=1500,height=760');
    window.open(`http://127.0.0.1:8080/index.html?studyId=` + studyDataID, '_blank', 'width=1500,height=760');
  }

  const Headercolumns = [
    {
      name: 'Patient Name',
      selector: row => row.PatientName,
      sortable: true,
      cell: row => <div className="table-plus datatable-nosort">{row.PatientName}</div>,

    },

    {
      name: 'Age',
      selector: row => row.Age,
      sortable: true,
    },
    {
      name: 'Sex',
      selector: row => row.Sex,
      sortable: true,
    },
    {
      name: 'Accession No',
      selector: row => row.AccessionNumber,
      sortable: true,
    },
    {
      name: 'Scan Date Time',
      selector: row => row.StudyDate,
      cell: row => {
        const isoDateString = row.StudyDate;
        const date = new Date(isoDateString);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        const hour = date.getHours();
        const minute = date.getMinutes();
        const formattedDate = `${day}-${month < 10 ? '0' : ''}${month}-${year}, ${hour}:${minute}`;
        return <div className="table-plus datatable-nosort">{formattedDate}</div>;
      }
    },
    {
      name: 'Folder Path',
      selector: row => row.folderpath,
      sortable: true,
    },
    {
      name: 'Comments',
      selector: row => row.comments,
      sortable: true,
    },
    {
      name: 'View Reports',
      selector: row => row.view,
      sortable: false,
      cell: row => <div className="datatable-nosort"><span className='text-center mt-2 leading-none flex pl-4 absolute bottom-0 left-0 w-full py-4 text-xs'>
        <span onClick={handleViewData} style={{ cursor: 'pointer' }}>  View</span>/Download
      </span></div>,
    },
  ];
  const NoDataComponent = () => (
    <div style={{ textAlign: 'center', padding: '20px' }} className='font-bold'>Loading Data........</div>
  );

  return (
    <>
      <section class="text-gray-600 body-font">
        <div class="container px-5 py-2 mx-auto">
          <div class="flex flex-wrap -m-2">
            <div class="p-2 lg:w-1/3 md:w-1/2 w-full">
              <div class="h-full flex items-center border-gray-200 border p-4 rounded-lg">
                <div class="flex-grow">
                  <label for="full-name" class="leading-7 text-sm  text-gray-600">Root Folder</label>
                  <select
                    id="full-name"
                    name="full-name"
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  >
                    <option>Select folder</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="p-2 lg:w-1/3 md:w-1/2 w-full">
              <div class="h-full flex items-center border-gray-200 border p-4 rounded-lg">
                <div class="mb-4 ml-16">
                  <label for="startDate" class="block text-sm  text-gray-700">Scan Start Date</label>
                  <input type="date" id="startDate" name="startDate" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
                </div>
                <div class="mb-4 ml-10">
                  <label for="endDate" class="block text-sm text-gray-700">Scan End Date</label>
                  <input type="date" id="endDate" name="endDate" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
                </div>
              </div>
            </div>
            <div class="p-2 lg:w-1/3 md:w-1/2 w-full">
              <div class="h-full flex items-center border-gray-200 border p-4 rounded-lg">
                <div class="flex justify-center ml-16">
                  <button onClick={handleSearch} class="inline-flex text-white bg-indigo-500 border-0 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">Search</button>
                  <button onClick={handleClearSearch} class="ml-4 inline-flex text-gray-700 bg-gray-100 border-0 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg">Clear Search</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className='container mx-auto mt-10 text-black'>
        <DataTable
          columns={Headercolumns}
          data={combinedData}
          pagination
          //progressPending={pending}
          progressComponent={<Loading />}
          dense
          customStyles={{
            rows: {
              style: {
                fontSize: '14px',
              }
            },
            cells: {
              style: {
                fontSize: '14px',
              }
            },
            headCells: {
              style: {
                backgroundColor: '#ccc8c8', // Background color of header cells
                fontWeight: 'bold',

              },
            },

          }}
          noDataComponent={<NoDataComponent />}
        />
      </div>
    </>
  )
}


