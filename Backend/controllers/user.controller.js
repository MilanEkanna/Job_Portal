import { User } from "../models/user.model.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import getDataUri from "../UTILS/datauri.js";
import cloudinary from "../UTILS/cloudinary.js";

export const register = async (req, res) => {
    try {
        const { fullname, email, password, phoneNumber, role } = req.body;
        
        
        if (!fullname || !email || !password || !phoneNumber || !role) {
            return res.status(400).json(
                {
                    message: "Please fill in all fields.",
                    success: false
                }
            );
        };

        const file = req.file
      
    //    Here comes the cloudinary logic
       const fileUri = getDataUri(file);

       const cloudResponse = await cloudinary.uploader.upload(fileUri.content)
      


        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json(
                {
                    message: "User already exist with this email.",
                    success: false
                }
            );
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({
            fullname,
            email,
            password: hashedPassword,
            phoneNumber,
            role,
            profile:{
                profilePhoto: cloudResponse.secure_url,
            }

        });
        return res.status(201).json({
            message: "User Signup successfully 😎",
            success: true
        })


    } catch (error) {

    }
}
// This is our login controller
export const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;
        if (!email || !password || !role) {
            return res.status(400).json({
                message: "Please fill in all fields.",
                success: false
            })
        };
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "Incorrect email or password 🤷‍♀️",
                success: false
            })
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                message: "Incorrect email or password 🤦‍♀️",
                success: false
            })
        }
        //Checking the role is correct or not
        if (user.role !== role) {
            return res.status(400).json({
                message: "Incorrect role, Account does not exist with current role 🤦‍♂️",
                success: false
            })
        }

        // If the user is found and the password is correct, we generate a JWT token

        const tokenData = {
            userId: user._id,
        }
        const token = jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' })

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }

        return res.status(200).cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpOnly: true, sameSite: 'strict', }).json({
            message: `Welcome back ${user.fullname} 😃`,
            user,
            success: true

        })


    } catch (error) {
        console.log(error);

    }
}

export const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            message: "Logged out successfully 🙌",
            success: true
        })
    } catch (error) {
        console.log(error);

    }
}

export const updateProfile = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, bio, skills } = req.body;
        // console.log(fullname, email, phoneNumber, bio, skills);
        
        const file = req.file //this is 
        
     
         
        // console.log(file);
    //    Here comes the cloudinary logic
       const fileUri = getDataUri(file);

       const cloudResponse = await cloudinary.uploader.upload(fileUri.content)



        let skillsArray;
        if (skills) {
            skillsArray = skills.split(",");
        }
        
        const userId = req.id; // comes from middleware Authenticated 

        let user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false
            })
        }
        // Updating the data
        if (fullname) user.fullname = fullname
        if (email) user.email = email
        if (phoneNumber) user.phoneNumber = phoneNumber
        if (bio) user.profile.bio = bio
        if (skills) user.profile.skills = skillsArray;


        //Resume part is here
       
        if(cloudResponse){
           if(file) {user.profile.resume = cloudResponse.secure_url }//Saving the cloudinary url
              user.profile.resumeOriginalName = file.originalname //Saving the original file name
        }

       

        await user.save();

        user = {
            _id: user.id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile,
            bio: user.profile.bio,
            

        }

        return res.status(200).json({
            message: "Profile updated successfully 😎",
            success: true,
            user
        })

    } catch (error) {
        console.log(error);

    }
}






