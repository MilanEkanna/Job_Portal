import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phoneNumber: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        enum: ["student", "recruiter"], // Values should be in array of string
        default: "student"
    },
    profile: {
        bio: { type: String },
        skills: [{ type: String }],
        resume: { type: String , },// Storing link to resume file
        resumeOriginalName: { type: String, },
        company: { type: mongoose.Schema.Types.ObjectId, ref: 'company' },  // Building an relation between user table and company table
        profilePhoto: {
            type: String,
            default: ""
        }

    }
}, { timestamps: true })
export const User = mongoose.model("User", userSchema);