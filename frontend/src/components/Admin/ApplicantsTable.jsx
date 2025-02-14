import React, { useEffect } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Badge } from '../ui/badge'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import {  MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { toast } from 'sonner'
import axios from 'axios'
import { APPLICATION_API_ENDPOINT } from '@/constants/constant'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'

const status = ["Accepted", "Rejected"]
const ApplicantsTable = () => {
    const navigate = useNavigate();
    const { applicants } = useSelector(store => store.application)

console.log(applicants);


    const statusHandler = async (status, id)=>{
        try {
            const response = await axios.post(`${APPLICATION_API_ENDPOINT}/status/${id}/update`, {status},{withCredentials:true});
            if(response.data.success){
                toast.success(response.data.message)

            }
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
    return (
        <div>
            <Table>
                <TableCaption>A list of recent applied applicants</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Fullname</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Resume</TableHead>
                        <TableHead>Date Applied</TableHead>
                        
                        <TableHead className="text-right" >Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        applicants && applicants?.applications?.map((item) => (

                            <tr key={item.id}>
                                <TableCell>{item?.applicant?.fullname}</TableCell>
                                <TableCell className="text-blue-600"> <a href="mailto:{item?.applicant?.email}"> {item?.applicant?.email}</a></TableCell>
                                <TableCell>{item?.applicant?.phoneNumber}</TableCell>
                                <TableCell>
                                    {
                                    item?.applicant?.profile?.resume ?    <a href={item?.applicant?.profile?.resume} target='_blank' className='text-blue-600 underline '>{item?.applicant?.profile?.resumeOriginalName}</a> : <h1 className='text-red-600'>*Not uploaded by User</h1>
                                    }
                                </TableCell>
                                <TableCell>{item?.createdAt.split("T")[0]}</TableCell>
                             
                                <TableCell className="float-right cursor-pointer">
                                    <Popover>
                                        <PopoverTrigger>
                                            <MoreHorizontal />
                                        </PopoverTrigger>
                                        <PopoverContent className="w-28 h-26 text-center">
                                            {
                                                status.map((status, index) => {
                                                    return (
                                                        <div onClick={()=>statusHandler(status, item?._id)} key={index} className='  items-center  my-2 cursor-pointer border border-gray-300 -m-2 p-1 rounded-md text-center bg-black text-white  transform transition-all duration-300 hover:scale-105'>
                                                            <span >{status}</span>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </PopoverContent>
                                    </Popover>

                                </TableCell>
                            </tr>
                        ))
                    }
                </TableBody>

            </Table>
            <div className=' flex justify-end my-8'>
            
                <Button variant="outline" className="animate-in" onClick={()=>navigate(`/admin/jobs`)}>Back to Job page</Button>
            </div>
        </div>
    )
}

export default ApplicantsTable