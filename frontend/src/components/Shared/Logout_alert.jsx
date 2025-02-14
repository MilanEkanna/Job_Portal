import React from 'react'
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '../ui/alert-dialog'
import { Button } from '../ui/button'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner'
import axios from 'axios'
import { USER_API_ENDPOINT } from '@/constants/constant'
import { setUser } from '@/redux/authSlice'
import { useNavigate } from 'react-router-dom'



const Logout_alert = () => {

    const logoutHandler = async()=>{
        try {
            const response = await axios.get(`${USER_API_ENDPOINT}/logout`,
                {
                    withCredentials:true
                }
            );
            if(response.data.success){
                dispatch(setUser(null));
                toast.success(response.data.message)
                navigate('/');
            }
        } catch (error) {
            console.log(error);
            
            toast.error(error.response.data.message)
        }
    }
    const {user} = useSelector(store=> store.auth)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    return (
        <div>
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button  variant="link">Logout</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure to Logout?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will Logout your session and you have to sign in again to browse jobs and to apply them.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <Button onClick={logoutHandler}>Logout</Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}

export default Logout_alert