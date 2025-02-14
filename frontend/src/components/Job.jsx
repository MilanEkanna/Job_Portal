import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { Bookmark } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { Skeleton } from './ui/skeleton'
import { Link } from 'react-router-dom'
import { formatTime } from './TimeFormat'


const Job = ({job}) => {


    const [loading, setLoading] = useState(true);

    useEffect(() => { //
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000);
        return () => clearTimeout(timer); // clear the timer when the component unmounts
    }, []);

    return (
        <div className='p-6 rounded-md shadow-xl bg-white border border-gray-200 overflow-y-auto m-2 transform transition-all duration-300 hover:scale-105 h-auto'>
            {loading ? (
                <div className="flex flex-col space-y-3 duration-75">
                    <Skeleton className="h-[225px] w-[250px] rounded-xl" />
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-[250px]" />
                        <Skeleton className="h-4 w-[200px]" />
                    </div>
                </div>
            ) : (
            
            <>

                <div className='flex items-center justify-between'>
                  <p className='font-bold text-muted-foreground'> <span className='font-bold text-black'>Posted : </span>{ formatTime(job?.createdAt)}</p>
                    <Button variant="outline" classname="rounded-full" size="icon"><Bookmark /></Button>

                </div>
                <div className='flex items-center gap-4 my-2'>
                    <Button variant="outline" classname="rounded-full p-6" size="icon">
                        <Avatar className="cursor-pointer">
                            <AvatarImage src={job?.company?.logo} />
                            <AvatarFallback>Company Profile Image</AvatarFallback>
                        </Avatar>
                    </Button>
                    <div>
                        <h1 className='font-bold text-lg'>{job?.company?.name}</h1>
                        <p className='text-sm text-muted-foreground'>{job?.location}</p>
                    </div>


                </div>
                <div>
                    <h1 className='font-bold text-lg my-2 '>{job?.title}</h1>
                    <p className='text-sm text-muted-foreground'>{job?.description}</p>
                </div>
                <div className='flex items-center gap-1 mt-4'>
                    <Badge className={'text-blue-700 font-bold'} variant="ghost">Positions {job?.position}</Badge>
                    <Badge className={'text-[#F83002] font-bold'} variant="ghost">{job?.jobType}</Badge>
                    <Badge className={'text-[#7209B7] font-bold'} variant="ghost">{job?.salary} LPA</Badge>
                    {/* <Badge className={'text-[#7209B7] font-bold'} variant="ghost">{job?.experienceLevel} yrs Exp</Badge> */}
                </div>
                <div className='flex items-center gap-4 mt-4'>
                    <Link to={`/description/${job?._id}`}><Button variant="outline">Details</Button></Link>
                    <Button className="bg-pink-900 hover:bg-[#a32c64]">Save for later</Button>
                </div>

            </>
             )} 

        </div>
    )
}

export default Job






