import React, { useEffect, useState } from 'react'
import Navbar from './Shared/Navbar'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { useParams } from 'react-router-dom'

import axios from 'axios'
import { APPLICATION_API_ENDPOINT, JOB_API_ENDPOINT } from '@/constants/constant'
import { setSingleJob } from '@/redux/jobSlice'
import { useDispatch, useSelector } from 'react-redux'
import { formatTime } from './TimeFormat'
import { toast } from 'sonner'

const JobDescription = () => {
    const params = useParams();
    const {singleJob} = useSelector(store=>store.jobs)
    const {user} = useSelector(store=>store.auth)
    const isInitiallyApplied = singleJob?.applications?.some(application => application.applicant === user?._id ) || false;  // .some returns true for the satisfy value in array if match and applications is array
    const [isApplied, setIsApplied] = useState(isInitiallyApplied);
    const jobId = params.id;
    const dispatch  = useDispatch();

    const notify = () => {
        toast("In order to apply, Kindly Logged in first 😊", {
          style: { backgroundColor: 'black', color: 'white' }
        });
      };

    const applyJobHandler = async ()=>{
        try{
            const response = await axios.get(`${APPLICATION_API_ENDPOINT}/apply/${jobId}`,{withCredentials:true});
            console.log(response.data);
            
            if(response.data.success){
                setIsApplied(true); //This Will update the local state 
                const updateSingleJob = {...singleJob, applications:[...singleJob.applications,{applicant:user?._id}]};
                dispatch(setSingleJob(updateSingleJob));
               toast.success(response.data.message);
            }
        }catch(error){
            toast.error(error.response.data.message)
        }
    }
  
    // Here We are fetching the single job for which we have made the Api of in the backend

    useEffect(()=>{
        const fetchSingleJob = async () => {
            try{
                const response = await axios.get(`${JOB_API_ENDPOINT}/get/${jobId}`,{withCredentials:true})
                console.log(response.data);
                
                
    
                if(response.data.success){
                    dispatch(setSingleJob(response.data.job))
                    setIsApplied(response?.data?.job?.applications.some(application=>application?.applicant === user?._id))
                }
            }
            catch(error){
                console.error(error);
            }
        }
        fetchSingleJob();
      },[jobId, dispatch, user?._id]);

    return (
        <div>
            <div>
                <Navbar />
            </div>
            

            <div className='max-w-5xl mx-auto my-5 border border-gray-200 rounded-lg p-8 shadow-2xl '>
                <div className='flex items-center justify-between'>
                    <div>
                        <h1 className='font-bold text-2xl'>Company Name: {singleJob?.company.name}</h1>
                        <div className='flex items-center gap-2 mt-4'>
                            <Badge className={'text-blue-700 font-bold'} variant="ghost">Vacancies {singleJob?.position}</Badge>
                            <Badge className={'text-[#F83002] font-bold'} variant="ghost">Job Type : {singleJob?.jobType}</Badge>
                            <Badge className={'text-[#7209B7] font-bold'} variant="ghost">Salary: {singleJob?.salary} LPA</Badge>
                        </div>

                    </div>
                    {
                       ! user ? <Button onClick={notify} className="cursor-not-allowed">Kindly logged in to apply</Button> :<Button 
                       onClick={isApplied ? null : applyJobHandler}
                       disabled={isApplied}
                           className={`rounded-lg ${isApplied ? 'bg-gray-600 cursor-not-allowed' : 'bg-black hover:bg-slate-800 cursor-pointer'}`} >
                           {isApplied ? "Already Applied" : "Apply Now"}
                       </Button>
                    }
                    
                </div>
                <h1 className='border-b-2 border-b-gray-300 font-medium py-4'>About the Job</h1>
                <div className='my-4'>
                    <h1 className='font-bold my-1 text-lg'>Role : <span className='pl-4 font-normal text-gray-800'>{singleJob?.title}</span></h1>
                    <h1 className='font-bold my-1 text-lg'>Location : <span className='pl-4 font-normal text-gray-800'>{singleJob?.location}</span></h1>
                    <h1 className='font-bold my-1 text-lg'>Description : <span className='pl-4 font-normal text-gray-800'>{singleJob?.description}</span></h1>
                    <h1 className='font-bold my-1 text-lg'>Experience : <span className='pl-4 font-normal text-gray-800'>{singleJob?.experienceLevel} years</span></h1>
                    <h1 className='font-bold my-1 text-lg'>Salary : <span className='pl-4 font-normal text-gray-800'>{singleJob?.salary} LPA</span></h1>
                    <h1 className='font-bold my-1 text-lg'>Total Applicants : <span className='pl-4 font-normal text-gray-800'>{singleJob?.applications?.length}</span></h1>
                    <h1 className='font-bold my-1 text-lg'>Posted Date : <span className='pl-4 font-normal text-gray-800'>{formatTime(singleJob?.createdAt)}</span></h1>
                    <h1 className='font-bold my-1 text-lg flex'>Requirements : <span className='pl-4 font-normal text-gray-800 flex'>
                        {
                            singleJob?.requirements.map((item)=>(
                                <div className='space-x-7' key={item}>
                                    <h1 >| {item} | </h1>

                                </div>
                            ))
                        }
                        </span></h1>
                </div>
           
            </div>
        </div>
    )
}

export default JobDescription






