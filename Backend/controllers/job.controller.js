import { Job } from "../models/job.model.js";


//For admin or recruiter
export const postJob = async (req, res) => {
    try {
        const { title, description, requirements, salary, location, jobType, experience, position, companyId } = req.body;
        const userId = req.id;

        if (!title || !description || !requirements || !salary || !location || !jobType || !experience || !position || !companyId) {
           
            
            return res.status(400).json({
                message: "Please fill all the fields",
                success: false
            });
        }

        const existingJob = await Job.findOne({ title, company: companyId });
        if (existingJob) {
            return res.status(400).json({
                message: "Failed to post the job, same job is already posted",
                success: false
            });
        }

        const job = await Job.create({
            title,
            description,
            requirements: requirements.split(","),
            salary: Number(salary),
            location,
            jobType,
            experienceLevel: experience,
            position,
            company: companyId,
            created_by: userId
        });

        return res.status(201).json({
            message: "New job is posted successfully",
            job,
            success: true,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// Finding all the jobs (For Student)
export const getAllJobs = async(req, res)=>{
    try {
        //req.query.keyword if this comes then well and good otherwise we can take the empty string 
        const keyword = req.query.keyword || ""   ;
        const query = {
            $or: [
                {title: {$regex: keyword, $options: "i"}}, // i means it become case sensitive 
                {description: {$regex: keyword, $options: "i"}}, // i means it become case sensitive
                //Here regex is used to search the keyword in the description and title, regex allows to search the keyword in the string regex is nothin g but the regular expression but we are
            ]
        };
        const jobs = await Job.find(query).populate({ path: "company"}).sort({createdAt: -1});
        //Populate takes an object with path and select and .sort is used to sort the data in descending order to the date of created at

        if(!jobs){
            return res.status(404).json({
                message:"Jobs not found",
                success: false
            })
        }
        return res.status(200).json({
            message:"Jobs found successfully",
            success:true,
            jobs
        })
        
    } catch (error) {
        return res.status(500).json({
            message: error.message

        })
    }
}

//Finding jobs by Id (For Student)
export const getJobById = async(req, res)=>{
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({ path: "company"}).sort({createdAt: -1});
        if(!job){
            return res.status(404).json({
                message: "Job not found",
                success: false
            })
        }
        return res.status(200).json({
            message: "Job found successfully",
            success: true,
            job
        })
    }catch(error){
        return res.status(500).json({ //500 means internal server error
            message:error.message
        })
    }
}

// Admin abhi tak jitne job post kra hai
export const getAdminJobs = async(req, res)=>{
    try {
         const adminId = req.id;
         const jobs = await Job.find({created_by:adminId}).populate({path:"company"}).sort({createdAt:-1})
         if(!jobs){
            return res.status(404).json({
                message:"Jobs not found",
                success: false
            })
         }
         return res.status(200).json({
            message:"Jobs found successfully",
            success:true,
            jobs
         })
    } catch (error) {
        return res.status(500).json({
            message:error.message
        })
    }
}


export const removeJobById = async (req, res) => {
    try {
        const jobId = req.params.id;
        const adminId = req.id; 

        // Check if the job exists and belongs to the admin
        const job = await Job.findOne({ _id: jobId, created_by: adminId });

        if (!job) {
            return res.status(404).json({
                message: "Job not found or you do not have permission to delete this job.",
                success: false
            });
        }

        
        await Job.deleteOne({ _id: jobId });

        return res.status(200).json({
            message: "Job deleted successfully",
            success: true
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            success: false
        });
    }
};



// import { Job } from "../models/job.model.js";

// // For admin or recruiter


// // Finding all the jobs (For Student)
// export const getAllJobs = async (req, res) => {
//     try {
//         const keyword = req.query.keyword || "";
//         const query = {
//             $or: [
//                 { title: { $regex: keyword, $options: "i" } },
//                 { description: { $regex: keyword, $options: "i" } },
//             ]
//         };

//         const jobs = await Job.find(query).populate({ path: "company" }).sort({ createdAt: -1 });

//         if (!jobs || jobs.length === 0) {
//             return res.status(404).json({
//                 message: "Jobs not found",
//                 success: false
//             });
//         }

//         return res.status(200).json({
//             message: "Jobs found successfully",
//             success: true,
//             jobs
//         });
//     } catch (error) {
//         return res.status(500).json({
//             message: error.message
//         });
//     }
// };

// // Finding jobs by Id (For Student)
// export const getJobById = async (req, res) => {
//     try {
//         const jobId = req.params.id;
//         const job = await Job.findById(jobId).populate({ path: "company" });

//         if (!job) {
//             return res.status(404).json({
//                 message: "Job not found",
//                 success: false
//             });
//         }

//         return res.status(200).json({
//             message: "Job found successfully",
//             success: true,
//             job
//         });
//     } catch (error) {
//         return res.status(500).json({
//             message: error.message
//         });
//     }
// };

// // Admin abhi tak jitne job post kra hai
// export const getAdminJobs = async (req, res) => {
//     try {
//         const adminId = req.id;
//         const jobs = await Job.find({ created_by: adminId }).populate({ path: "company" }).sort({ createdAt: -1 });

//         if (!jobs || jobs.length === 0) {
//             return res.status(404).json({
//                 message: "Jobs not found",
//                 success: false
//             });
//         }

//         return res.status(200).json({
//             message: "Jobs found successfully",
//             success: true,
//             jobs
//         });
//     } catch (error) {
//         return res.status(500).json({
//             message: error.message
//         });
//     }
// };

