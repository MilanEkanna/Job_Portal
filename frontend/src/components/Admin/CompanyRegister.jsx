import React, { useState } from 'react'
import Navbar from '../Shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import axios from 'axios'
import { COMPANY_API_ENDPOINT } from '@/constants/constant'
import { useDispatch, useSelector } from 'react-redux'
import { setSingleCompany } from '@/redux/companySlice'

const CompanyRegister = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {user} = useSelector(store=>store.auth)

    const [companyName, setCompanyName] = useState();
    const registerCompany = async () => {
        try {
            const response = await axios.post(`${COMPANY_API_ENDPOINT}/register`,

                { companyName} ,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true

                }
            )
            console.log(response.data.message);
            console.log(companyName);


            if (response?.data?.success) {
                toast.success(response?.data?.message)
                dispatch(setSingleCompany(response?.data?.company))
                const companyId = response?.data?.company?._id;

                navigate(`/admin/company/${companyId}`)
            }
        } catch (error) {
            toast.error(error.response.data.message)
            console.log(error);

        }
    }
    return (
        <div>
            <Navbar />
            <div className='max-w-4xl mx-auto border border-gray-200 p-6 rounded-lg mt-6 shadow-lg'>
                <div className='my-4'>
                    <h1 className='font-bold text-2xl'>Welcome {user.fullname} enter your company Name here...</h1>
                    <p className='text-muted-foreground '>What would you like to give your company name ? You can change it later !</p>

                </div>

                <Label className='text-lg'>Company Name</Label>
                <Input type="text" className="my-2" placeholder=' GOOGLE, AMAZON, ETC' onChange={(e) => setCompanyName(e.target.value)} />
                <div className='flex items-center gap-2 my-10 '>
                    <Button variant="outline" onClick={() => navigate("/admin/companies")}>Cancel</Button>
                    <Button onClick={registerCompany}>Continue</Button>
                </div>
            </div>
        </div>
    )
}

export default CompanyRegister



