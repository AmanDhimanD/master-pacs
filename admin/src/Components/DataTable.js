import React from 'react';

const DataTable = () => {
    const data = [
        { login: 'Example1', name: 'Admin', group: 'Admin', status: 'Disable' },
        { login: 'Example2', name: 'Admin', group: 'Admin', status: 'Enable' },
        // Add more data rows as needed
    ];

    const handleButtonClick = (message) => {
        alert(message);
    };

    const buttonStyles = {
       
        color: 'white', // Text color
        padding: '4px 10px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    };

    return (
        <div className="mt-8">
            <table className="w-full border-collapse">
                <thead>
                    <tr>
                        <th className="border border-gray-400 px-4 py-2 font-bold bg-gray-200 text-center">Login</th>
                        <th className="border border-gray-400 px-4 py-2 font-bold bg-gray-200 text-center">Name</th>
                        <th className="border border-gray-400 px-4 py-2 font-bold bg-gray-200 text-center">Group</th>
                        <th className="border border-gray-400 px-4 py-2 font-bold bg-gray-200 text-center">Change Password</th>
                        <th className="border border-gray-400 px-4 py-2 font-bold bg-gray-200 text-center">Status</th>
                        <th className="border border-gray-400 px-4 py-2 font-bold bg-gray-200 text-center">Edit</th>
                        <th className="border border-gray-400 px-4 py-2 font-bold bg-gray-200 text-center">Delete</th>
                        <th className="border border-gray-400 px-4 py-2 font-bold bg-gray-200 text-center">Lock</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, index) => (
                        <tr key={index}>
                            <td className="border border-gray-400 px-4 py-2 text-center">
                               
                                    {row.login}
                                
                            </td>
                            <td className="border border-gray-400 px-4 py-2 text-center">
                               
                                    {row.name}
                                
                            </td>
                            <td className="border border-gray-400 px-4 py-2 text-center">
                                
                                    {row.group}
                              
                            </td>
                            <td className="border border-gray-400 px-4 py-2 text-center">
                                <button
                                    style={buttonStyles}
                                    className='bg-blue-500'
                                    onClick={() => handleButtonClick(`Change Password`)}
                                >
                                    Change Password
                                </button>
                            </td>
                            <td className="border border-gray-400 px-4 py-2 text-center">
                                <button
                                    style={buttonStyles}
                                    className='bg-green-500'
                                    onClick={() => handleButtonClick(`Status: ${row.status}`)}
                                >
                                    {row.status}
                                </button>
                            </td>
                            <td className="border border-gray-400 px-4 py-2 text-center">
                                <button style={buttonStyles} className='bg-blue-500'
                                  onClick={() => handleButtonClick(`Edit`)}>
                                    Edit
                                </button>
                            </td>
                            <td className="border border-gray-400 px-4 py-2 text-center">
                                <button style={buttonStyles} className='bg-red-500'
                                  onClick={() => handleButtonClick(`Delete`)}>
                                    Delete
                                </button>
                            </td>
                            <td className="border border-gray-400 px-4 py-2 text-center">
                                <button style={buttonStyles} className='bg-red-500'
                                  onClick={() => handleButtonClick(`Lock`)}>
                                    Lock
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DataTable;
