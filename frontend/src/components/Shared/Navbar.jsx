import React, { useEffect } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { LogIn, LogOut, NotebookPen, User2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import Logout_alert from './Logout_alert'
import { useSelector } from 'react-redux'
// import store from '@/redux/store'



const Navbar = () => {

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }, []);




    // const user = false;
    const { user } = useSelector(store => store.auth)


    return (
        <div className='bg-slate-50 sticky top-0 z-50  bg-opacity-95'>
            <div className='flex items-center justify-between mx-auto max-w-7xl h-14 '>

                <div>

                    <h1 className='text-2xl font-bold ml-3'>Career<span className='text-[#720947]'>Connect</span> </h1>
                </div>
                <div className='flex items-center gap-12 justify-evenly'>

                    <ul className='flex font-medium items-center justify-center gap-8   '>
                        {
                            user && user.role === "recruiter" ? (
                                <>
                                    <Link to="/admin/companies" ><li className='text-black  text-lg '>Companies</li></Link>
                                    <Link to="/admin/jobs" ><li className='text-black  text-lg'>Jobs</li></Link>
                                </>
                            ) : (
                                <>
                                    <Link to="/" ><li className='text-black  text-lg '>Home</li></Link>
                                    <Link to="/about" ><li className='text-black  text-lg'>About</li></Link>
                                    <Link to="/jobs"><li className='text-black   text-lg'>Jobs</li></Link>
                                    <Link to="/browse"><li className='text-black  text-lg'>Browse</li></Link>
                                    <Link to="/contact"><li className='text-black  text-lg '>Contact Us</li></Link>
                                </>
                            )
                        }


                    </ul>
                    {
                        !user ? (
                            <div className='flex items-center gap-2 mr-5'>
                                <Link to="/login"><Button variant="outline" className="hover:transition-all duration-500 ease-in-out"><LogIn /> Login</Button></Link>
                                <Link to="/signup"><Button className="bg-[#720947] hover:bg-[#541238] transition-all duration-500 ease-in-out"><NotebookPen /> Signup</Button></Link>

                            </div>
                        ) : (
                            <div className='mr-5'>

                                <Popover className="w-2 ">
                                    <PopoverTrigger asChild>
                                        <Avatar className="cursor-pointer">
                                            <AvatarImage src={user?.profile?.profilePhoto} />
                                            <AvatarFallback>Image Profile</AvatarFallback>
                                        </Avatar>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-80">
                                        <div className="flex flex-col items-center space-y-2">
                                            <Avatar className="cursor-pointer ">
                                                <AvatarImage src={user?.profile?.profilePhoto} />
                                                <AvatarFallback>Image Profile</AvatarFallback>
                                            </Avatar>
                                            <h4 className='font-medium'>{user.fullname}</h4>
                                            <span className='font-medium text-left'> <p className='text-sm text-muted-foreground'> {user?.profile?.bio} </p></span>

                                        </div>

                                        <div className='flex flex-col text-gray-600 my-2'>
                                            {
                                                user && user.role === "recruiter" ? (
                                                    <>
                                                        <div className='flex w-fit items-center cursor-pointer ml-24'>
                                                            {/* This is the logout icon */}
                                                            <LogOut />
                                                            <Logout_alert />


                                                        </div>
                                                    </>
                                                ) : (
                                                    <>
                                                        <div className='flex w-fit items-center cursor-pointer my-2'>
                                                            <User2 />
                                                            <Link to="/profile"><Button variant="link" className="outline-none">View profile</Button></Link>

                                                        </div>
                                                        <div className='flex w-fit items-center cursor-pointer '>
                                                            {/* This is the logout icon */}
                                                            <LogOut />
                                                            <Logout_alert />


                                                        </div>
                                                    </>
                                                )
                                            }

                                        </div>
                                    </PopoverContent>
                                </Popover>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>

    )
}

export default Navbar








