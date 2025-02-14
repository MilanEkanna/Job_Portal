
import React, { useState, useEffect } from 'react'
import { Badge } from './ui/badge'
import { Skeleton } from './ui/skeleton';
import { formatTime } from './TimeFormat';
import { useNavigate } from 'react-router-dom';
import useGetAllJobs from '@/Hooks/useGetAllJobs';

const LatestJobCard = ({job}) => {
    
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    
    useEffect(() => { //
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000);
        return () => clearTimeout(timer); // clear the timer when the component unmounts
    }, []);

    return (
        <div onClick={()=>navigate(`/description/${job._id}`)} className='p-5 rounded-md shadow-2xl bg-white border border-gray-100 cursor-pointer transform transition-all duration-300 hover:scale-105'>
            {loading ? (
                <div className="flex flex-col space-y-3 duration-75">
                    <Skeleton className="h-[125px] w-[250px] rounded-xl" />
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-[250px]" />
                        <Skeleton className="h-4 w-[200px]" />
                    </div>
                </div>
            ) : (
                <>
                    <div>
                    <div className='flex items-center justify-between '>
                   
                    <p className='font-bold text-muted-foreground'> <span className='font-bold text-black'>Posted : </span>{formatTime(job?.createdAt)}</p>

                </div>
                        <div className='flex justify-between'>
                            <div>

                                <h1 className='font-medium text-lg'>{job?.company?.name}</h1>
                            </div>
                            <div>
                            <Badge className={'bg-[#720947] text-white font-bold'} variant="ghost">Exp: {job?.experienceLevel} yrs</Badge>
                                {/* <h1 className='font-medium text-lg'>Exp: {job?.experienceLevel} yrs</h1> */}
                            </div>

                        </div>
                        <p className='text-sm text-gray-500'>{job?.location}</p>
                    </div>
                    <div>
                        <h1 className='font-bold text-lg my-2 '>{job?.title}</h1>
                        <p className='text-sm text-gray-600'> {job?.description}</p>
                    </div>
                    <div className='flex items-center gap-2 mt-4'>
                        <Badge className={'text-blue-700 font-bold'} variant="ghost">Positions {job?.position}</Badge>
                        <Badge className={'text-[#F83002] font-bold'} variant="ghost">{job?.jobType}</Badge>
                        <Badge className={'text-[#7209B7] font-bold'} variant="ghost">{job?.salary} LPA</Badge>
                    </div>
                </>
            )}
        </div>
    )
}

export default LatestJobCard