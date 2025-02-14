import React, { useEffect } from 'react'
import LatestJobCard from './LatestJobCard'
import { useSelector } from 'react-redux'
import useGetAllJobs from '@/Hooks/useGetAllJobs'
import axios from 'axios'
import { JOB_API_ENDPOINT } from '@/constants/constant'
import { setAllJobs } from '@/redux/jobSlice'
import { useLocation } from 'react-router-dom'




// const randomJob = [1,2,3,4,5,6,7,8,9,10,11,12]

const LatestJobs = () => {


  
  const {allJobs} = useSelector(store => store.jobs)
  
  const {user} = useSelector(store => store.auth)



  return (
    <div className='max-w-6xl mx-auto my-20  '>
      {
        ! user ? <h1 className='text-4xl font-bold bg-orange-100 p-2 animate-bounce rounded-md border border-collapse  shadow-lg'><span className='text-[#720947]'>For Latest & Top </span>Job Openings Scroll Down...</h1> : 
        <h1 className='text-4xl font-bold bg-orange-100 p-2 animate-bounce rounded-md border border-collapse  shadow-lg'><span className='text-[#720947]'>Welcome {user.fullname.split(" ")[0]}, for Latest & Top </span>Job Openings Scroll Down...</h1>

      }
      <br />
        
        <div className='grid grid-cols-3 gap-6 my-5 '>

        {/* //Multiple Job cards Display here  */}
        {
          allJobs?.length <=0 ? <span>No Jobs Available</span> :  allJobs?.slice(0,9).map((job) => <LatestJobCard  key={job._id} job={job}/> )
        }
        
        </div>
    </div>
  )
}

export default LatestJobs