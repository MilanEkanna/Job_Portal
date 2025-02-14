import React, { useState } from 'react'
import Navbar from '../Shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup } from '../ui/radio-group'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import { Loader2, NotebookPen } from 'lucide-react'
import axios from 'axios'
import { toast } from 'sonner'
import { USER_API_ENDPOINT } from '@/constants/constant'
import { useDispatch, useSelector } from 'react-redux'
// import store from '@/redux/store'
import { setLoading } from '@/redux/authSlice'

const Signup = () => {
  const [input, setInput] = useState({
      fullname:"",
      email: "",
      phoneNumber:"",
      password: "",
      role:"",
      file:""
    });

    const dispatch = useDispatch()
  const { loading } = useSelector(store => store.auth)
  
    const changeEventHandler = (e)=>{
      setInput({...input, [e.target.name]:e.target.value});
    }
    const navigate = useNavigate()
  
    const changeFileHandler = (e)=>{
      setInput({...input, file:e.target.files[0]}); // This means we are getting the first file from the file list
    }

    const submitHandler = async (e) =>{
      e.preventDefault();
      const formData = new FormData();
      formData.append('fullname', input.fullname);
      formData.append('email', input.email); 
      formData.append('phoneNumber', input.phoneNumber);
      formData.append('password', input.password);
      formData.append('role', input.role);
      if(input.file){

        formData.append('file', input.file);
      }
      try {
         dispatch(setLoading(true))
        const response = await axios.post("https://job-portal-by-milan.onrender.com/api/v1/user/register", formData,{
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          withCredentials:true
        });
        if(response.data.success){
          toast.success(response.data.message);
          navigate('/login')
        }
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.message)
        
      }finally {
            dispatch(setLoading(false))
          }
      
    }

  return (
    <div >
      <Navbar />
      <div className='flex items-center justify-center max-w-7xl mx-auto'>
        <form onSubmit={submitHandler} className='w-1/2 border border-gray-200 rounded-md p-4 my-5 shadow-xl'>
        <div className='flex'>
        <NotebookPen className='my-1 '/> <h1 className='font-bold text-xl mb-5 mx-2 '> Don't have an account ? Signup Here </h1>

        </div>
          <div className='my-2'>
            <Label>Enter Your Name</Label>
            <Input type="text" value={input.fullname} name="fullname" onChange={changeEventHandler} placeholder="Enter Your Name" required="true" />
          
          </div>
          <div className='my-2'>
            <Label>Enter Your E-mail</Label>
            <Input type="email" value={input.email} name="email" onChange={changeEventHandler} placeholder="Enter Your Email" required="true" />

          </div>
          <div className='my-2'>
            <Label>Enter Your Phone Number</Label>
            <Input type="tel" value={input.phoneNumber} name="phoneNumber" onChange={changeEventHandler} placeholder="+91" required="true" />

          </div>
          <div className='my-2'>
            <Label>Enter Your Password</Label>
            <Input type="password" value={input.password} name="password" onChange={changeEventHandler}  placeholder="Enter Your Password" required="true" />

          </div>

          <div className='flex items-center gap-28'>
            <RadioGroup className="flex items-center gap-4 m-5 mx-px">
              <div className="flex items-center space-x-2 ">
                <Input
                  type="radio"
                  name="role"
                  value="student"
                  checked={input.role === "student"}
                  onChange={changeEventHandler}
                  className="cursor-pointer items-center"
                />
                <Label htmlFor="option-one">Student</Label>
              </div>



              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="recruiter"
                  checked={input.role === "recruiter"}
                  onChange={changeEventHandler}
                 
                  className="cursor-pointer"
                />
                <Label htmlFor="option-two">Recruiter</Label>
              </div>
            </RadioGroup>

            <div className='flex items-center gap-2 '>
              <Label>Profile</Label>
              <div className="flex items-center my">

              <Input
                accept="image/*"
                type="file"
                onChange={changeFileHandler}
                
                
                className="cursor-pointer py-1.5"
              />
              </div>
            </div>
          </div>
          {
            loading ? <Button className="w-full my-2"><Loader2 className='mr-2 h-4 w-4 animate-spin' />Please wait</Button> : <Button type="submit" className="w-full my-2 bg-pink-900" >Signup</Button>
          }
          <span className='text-sm'>Already have an account? <Link to="/login" className='text-blue-700'>Login</Link></span>
        </form>
      </div>

    </div>
  )
}

export default Signup