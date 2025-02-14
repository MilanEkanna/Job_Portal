


import React, { useEffect } from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'

const filterData = [
    {
        filterType: "Location",
        array: ["Delhi", "Banglore", "Noida", "Gurugram", "Pune", "Hyderabad"],
    },

    {
        filterType: "Industry",
        array: ["Frontend Developer", "Backend Developer", "Full Stack Developer", "Non Technical", "Data Scientist", "Technical Architect", "DevOps Engineer", "Cloud Engineer, ", "Cyber Security"],
    },


]

const FilterCard = () => {
    const [selectedValue, setSelectedValue] = React.useState("")
    const dispatch = useDispatch();

    const changeHandler = (value)=>{
        setSelectedValue(value)

    }
    useEffect(()=>{
        dispatch(setSearchedQuery(selectedValue))
        
    },[selectedValue])
    return (
        <div className='w-full bg-orange-50 p-2 rounded-md '>
            <h1 className='font-bold text-xl '>Filter Jobs</h1>
            <hr className='mt-3 ' />

            <RadioGroup value = {selectedValue} onValueChange={changeHandler}>
                {
                    filterData.map((item, index) => (
                        <div key={index} className='font-bold '>
                            <h2>{item.filterType}</h2>
                            {
                                item.array.map((arrayItem, idx) => {
                                    const itemId = `m${index}-${idx}`
                                    return (
                                        <div className='flex items-center space-x-2 m-3 ' key={idx}>

                                            <RadioGroupItem key={idx} value={arrayItem} id={itemId} />
                                            <Label  htmlFor={itemId}>{arrayItem}</Label>
                                        </div>
                                    )
                                }


                            )}
                        </div>
                    ))
                }
                </RadioGroup>
        </div >
    )
}

export default FilterCard