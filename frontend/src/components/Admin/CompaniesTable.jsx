


import React, { useEffect } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Button } from '../ui/button'
import { useSelector } from 'react-redux'
import { formatTime } from '../TimeFormat'
import { useNavigate } from 'react-router-dom'

const CompaniesTable = () => {
  const navigate = useNavigate();
  const { allCompanies, searchCompanyByText } = useSelector(store => store.company)
  const [filterCompany, setFilterCompany] = React.useState(allCompanies)
  useEffect(()=>{
    const filteredCompany = allCompanies.length >= 0 && allCompanies.filter((company)=>{
      if(!searchCompanyByText){
        return true;
      }
      return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase())
    });
    setFilterCompany(filteredCompany)
  },[allCompanies, searchCompanyByText])

  if (!filterCompany || filterCompany.length <= 0) {
    return (
      <div className='mt-10'>
        <Table>
          <TableCaption>A List of your Recent Registered Companies</TableCaption>
          <TableBody>
            <TableRow>
              <TableCell className="text-2xl font-bold" >Companies Not found</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    )
  }

  return (
    <div className='mt-10'>

      <Table>
        <TableCaption>A List of your Recent Registered Companies</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-lg font-bold">Logo</TableHead>
            <TableHead className="text-lg font-bold">Name</TableHead>
            <TableHead className="text-lg font-bold">Date</TableHead>
            <TableHead className="text-lg font-bold">Website</TableHead>
            <TableHead className="text-right text-lg font-bold">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filterCompany.map((company) => (

            <TableRow key={company._id}>
              <TableCell>
                <Avatar>
                  <AvatarImage src={company.logo} />
                  <AvatarFallback>No image</AvatarFallback>
                </Avatar>
              </TableCell>
              <TableCell className="text-base ">{company.name}</TableCell>
              <TableCell className="text-base ">{formatTime(company?.createdAt)}</TableCell>
              <TableCell className="text-base text-blue-600 underline"><a href={company?.website}>{company.name}</a></TableCell>
              <TableCell className="text-right cursor-pointer">
                <Button onClick={()=>navigate(`/admin/company/${company._id}`)} className="bg-[#720947]">Edit item</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
<div className=' flex justify-end my-8'>

    <Button variant="outline" className="animate-in" onClick={()=>navigate(`/admin/jobs`)}>Proceed to Jobs Section</Button>
</div>
    </div>
  )
}

export default CompaniesTable



