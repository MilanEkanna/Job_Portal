import { JOB_API_ENDPOINT } from '@/constants/constant'
import { setAllJobs } from '@/redux/jobSlice'
import axios from 'axios'
import  { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

 const useGetAllJobs = () => {
    const dispatch = useDispatch();
    const {searchedQuery} = useSelector(store=>store.jobs)
  useEffect(()=>{
    const fetchAllJobs = async () => {
        try{
            const response = await axios.get(`${JOB_API_ENDPOINT}/get?keyword=${searchedQuery}`,{withCredentials:true})
           
            
            if(response.data.success){
                dispatch(setAllJobs(response.data.jobs))
            }
        }
        catch(error){
            console.error(error);
        }
    }
    fetchAllJobs();
  },[])
}

export default useGetAllJobs


