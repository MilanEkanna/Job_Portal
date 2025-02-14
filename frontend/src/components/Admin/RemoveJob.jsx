import React from 'react'
import Navbar from '../Shared/Navbar'
import { Button } from '../ui/button'
import axios from 'axios';
import { JOB_API_ENDPOINT } from '@/constants/constant';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';

const RemoveJob = () => {
    const navigate = useNavigate()

    const params = useParams()
    const jobId = params.id;
    const removeJobHandler = async () => {
        try {
            const response = await axios.delete(`${JOB_API_ENDPOINT}/remove/${jobId}`, { withCredentials: true });
            toast(response.data.message)
            // Navigate to the jobs list after successful deletion of the job
            navigate('/admin/jobs');
        } catch (error) {
            
            console.error("Error deleting job:", error);
            toast(error.response?.data?.message || "An error occurred while deleting the job.");
        }
    };


    return (
        <div className="min-h-screen bg-gradient-to-r from-amber-600 via-orange-400 to-amber-800 flex flex-col">
          <Navbar />
          <div className="flex-grow flex items-center justify-center shadow-2xl shadow-black">
            <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full transform transition-all duration-300 hover:scale-105">
              <h1 className="text-3xl font-bold text-center text-red-600 mb-4 animate-pulse ">
                Remove Job Permanently
              </h1>
              <p className="text-gray-700 text-center mb-6">
                Are you sure you want to delete this job? This action cannot be undone.
              </p>
              <div className="flex justify-center">
                <Button
                  onClick={removeJobHandler}
                  className="bg-red-600 text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition duration-200 ease-in-out transform hover:scale-105 shadow-md hover:shadow-lg"
                >
                  Delete Job
                </Button>
              </div>
            </div>
          </div>
        </div>
      );
  };

export default RemoveJob  








