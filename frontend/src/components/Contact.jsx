import React from 'react'
import Navbar from './Shared/Navbar'
import { useSelector } from 'react-redux'

const Contact = () => {
  const { user } = useSelector(store => store.auth)
  return (
    <div >
      <Navbar />
      <div className='p-6'>

        <div >
          <h1 className='text-2xl font-bold mt-2'>Welcome <span className='text-[#720947]'>{user?.fullname}</span> to the Contact page</h1>
        </div>
        <div className=''>
          <h1 className='text-2xl font-bold mt-2'></h1>
        </div>
      </div>
    </div>
  )
}

export default Contact





