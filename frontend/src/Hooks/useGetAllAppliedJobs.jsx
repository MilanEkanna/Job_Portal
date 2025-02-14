import { APPLICATION_API_ENDPOINT, } from '@/constants/constant'
import { setAllAppliedJobs } from '@/redux/jobSlice'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetAllAppliedJobs = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchAppliedJobs = async () => {
            try {
                const response = await axios.get(`${APPLICATION_API_ENDPOINT}/get`, { withCredentials: true })

                if (response.data.success) {
                    dispatch(setAllAppliedJobs(response.data.application))
                }
            }
            catch (error){
                console.error(error);
            }
        }
        fetchAppliedJobs();
    }, [])
}

export default useGetAllAppliedJobs


