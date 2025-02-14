import { log } from "console";
import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";

export const applyJob = async(req, res)=>{
    try{
        const userId = req.id;
       
        
        const jobId = req.params.id;
        if(!userId){
            return res.status(400).json({
                message: "Job id is required",
                success:false
            });
        }
// checking if the user is already applied for the job or not
        const existingApplication = await Application.findOne({applicant:userId, job:jobId });
        if(existingApplication){
            return res.status(400).json({
                message: "You have already applied for this job",
                success:false
            })
        }
        // checking if the job exists
        const job = await Job.findById(jobId);
        if(!job){
            return res.status(404).json({
                message: "Job not found",
                success:false
            })
        }

        //creating a new application
const newApplication =   await Application.create({
            job:jobId,
            applicant:userId
        })

        job.applications.push(newApplication._id)
        await job.save()
        return res.status(201).json({
            message:"Job applied successfully",
            success:true
        })

    }catch(error){
        return res.status(500).json({
            message: "Error applying job",
            error: error.message
        })
    }
};

export const getAppliedJobs = async(req, res)=>{
    try{
        const userId = req.id;
        const application = await Application.find({applicant:userId}).populate({
            path:"job",
            options:{sort:{createdAt:-1}},
            populate:{
                path:"company",
                options:{sort:{createdAt:-1}}
            }
        });
        if(!application){
            return res.status(404).json({
                message: "No Application",
            })
        };
        return res.status(200).json({
            message: "Application found",
            application,
            success:true
        })
    }catch(error){
        return res.status(500).json({
            message: "Error fetching applied jobs",
            error: error.message
        })
    }
}

// This is for admin to get how many applicants applied for a particular job 
export const getApplicants = async(req, res)=>{
    try{
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path:"applications",
            options:{sort:{createdAt:-1}},
            populate:{
                path:"applicant",
                options:{sort:{createdAt:-1}}
            }

        })
        if(!job){
            return res.status(404).json({
                message: "Job not found",
                success:false
            })
        }
        return res.status(200).json({
            message: "Applicants found",
            job,
            success:true
        })
    }catch( error ){
        return res.status(500).json({
            message: "Error fetching applicants",
            error: error.message
        })
    }
}

//controller for update status thet the applicant is rejected or selected

export const updateStatus = async (req, res) => {
    try {
        const {status} = req.body;
        const applicationId = req.params.id;
        if(!status){
            return res.status(400).json({
                message: "Please select a status",
                success: false
            })
        }
        //Finding the application by the applicant id
        const application = await Application.findOne({_id:applicationId});
        if(!application){
            return res.status(404).json({
                message: "Application not found",
                success: false
            })
        }
        //Updating the status of the application
        application.status = status.toLowerCase();
        await application.save();
        return res.status(200).json({
            message: "Status updated successfully",
            application,
            success: true
        })

    }catch(error){
        return res.status(500).json({
            message: "Error updating status",
            error: error.message
        })
    }
}










