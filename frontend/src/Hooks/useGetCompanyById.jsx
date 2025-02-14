import { COMPANY_API_ENDPOINT } from '@/constants/constant'
import { setSingleCompany } from '@/redux/companySlice'

import axios from 'axios'
import  { useEffect } from 'react'
import { useDispatch } from 'react-redux'

 const useGetCompanyById = (companyId) => {
    const dispatch = useDispatch();
  useEffect(()=>{
    const fetchSingleCompany = async () => {
        try{
            const response = await axios.get(`${COMPANY_API_ENDPOINT}/get/${companyId}`,{withCredentials:true})    
            if(response.data.success){
                dispatch(setSingleCompany(response.data.company))
            }
        }
        catch(error){
            console.error(error);
        }
    }
    fetchSingleCompany();
  },[companyId, dispatch])
}

export default useGetCompanyById;


