import React, { useEffect, useState } from 'react'
import Navbar from '../Shared/Navbar'
import { Button } from '../ui/button'
import { ArrowLeft, Loader2 } from 'lucide-react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { COMPANY_API_ENDPOINT } from '@/constants/constant'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import axios from 'axios'
import { useSelector } from 'react-redux'
import useGetCompanyById from '@/Hooks/useGetCompanyById'

const CompanySetup = () => {
  const params = useParams()
  
  useGetCompanyById(params.id);
  const [input, setInput] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    file: null
  });
  const { singleCompany } = useSelector(store => store.company)

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false)

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }
  const changeFileHandler = (e) => {
    const file = e.target.files?.[0]
    setInput({ ...input, file })
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", input.name)
    formData.append("description", input.description)
    formData.append("website", input.website)
    formData.append("location", input.location)

    if (input.file) {
      formData.append('file', input.file)
    }

    //Calling out the API 
    try {
      setLoading(true)
      const response = await axios.put(`${COMPANY_API_ENDPOINT}/update/${params.id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true
      });
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/admin/companies")

      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message)

    } finally {
      setLoading(false)
    }

  }

  useEffect(() => {
    setInput({
      name: singleCompany?.name || "",
      description: singleCompany?.description || "",
      website: singleCompany?.website || "",
      location: singleCompany?.location || "",
      file: null
    })
  }, [singleCompany?._id])

  return (
    <div>
      <Navbar />
      <div className='p-5'>
        <h1 className='text-4xl font-bold text-center '>Welcome to the <span className='text-pink-900'>company setup page</span> </h1>
      </div>

      <div className='max-w-xl mx-auto '>
        <form onSubmit={submitHandler}>
          <div className='flex justify-between p-10 '>

            <h1 className='font-bold text-3xl '>Setup Your company here </h1>
            <Link to="/admin/companies"> <Button className="flex items-center font-semibold bg-pink-900 animate-bounce">
              <ArrowLeft />
              <span>Back</span>
            </Button></Link>
          </div>
          <div className='grid grid-cols-2 gap-4 '>
            <div>
              <Label className="text-base"> Company Name</Label>
              <Input
                className="mt-2"
                type="text"
                name="name"
                required={true}
                value={input.name}
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <Label className="text-base"> Company Description</Label>
              <Input
                className="mt-2"
                type="text"
                name="description"
                value={input.description}
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <Label className="text-base"> Company Website</Label>
              <Input
                className="mt-2"
                type="text"
                name="website"
                value={input.website}
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <Label className="text-base"> Company Location</Label>
              <Input
                className="mt-2 "
                type="text"
                name="location"

                value={input.location}
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <Label className="text-base"> Company Logo</Label>
              <Input
                className="mt-2 text-center"
                type="file"
                accept="image/*"

                onChange={changeFileHandler}
              />
            </div>
          </div>
          {
            loading ? <div className=''>
              <Button className="w-full my-2 mt-8 bg-pink-900"><Loader2 className='mr-2 h-4 w-4 animate-spin' />Please wait</Button>
            </div>
              :
              <div className=''>
                <Button type="submit" className="w-full my-2 bg-pink-900 mt-8" >Update Company</Button>
              </div>
          }
        </form>
      </div>


    </div>
  )
}

export default CompanySetup





