import { JOB_API_ENDPOINT } from '@/constants/constant'
import { setAllAdminJobs } from '@/redux/jobSlice'
import axios from 'axios'
import  { useEffect } from 'react'
import { useDispatch } from 'react-redux'

 const useGetAllAdminJobs = () => {
    const dispatch = useDispatch();
  useEffect(()=>{
    const fetchAllAdminJobs = async () => {
        try{
            const response = await axios.get(`${JOB_API_ENDPOINT}/getadminjobs`,{withCredentials:true})
           
            
            if(response.data.success){
                dispatch(setAllAdminJobs(response.data.jobs))
            }
        }
        catch(error){
            console.error(error);
        }
    }
    fetchAllAdminJobs();
  },[])
}

export default useGetAllAdminJobs


