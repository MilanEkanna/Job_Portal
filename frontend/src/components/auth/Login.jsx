import React, { useState } from 'react'
import Navbar from '../Shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup } from '../ui/radio-group'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import { Loader2, LogIn } from 'lucide-react'
import { toast } from 'sonner'
import axios from 'axios'
import { USER_API_ENDPOINT } from '@/constants/constant'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading, setUser } from '@/redux/authSlice'
import store from '@/redux/store'






const Login = () => {
  
  const [input, setInput] = useState({
    
    email: "",
    
    password: "",
    role: ""
  });
  
  const dispatch = useDispatch()
  const { loading } = useSelector(store => store.auth)

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  }
  const navigate = useNavigate()

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      dispatch(setLoading(true))
      const response = await axios.post(`${USER_API_ENDPOINT}/login`, input, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true
      });
      if (response.data.success) {
        toast.success(response.data.message);
        dispatch(setUser(response.data.user))   //Here we are dispatching means sending the user data to the reducer
        navigate('/')
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message)

    } finally {
      dispatch(setLoading(false))
    }

  }
  return (
    <div >
      <Navbar />
      <div className='flex items-center justify-center max-w-7xl mx-auto'>
        <form onSubmit={submitHandler} className='w-1/2 border border-gray-200 rounded-md p-4 my-6 shadow-xl'>

          <div className='flex'>

            <LogIn className='my-1 ' /> <h1 className='font-bold text-xl mb-5 mx-2 '>Already have an account? Login here </h1>
          </div>


          <div className='my-2'>
            <Label>Enter Your E-mail</Label>
            <Input type="email" value={input.email} name="email" onChange={changeEventHandler} placeholder="Enter Your Email" required="true" />

          </div>

          <div className='my-3'>
            <Label>Enter Your Password</Label>
            <Input type="password" value={input.password} name="password" onChange={changeEventHandler} placeholder="Enter Your Password" required="true" />

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


          </div>
          {
            loading ? <Button className="w-full my-2"><Loader2 className='mr-2 h-4 w-4 animate-spin' />Please wait</Button> : <Button type="submit" className="w-full my-2 bg-pink-900" >Login</Button>
          }

          <span className='text-sm'>Don't have an account? <Link to="/signup" className='text-blue-700'>signup</Link></span>
        </form>
      </div>

    </div>
  )
}

export default Login