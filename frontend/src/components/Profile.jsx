import React, { useEffect, useState } from 'react'
import Navbar from './Shared/Navbar'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Contact, Mail, Pen } from 'lucide-react'
import { Badge } from './ui/badge'
import { Label } from './ui/label'
import { Skeleton } from './ui/skeleton'

import { Link } from 'react-router-dom'
import UpdateProfileDialog from './UpdateProfileDialog'
import { useSelector } from 'react-redux'
import useGetAllAppliedJobs from '@/Hooks/useGetAllAppliedJobs'


// const skills = ["MERN STACK", "React", "Node", "Express", "MongoDB"]
const isresume = true;

const Profile = () => {
    
    const [open, setOpen] = useState(false)

    const {user} = useSelector(store=>store.auth)

    // console.log(user);
    


    const [loading, setLoading] = useState(true);

    useEffect(() => { //
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000);
        return () => clearTimeout(timer); // clear the timer when the component unmounts
    }, []);

    return (
        <div>
            <Navbar />


            {loading ? (
                
                <div className="flex justify-center my-2 h-screen ">
                    <div className="w-1/2 h-1/2 flex flex-col space-y-3 border border-gray-50 rounded-xl">
                        <Skeleton className="h-[250px] w-full rounded-xl" />
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-5/6" />
                        </div>
                    </div>
              
                    
                    
                </div>
               
            ) : (
                <div>



                    <div className='max-w-4xl mx-auto shadow-lg bg-white border border-gray-200 rounded-2xl my-2 p-8 hover:shadow-2xl '>




                        <div className='flex justify-between '>

                            <div className='flex items-center gap-5'>

                                <Avatar className="h-20 w-20 ">
                                    <AvatarImage src={user?.profile?.profilePhoto} />
                                    <AvatarFallback>Image Profile</AvatarFallback>
                                </Avatar>
                                <div>
                                    <h1 className='font-medium text-xl '>{user?.fullname}</h1>
                                    <p className=' text-muted-foreground'>{user?.profile?.bio}</p>

                                </div>

                            </div>
                            <Button onClick={()=>setOpen(true)} className="text-right bg-[#720947]" >Edit Profile</Button>
                        </div>
                        <div className='my-5'>
                            <div className='flex items-start gap-3 my-3'>
                                <Mail />
                                <span>{user?.email}</span>
                            </div>
                            <div className='flex items-start gap-3'>
                                <Contact />
                                <span>{user?.phoneNumber}</span>
                            </div>
                        </div>

                        <div  >
                            <h1 className='text-lg font-medium mx-1 my-2'> Your Skills are </h1>
                            <div className='flex items-center gap-2'>

                                {
                                    user?.profile?.skills.length !== 0  ? user?.profile?.skills.map((item, index) => <Badge key={index}>{item}</Badge>) : <p>No skills added</p>   
                                }
                            </div>
                        </div>

                        <div className='grid w-full max-w-sm items-center gap-1.5 '>
                            <Label className="text-lg font-bold mt-2">Resume</Label>
                            {
                                isresume ? <a target='_blank' href={user?.profile?.resume}><span className=' text-blue-600 font-medium'>{user?.profile?.resumeOriginalName}</span></a> : <p>No resume here</p>
                            }

                        </div>




                    </div>

                    <div className='max-w-4xl mx-auto   p-3 table-container mt-5'>
                        <h1 className='font-bold text-xl'>Click here to get a list of your Applied Jobs</h1>
                        <Link to="/appliedjobtable"><Button  className="mt-3 bg-[#720947]"><h1>Applied Jobs</h1></Button></Link>
                        {/* Application Table component come here */}


                    </div>
                    <UpdateProfileDialog open={open} setOpen={setOpen} />


                </div>
            )}


        </div>
    )
}

export default Profile