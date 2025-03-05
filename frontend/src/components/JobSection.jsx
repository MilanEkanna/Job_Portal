import React, { useEffect, useState } from 'react'
import Navbar from './Shared/Navbar'
import Job from './Job'
import FilterCard from './FilterCard'
import { useDispatch, useSelector } from 'react-redux'
import { motion } from 'framer-motion'
import { disSelectAllFilters, setSearchedQuery } from '@/redux/jobSlice'
import useGetAllJobs from '@/Hooks/useGetAllJobs'
import { Button } from './ui/button'

const JobSection = () => {
  const dispatch = useDispatch();

  useGetAllJobs();
  const { allJobs, searchedQuery, jobsFilter } = useSelector(store => store.jobs);

  const [filterJobs, setFilterJobs] = useState([]);

  useEffect(() => {
    let filteredJobs = allJobs;

    if (searchedQuery) {
      filteredJobs = filteredJobs.filter((job) =>
        job.title?.toLowerCase().includes(searchedQuery.toLowerCase()) ||
        job.description?.toLowerCase().includes(searchedQuery.toLowerCase()) ||
        job.location?.toLowerCase().includes(searchedQuery.toLowerCase())
      );
    }

    if (jobsFilter.length > 0) {
      filteredJobs = filteredJobs.filter((job) =>
        jobsFilter.some(filter => 
          job.title?.toLowerCase().includes(filter.toLowerCase()) ||
          job.location?.toLowerCase().includes(filter.toLowerCase())
        )
      );
    }

    setFilterJobs(filteredJobs);
  }, [allJobs, searchedQuery, jobsFilter]);

  const handleFilterRemove = () => {
    dispatch(setSearchedQuery(""))
    dispatch(disSelectAllFilters());
    setFilterJobs(allJobs);
  };

  return (
    <div className='fixed w-full top-0 left-0'>
      <Navbar />
      <div className='max-w-7xl mx-auto mt-5'>
        <div className='flex flex-col xs:flex-row xs:gap-5'>
          <div className='w-20% -my-4'>
            <FilterCard />
          </div>
          <div className='mt-8 xs:mt-0'>
            {filterJobs.length === 0 ? (
              <span className='text-2xl font-bold'>
                Oops! No Job Available at this time, Try again later <br />
                <Button className="mt-5 text-right" onClick={handleFilterRemove}>
                  Remove Filters to Default
                </Button>
              </span>
            ) : (
              <div className='flex-1 h-[88vh] overflow-y-auto pb-5'>
                <div className='grid grid-cols-1 xs:grid-cols-3 px-4 xs:gap-4'>
                  {filterJobs.map((job) => (
                    <motion.div
                      key={job._id}
                      initial={{ opacity: 0, x: 100 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      transition={{ duration: 0.6 }}
                    >
                      <Job job={job} />
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobSection;
