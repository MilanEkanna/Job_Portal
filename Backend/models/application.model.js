import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({ //applicant k liye hai yeh jo job apply karaga
    job:{
        type:mongoose.Schema.ObjectId,
        ref:"Job",
        required:true
    },
    applicant:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true
    },
    status:{
        type: String,
        enum:["pending", "accepted", "rejected"], // Values should be in array of string
        default:"pending"
    }
}, { timestamps:true}); //timestamp true karna hai ki jo bhi document create hoga uska timestamp automatically create ho jaye

export const Application = mongoose.model("Application", applicationSchema); //model create karna hai 




// import mongoose from "mongoose";

// const applicationSchema = new mongoose.Schema({
//     job: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "Job",
//         required: true
//     },
//     applicant: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "User",
//         required: true
//     },
//     status: {
//         type: String,
//         enum: ["pending", "accepted", "rejected"],
//         default: "pending"
//     }
// }, { timestamps: true });

// export const Application = mongoose.model("Application", applicationSchema);