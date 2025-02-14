import { COMPANY_API_ENDPOINT, JOB_API_ENDPOINT } from '@/constants/constant'
import { setAllCompanies } from '@/redux/companySlice'

import axios from 'axios'
import  { useEffect } from 'react'
import { useDispatch } from 'react-redux'

 const useGetAllCompanies = () => {
    const dispatch = useDispatch();
  useEffect(()=>{
    const fetchCompanies = async () => {
        try{
            const response = await axios.get(`${COMPANY_API_ENDPOINT}/get`,{withCredentials:true})
         
           
            if(response.data.success){
                dispatch(setAllCompanies(response.data.companies))
            }
        }
        catch(error){
            console.error(error);
        }
    }
    fetchCompanies();
  },[])
}

export default useGetAllCompanies


