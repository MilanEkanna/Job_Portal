import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Badge } from './ui/badge'
import Navbar from './Shared/Navbar'
import { Button } from './ui/button'
import { Link } from 'react-router-dom'
import { ArrowBigLeftDash } from 'lucide-react'
import { useSelector } from 'react-redux'
import useGetAllAppliedJobs from '@/Hooks/useGetAllAppliedJobs'

const AppliedJobTable = () => {
  useGetAllAppliedJobs()
  const { allAppliedJobs } = useSelector(store => store.jobs)
  return (
    <div>
      <Navbar />
      <div className='max-w-6xl mx-auto bg-white  p-3 table-container mt-10'>
        <Link to="/profile"><Button className="mb-5 bg-pink-900"> <ArrowBigLeftDash /> Back to Profile page</Button></Link>
        <div >
          <Table>
            <TableCaption>A List of your Applied Jobs</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Job Role</TableHead>
                <TableHead>Company</TableHead>
                <TableHead className="text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {
                allAppliedJobs?.length <= 0 ? <span className='text-red-600'>*You haven't applied any job yet</span> :

                  allAppliedJobs.map((appliedJob) => (
                    <TableRow key={appliedJob?._id}>
                      {
                        !(appliedJob?.job?.title) ? <>
                        <TableCell className="text-red-600">*Job deleted by the Recruiter</TableCell>
                        <TableCell className="text-red-600">*N/A</TableCell>
                        <TableCell className="text-red-600">*N/A</TableCell>
                        
                        <TableCell className="text-right"><Badge>N/A</Badge></TableCell>
                        </>
                          :
                          <>
                            <TableCell>{appliedJob?.createdAt.split("T")[0]}</TableCell>
                            <TableCell>{appliedJob?.job?.title}</TableCell>
                            <TableCell>{appliedJob?.job?.company?.name}</TableCell>
                            <TableCell className="text-right">
                              <Badge className={`${appliedJob?.status === "accepted" ? 'bg-green-700 text-white' : appliedJob.status === "rejected" ? 'bg-red-700 text-white' : 'bg-slate-400 text-black'}`}>
                                {
                                  appliedJob?.status?.toUpperCase() // capitalize the status 

                                }

                              </Badge>
                            </TableCell>
                          </>
                      }

                    </TableRow>
                  ))
              }
            </TableBody>
          </Table>
        </div>
      </div>
    </div>


  )
}

export default AppliedJobTable