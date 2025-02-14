
import React, { useEffect } from 'react'
import Navbar from '../Shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'

import { useNavigate } from 'react-router-dom'

import { useDispatch } from 'react-redux'

import AdminJobsTable from './AdminJobsTable'
import useGetAllAdminJobs from '@/Hooks/useGetAllAdminJobs'
import { setSearchJobByText } from '@/redux/jobSlice'


const AdminPostingJobs = () => {
    useGetAllAdminJobs()

    const [input, setInput] = React.useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setSearchJobByText(input))
    }, [input])
    return (
        <div>
            <Navbar />
            <h1 className='text-2xl font-bold text-center pt-2'>A list of Jobs you have Created</h1>
            <div className=' max-w-6xl mx-auto my-10'>
                <div className='flex items-center justify-between'>

                    <Input
                        className="w-fit"
                        placeholder="Filter by name, role"
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <Button onClick={() => navigate("/admin/jobs/create")} className="bg-[#720947] animate-bounce">Post New Job</Button>
                </div>
                <AdminJobsTable />
            </div>
        </div>
    )
}

export default AdminPostingJobs