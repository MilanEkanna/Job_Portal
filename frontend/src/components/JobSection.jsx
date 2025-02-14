import React, { useEffect, useState } from 'react'
import Navbar from './Shared/Navbar'
import Job from './Job'
import FilterCard from './FilterCard'

import { useDispatch, useSelector } from 'react-redux'
import { motion } from 'framer-motion'
import { setSearchedQuery } from '@/redux/jobSlice'
import useGetAllJobs from '@/Hooks/useGetAllJobs'
import { Button } from './ui/button'




// const jobArray = [1,2,3,4,5,6,7,8,9,]

const JobSection = () => {
 
  const dispatch = useDispatch()
  
  useGetAllJobs();
  const { allJobs, searchedQuery } = useSelector(store => store.jobs)


  const [filterJobs, setFilterJobs] = useState(allJobs)


  useEffect(() => {
    if (searchedQuery) {
      const filteredJobs = filterJobs.filter((job) => {
        return job.title?.toLowerCase().includes(searchedQuery.toLowerCase()) ||
          job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
          job.location.toLowerCase().includes(searchedQuery.toLowerCase())

      }
      )
      
      
      setFilterJobs(filteredJobs)
    } 
    return () => {
      dispatch(setSearchedQuery(""))
    }
  }, [allJobs, searchedQuery])
  
  const handelFilterRemove = ()=>{
    dispatch(setSearchedQuery(""))
    setFilterJobs(allJobs)
    
  }
  useEffect(()=>{
    return () => {
      dispatch(setSearchedQuery(""))
    }
  }, [])
  return (
    <div className='fixed w-full top-0 left-0"'>
      <Navbar />
      <div className='max-w-7xl mx-auto mt-5  '>
        <div className='flex gap-5'>

          <div className='w-20% -my-4'>
            <FilterCard />

          </div>
          {
            filterJobs?.length <= 0 ? <span className='text-2xl font-bold '>Oops ! No Job Available at this time, Try again later <br /><Button className="mt-5 text-right" onClick={handelFilterRemove}>Remove Filters to Default</Button></span> : (
              <div className='flex-1  h-[88vh] overflow-y-auto pb-5 ' >
                <div className='grid grid-cols-3 gap-4'>
                  {
                    filterJobs?.length === 0 ? <span>No job for this filter</span> : filterJobs?.map((job) => (
                      <motion.div
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        transition={{ duration: 0.6 }}
                      >
                        <Job key={job._id} job={job} />
                      </motion.div>
                    ))
                  }
                </div>


              </div>
            )
          }

        </div>

      </div>


    </div>
  )
}

export default JobSection






