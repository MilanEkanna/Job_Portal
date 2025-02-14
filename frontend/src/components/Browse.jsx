import React, { useEffect } from 'react'
import Navbar from './Shared/Navbar'
import Job from './Job'
import { useDispatch, useSelector } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'
import useGetAllJobs from '@/Hooks/useGetAllJobs'
// import { useSelector } from 'react-redux'

// const randomJobs = [1, 2, 3,4,5,6,7,8,9,2,3,4,5,6,7]


const Browse = () => {
  useGetAllJobs();
  const {allJobs} = useSelector(store=>store.jobs)
  const dispatch = useDispatch()
  useEffect(()=>{
    return () => {
      dispatch(setSearchedQuery(""))
    }
  }, [])
  return (
    <div >
      <Navbar />
      <div className='max-w-7xl mx-auto  p-4'>

        <h1 className='font-bold text-xl'>Search Results ({allJobs.length})</h1>
        {
          allJobs.length <= 0 ? <h1 className='text-4xl text-gray-500 mt-32 text-center'>Oops!! No Jobs Found</h1> 
          : <div className='grid grid-cols-3 gap-4 mt-2 mb-4 '>

          {
            allJobs.map((job) => {
              return (
                <Job key={job?._id} job={job} />
              )
            })
          }
        </div>
        }
      </div>
    </div>
  )
}

export default Browse