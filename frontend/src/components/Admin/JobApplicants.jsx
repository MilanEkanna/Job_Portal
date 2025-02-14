import React, { useEffect } from 'react'
import Navbar from '../Shared/Navbar'
import { useDispatch, useSelector } from 'react-redux'
import ApplicantsTable from './ApplicantsTable'
import { toast } from 'sonner'
import axios from 'axios'
import { APPLICATION_API_ENDPOINT } from '@/constants/constant'
import { useParams } from 'react-router-dom'
import { setApplicants } from '@/redux/applicationSlice'

const JobApplicants = () => {
    const {user} = useSelector(store=>store.auth)
    const params = useParams()
    const dispatch = useDispatch();
    const {applicants} = useSelector(store=>store.application)
    useEffect(()=>{
        const fetchAllApplicants = async()=>{
            try {
                const response = await axios.get(`${APPLICATION_API_ENDPOINT}/${params.id}/applicants`,{withCredentials:true})
                dispatch(setApplicants(response.data.job))
                
                
            } catch (error) {
                console.log(error);
                toast.error(error.message)
                
            }
        }
        fetchAllApplicants()
    },[])
     
    return (
        <div >
            <Navbar/>
           <h1 className='text-2xl font-bold text-center mt-3'>Welcome <span className='text-[#720947]'>{user.fullname}</span> on the Job Applicants page</h1> 
            
            <div className='max-w-6xl mx-auto'>
                
                
                <h1 className='text-xl font-bold my-5'>Applicants ({applicants?.applications?.length}) </h1>
                        
                        <ApplicantsTable/> 
            </div>
        </div>
    )
}

export default JobApplicants