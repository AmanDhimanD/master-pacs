import React from 'react'
import { Link } from 'react-router-dom'


const BackButton = () => {
    return (
        <Link to="/" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
           {"<-"}
        </Link>
    )
}

export default BackButton