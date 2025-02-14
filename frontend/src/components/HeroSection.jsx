import React, { useEffect } from 'react'
import { Button } from './ui/button'
import { Search } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'
import { useNavigate } from 'react-router-dom'


const HeroSection = () => {
 
  const [query, setQuery] = React.useState('')
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const searchJobHandler = ()=>{
    dispatch(setSearchedQuery(query));
    navigate("/browse")

    
  }
  return (
    <div className='text-center  '>

      <div className='flex flex-col gap-5 pt-4 '>

        <span className=' mx-auto px-4 py-2 rounded-full bg-[#720947] hover:bg-[#541238] text-white font-medium'>No. 1 Job Hunt Platform</span>
        <h1 className='text-5xl font-bold '>Search, Apply & <br /> Get Your <span className='text-[#720947]'>Dream Jobs</span></h1>
        <p>Welcome to CareerConnect, it's a no. 1 platform  known for it's best and one click job search experience.</p>
       
        <div className='flex w-[40%] shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto mt-3'>

          <input 
            type="text"
            onChange={(e)=> setQuery(e.target.value)}
            placeholder='Find your dream jobs'
            className='outline-none border-none w-full'
          />

          <Button onClick={searchJobHandler} className="outline-none border-none border rounded-r-full bg-[#720947]"><Search /> Search</Button>
        </div>
      </div>
    </div>
  )
}

export default HeroSection