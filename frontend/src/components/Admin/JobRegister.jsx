import React, { useState } from 'react'
import Navbar from '../Shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Loader2 } from 'lucide-react'
import { useSelector } from 'react-redux'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '../ui/select'
import { toast } from 'sonner'
import axios from 'axios'
import { JOB_API_ENDPOINT } from '@/constants/constant'
import { useNavigate } from 'react-router-dom'

const companyArray = []

const JobRegister = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()
    const [input, setInput] = React.useState({
        title: "",
        description: "",
        requirements: [],
        salary: 0,
        location: "",
        jobType: "",
        experience: "",
        position: 0,
        companyId: ""
    });
    const { allCompanies } = useSelector(store => store.company)
    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }
    const handleSelectChange = (value) => {
       const selectedCompany = allCompanies.find((company) => company.name.toLowerCase() === value)
       setInput({ ...input, companyId: selectedCompany?._id })
    }
    const submitHandler = async (e) => {
        e.preventDefault();
        try{
            setLoading(true)
            const response = await axios.post(`${JOB_API_ENDPOINT}/post`, input,{
                headers: {
                    'Content-Type': 'application/json',
                    
                },
                withCredentials:true
            })
            if (response.data.success) {
                toast.success(response.data.message)
                navigate("/admin/jobs")
            }

        }catch(error){
            console.log(error)
            toast.error(error.response.data.message)
        }finally{
            setLoading(false)
        }
        
    }

    return (
        <div>
            <Navbar />

            <div className='flex items-center justify-center w-screen  my-2'>

                <form onSubmit={submitHandler} className='p-8 max-w-4xl border border-gray-200 rounded-md shadow-xl'>

                    <div className='grid grid-cols-2 gap-2'>
                        <div>

                            <Label>Title</Label>
                            <Input
                                type="text"
                                name="title"
                                value={input.title}
                                required="true"
                                placeholder="Eg: MERN Developer"
                                onChange={changeEventHandler}
                                className="my-1"
                            />
                        </div>
                        <div>

                            <Label>Description</Label>
                            <Input
                                type="text"
                                name="description"
                                required="true"
                                placeholder="Enter the description..."
                                value={input.description}
                                onChange={changeEventHandler}
                                className="my-1"
                            />
                        </div>
                        <div>

                            <Label>Requirements</Label>
                            <Input
                                type="text"
                                name="requirements"
                                required="true"
                                placeholder="Eg: Redux, Zustand, Node"
                                value={input.requirements}
                                onChange={changeEventHandler}
                                className="my-1"
                            />
                        </div>
                        <div>

                            <Label>Salary in LPA</Label>
                            <Input
                                type="number"
                                name="salary"
                                required="true"
                                value={input.salary}
                                onChange={changeEventHandler}
                                className="my-1"
                            />
                        </div>

                        <div>

                            <Label>Location</Label>
                            <Input
                                type="text"
                                name="location"
                                required="true"
                                placeholder="Eg: Noida, Banglore"
                                value={input.location}

                                onChange={changeEventHandler}
                                className="my-1"
                            />
                        </div>
                        <div>

                            <Label>JobType</Label>
                            <Input
                                type="text"
                                name="jobType"
                                required="true"
                                value={input.jobType}
                                onChange={changeEventHandler}
                                className="my-1"
                            />
                        </div>
                        <div>

                            <Label>Experience in Years</Label>
                            <Input
                                type="number"
                                name="experience"
                                required="true"
                                value={input.experience}
                                onChange={changeEventHandler}
                                className="my-1"
                            />
                        </div>
                        <div>

                            <Label>Vacancies</Label>
                            <Input
                                type="number"
                                name="position"
                                value={input.position}
                                onChange={changeEventHandler}
                                className="my-1"
                            />
                        </div>
                        {
                            allCompanies?.length >= 0 && (
                                <Select onValueChange={handleSelectChange}>
                                <SelectTrigger className="w-[180px]">
                                  <SelectValue placeholder="Select a Company" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectGroup>
                                  <SelectLabel>Companies...</SelectLabel>
                                   {
                                    allCompanies.map((company)=>{
                                        return(

                                            <SelectItem value={company.name.toLowerCase()} >{company.name}</SelectItem>
                                        )
                                    })
                                   }
                                    
                                  </SelectGroup>
                                </SelectContent>
                              </Select>
                            )
                        }
                    </div>
                    {
                        loading ? <Button className="w-full mt-4"><Loader2 className='mr-2 h-4 w-4 animate-spin' />Please wait</Button> : <Button type="submit" className="w-full mt-4 bg-pink-900" > Post New Jobs</Button>
                    }
                    {
                        allCompanies.length === 0 && <p className="text-xs text-red-600 font-bold text-center my-3">* Please register the company first * </p>
                    }
                </form>
            </div>
        </div>
    )
}

export default JobRegister



