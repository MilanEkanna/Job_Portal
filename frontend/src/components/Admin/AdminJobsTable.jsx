



import React, { useEffect } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'

import { Button } from '../ui/button'
import { useSelector } from 'react-redux'
import { formatTime } from '../TimeFormat'
import { useNavigate } from 'react-router-dom'
import { Eye } from 'lucide-react'
import DeleteJobAlert from './DeleteJobAlert'

const AdminJobsTable = () => {
  const navigate = useNavigate();


  const { allAdminJobs, searchJobByText } = useSelector(store => store.jobs)
  const [filterJobs, setFilterJobs] = React.useState(allAdminJobs)
  useEffect(() => {
    const filteredJobs = allAdminJobs.length >= 0 && allAdminJobs.filter((job) => {
      if (!searchJobByText) {
        return true;
      }
      return job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) || job?.company?.name?.toLowerCase().includes(searchJobByText.toLowerCase());
    });
    setFilterJobs(filteredJobs)
  }, [allAdminJobs, searchJobByText])

  if (!filterJobs || filterJobs.length <= 0) {
    return (
      <div className='mt-10'>
        <Table>
          <TableCaption>A List of your Posted Jobs</TableCaption>
          <TableBody>
            <TableRow>
              <TableCell className="text-2xl font-bold" >Jobs Not found</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    )
  }

  return (
    <div className='mt-10'>

      <Table>
        <TableCaption>A List of your Recent Posted Jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-lg font-bold">Company Name</TableHead>
            <TableHead className="text-lg font-bold ">Role</TableHead>
            <TableHead className="text-lg font-bold gap-2">Salary</TableHead>
            <TableHead className="text-lg font-bold">Posted</TableHead>
            <TableHead className="text-right text-lg font-bold">See Applications</TableHead>
            <TableHead className=" text-right text-lg font-bold ">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filterJobs.map((job) => (

            <TableRow key={job?._id}>

              <TableCell className="text-base ">{job?.company?.name}</TableCell>
              <TableCell className="text-base ">{job?.title}</TableCell>
              <TableCell className="text-base ">{job?.salary} LPA</TableCell>
              <TableCell className="text-base ">{formatTime(job?.createdAt)}</TableCell>
              <TableCell className="text-right cursor-pointer">
                <Button variant="outline"  onClick={() => navigate(`/admin/job/${job?._id}/applicants`)} ><Eye /> Applicants</Button>
              </TableCell>
              <TableCell className="text-right cursor-pointer">
               <DeleteJobAlert job={job?._id} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default AdminJobsTable



