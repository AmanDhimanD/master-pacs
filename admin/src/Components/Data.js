import React from 'react'
import DataTable from '../Components/DataTable'

const Data = () => {
    return (
        <>

            <div className="flex justify-between items-center p-4 border-b">
                <h1 className="text-3xl font-bold">User Management</h1>
                <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Add User</button>
            </div>
            <DataTable />

        </>
    )
}

export default Data