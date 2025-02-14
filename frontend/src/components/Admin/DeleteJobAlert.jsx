import React from 'react'
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '../ui/alert-dialog'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'


const DeleteJobAlert = ({job}) => {
    const navigate = useNavigate();

   
    return (
        <div>
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button className="bg-pink-900">Delete Job</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure to Delete ?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will Delete your Job and you have to create another Job In order to post the same.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                         <Button onClick={() => navigate(`/admin/job/remove/${job}`)} className="bg-[#720947]">Proceed</Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}

export default DeleteJobAlert