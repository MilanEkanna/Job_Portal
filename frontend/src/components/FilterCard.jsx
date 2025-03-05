import React, { useEffect, useState } from 'react'
import { Label } from './ui/label'
import { useDispatch, useSelector } from 'react-redux'
import { setSearchedQuery, setJobsFilter, removeJobFromFilter } from '@/redux/jobSlice'
import { FaAngleDown, FaAngleUp } from "react-icons/fa"

const filterData = [
    {
        filterType: "Location",
        array: ["Delhi", "Banglore", "Noida", "Gurugram", "Pune", "Hyderabad"],
    },
    {
        filterType: "Industry",
        array: ["Frontend Developer", "Backend Developer", "Full Stack Developer", "Non Technical", "Data Scientist", "Technical Architect", "DevOps Engineer", "Cloud Engineer", "Cyber Security"],
    },
]

const FilterCard = () => {
    const [selectedValue, setSelectedValue] = useState("")
    const [isFilterOpen, setIsFilterOpen] = useState(false)
    const dispatch = useDispatch()
    const selectedFilters = useSelector(state => state.jobs.jobsFilter) 

    const handleFilterSelect = (value) => {
        // console.log(value);
        if (selectedFilters.includes(value)) {
            dispatch(removeJobFromFilter(value)) 
        } else {
            dispatch(setJobsFilter(value)) 
        }
    }

    useEffect(() => {
        dispatch(setSearchedQuery(selectedValue))
    }, [selectedValue, dispatch])

    return (
        <div className='w-60 xs:w-60 bg-orange-50 p-2 rounded-md px-4 xs:mt-5 mt-2 border  border-gray-700 xs:shadow-2xl ml-4'>
            <div className='flex xs:block items-center justify-between '>
                <h1 className='font-bold text-xl '>Filter Jobs</h1>
                <div className='xs:hidden'>
                    {isFilterOpen ? (
                        <span onClick={() => setIsFilterOpen(false)}><FaAngleUp /></span>
                    ) : (
                        <span onClick={() => setIsFilterOpen(true)}><FaAngleDown /></span>
                    )}
                </div>
            </div>
            <div className={`${isFilterOpen ? "block" : "hidden"} h-fit w-full xs:block mt-2`}>
                {filterData.map((item, index) => (
                    <div key={index} className='font-bold '>
                        <h2>{item.filterType}</h2>
                        {item.array.map((arrayItem, idx) => {
                            const itemId = `m${index}-${idx}`
                            return (
                                <div className='flex items-center space-x-2 m-3 w-fit ' key={idx}>
                                    <input
                                        type='checkbox'
                                        id={itemId}
                                        className='w-3 h-4 accent-[#720947] border-2 border-[#720947] cursor-pointer'
                                        value={arrayItem}
                                        checked={selectedFilters.includes(arrayItem)}
                                        onChange={() => handleFilterSelect(arrayItem)}
                                    />
                                    <Label htmlFor={itemId} className="cursor-pointer">{arrayItem}</Label>
                                </div>
                            )
                        })}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default FilterCard
