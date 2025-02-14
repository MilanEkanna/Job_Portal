

import React from 'react'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { useState } from 'react'
import { Button } from './ui/button'
import { Loader2 } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { toast } from 'sonner'
import { USER_API_ENDPOINT } from '@/constants/constant'
import { setUser } from '@/redux/authSlice'



const UpdateProfileDialog = ({ open, setOpen }) => {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const { user } = useSelector(store => store.auth)
    const [input, setInput] = useState({
        fullname: user?.fullname,
        email: user?.email,
        phoneNumber: user?.phoneNumber,
        bio: user?.profile?.bio,
        skills: user?.profile?.skills?.map(skill => skill),
        file: user?.profile?.resume || null,
        resumeOriginalName: user?.profile?.resumeOriginalName || null
    });

    const fileChangeHandler = (e) => {
        const file = e.target.files?.[0];
        setInput({ ...input, file, resumeOriginalName: file.name })
    }

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }

    const submithandler = async (e) => {
        e.preventDefault()

        const formData = new FormData();
        formData.append('fullname', input.fullname)
        formData.append('email', input.email)
        formData.append('phoneNumber', input.phoneNumber)
        formData.append('bio', input.bio)
        formData.append('skills', input.skills)
        if (input.file) {
            formData.append('file', input.file)
        }
        try {
            setLoading(true)
            const res = await axios.post(`${USER_API_ENDPOINT}/profile/update`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                withCredentials: true
            })
            if (res.data.success) {
                dispatch(setUser(res.data.user))
                toast.success(res.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
        }
        finally{
            
            setOpen(false)
            setLoading(false)
        }
    }

    return (
        <div>
            <Dialog open={open}>
                <DialogContent className="sm:max-[425px]" onInteractOutside={() => { setOpen(false) }}>
                    <DialogHeader>
                        <DialogTitle>
                            Update Profile
                        </DialogTitle>
                    </DialogHeader>
                    <form onSubmit={submithandler}>
                        <div className='grid gap-4 py-4'>
                            <div className='grid grid-cols-4 items-center gap-4'>

                                <Label htmlFor="name" className="text-center">Name</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    className="col-span-3"
                                    value={input.fullname}
                                    onChange={changeEventHandler}
                                    name="fullname"
                                />
                            </div>
                            <div className='grid grid-cols-4 items-center gap-4'>

                                <Label htmlFor="email" className="text-center">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={input.email}
                                    onChange={changeEventHandler}
                                    className="col-span-3"
                                    name="email"
                                />
                            </div>
                            <div className='grid grid-cols-4 items-center gap-4'>

                                <Label htmlFor="number" className="text-center">Phone </Label>
                                <Input
                                    id="number"
                                    type="tel"
                                    value={input.phoneNumber}
                                    onChange={changeEventHandler}
                                    className="col-span-3"
                                    name="phoneNumber"
                                />
                            </div>
                            <div className='grid grid-cols-4 items-center gap-4'>

                                <Label htmlFor="bio" className="text-center">Bio</Label>
                                <Input
                                    id="bio"

                                    value={input.bio}
                                    onChange={changeEventHandler}
                                    className="col-span-3"
                                    name="bio"
                                />
                            </div>
                            <div className='grid grid-cols-4 items-center gap-4'>

                                <Label htmlFor="skills" className="text-center">Skills</Label>
                                <Input
                                    id="skills"
                                    className="col-span-3"
                                    value={input.skills}
                                    onChange={changeEventHandler}
                                    name="skills"
                                />
                            </div>

                            <div className='grid grid-cols-4 items-center gap-4'>

                                <Label htmlFor="file" className="text-center">Resume</Label>
                                <Input
                                    id="file"
                                    className="col-span-3"
                                    // value={input.file}
                                    required="true"
                                    type="file"
                                    onChange={fileChangeHandler}
                                    accept="application/pdf"
                                />
                                {/* {input.resumeName && <p className="text-sm text-gray-500">{input.resumeName}</p>} */}
                            </div>
                            {/* <BackpackIcon onInteractWith={()=>{setOpen(false)}}>Back</BackpackIcon> */}
                        </div>
                        <DialogFooter>
                            {
                                loading ? <Button className="w-full my-2"><Loader2 className='mr-2 h-4 w-4 animate-spin' />Please wait</Button> : <Button type="submit" className="w-full my-2 bg-pink-900" >Update Profile</Button>
                            }
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default UpdateProfileDialog
