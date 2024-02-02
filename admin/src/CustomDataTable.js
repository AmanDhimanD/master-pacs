import { useEffect, useMemo, useState } from 'react';
import DataTable from 'react-data-table-component';


// const columns = [
//     {
//         name: 'Title',
//         selector: row => row.title,
//         sortable: true,
//     },
//     {
//         name: 'Year',
//         selector: row => row.year,
//         sortable: true,
//     },
// ];

// const data = [
//     {
//         id: 1,
//         title: 'Beetlejuice',
//         year: '1988',
//     },
//     {
//         id: 2,
//         title: 'Ghostbusters',
//         year: '1984',
//     },
//     {
//         id: 2,
//         title: 'Ghostbusters',
//         year: '1984',
//     },
//     {
//         id: 2,
//         title: 'Ghostbusters',
//         year: '1984',
//     },
//     {
//         id: 2,
//         title: 'Ghostbusters',
//         year: '1984',
//     },
//     {
//         id: 2,
//         title: 'Ghostbusters',
//         year: '1984',
//     },
//     {
//         id: 2,
//         title: 'Ghostbusters',
//         year: '1984',
//     },
//     {
//         id: 2,
//         title: 'Ghostbusters',
//         year: '1984',
//     },
//     {
//         id: 2,
//         title: 'Ghostbusters',
//         year: '1984',
//     }, {
//         id: 2,
//         title: 'Ghostbusters',
//         year: '1984',
//     }, {
//         id: 2,
//         title: 'Ghostbusters',
//         year: '1984',
//     },
//     {
//         id: 2,
//         title: 'Ghostbusters',
//         year: '1984',
//     },
//     {
//         id: 2,
//         title: 'Ghostbusters',
//         year: '1984',
//     }, {
//         id: 2,
//         title: 'Ghostbusters',
//         year: '1984',
//     },
//     {
//         id: 2,
//         title: 'Ghostbusters',
//         year: '1984',
//     },
//     {
//         id: 2,
//         title: 'Ghostbusters',
//         year: '1984',
//     },
//     {
//         id: 2,
//         title: 'Ghostbusters',
//         year: '1984',
//     },
//     {
//         id: 2,
//         title: 'Ghostbusters',
//         year: '1984',
//     }, {
//         id: 2,
//         title: 'Ghostbusters',
//         year: '1984',
//     },
//     {
//         id: 2,
//         title: 'Ghostbusters',
//         year: '1984',
//     },

// ]

function CustomDataTable({ tittleName, headers, filterData }) {
    const [pending, setPending] = useState(true);
    const [rows, setRows] = useState([]);
    let dataValue = []

    useEffect(() => {
        if (!filterData) {
            return; // Exit if filterData is not available yet
        }

        const restructuredDataArray = filterData.map(patientRecord => {
            return {
                patientName: patientRecord.PatientName || '',
                patientID: patientRecord.PatientId || '',
                age: patientRecord.Age || '',
                sex: patientRecord.Sex || '',
                bodyPart: '', // Replace with actual value
                mod: '', // Replace with actual value
                center: '', // Replace with actual value
                scanDateTime: '', // Replace with actual value
                status: '', // Replace with actual value
                reportedBy: '' // Replace with actual value
            };
        });

        const timeout = setTimeout(() => {
            //setRows(restructuredDataArray); 
            setPending(false);
        }, 2000);

        return () => clearTimeout(timeout);

    }, [filterData]);

    // const NoDataComponent = () => (
    //     <div style={{ textAlign: 'center', padding: '20px' }} className='font-bold'>Loading Data........</div>
    // );

    return (
        <div className=''>
            <DataTable
                title={tittleName}
                columns={headers}
                data={filterData}
                selectableRows
                pagination
                progressPending={pending}
                progressComponent={<CustomLoader />}
                //progressComponent={<Loading />}
                dense
                customStyles={{
                    rows: {
                        style: {
                            fontSize: '15px',
                        }
                    },
                    cells: {
                        style: {
                            fontSize: '15px',
                        }
                    },
                    headCells: {
                        style: {
                            backgroundColor: '#5e68f2', // Background color of header cells
                            fontWeight: 'bold',
                            fontSize: '15px',
                            color: "white"

                        },
                    },

                }}
            // noDataComponent={<NoDataComponent />}
            />
        </div>
    );
};

export default CustomDataTable


const CustomLoader = () => {
    return (
        <h4>Loading.........</h4>
    )
}
