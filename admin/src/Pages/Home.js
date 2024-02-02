import React from 'react'
import Sidebar from '../Components/Sidebar'
import Data from '../Components/Data'


const Home = ({ data }) => {
  return (
    <>
      <Sidebar children={data} />
    </>
  )
}

export default Home 