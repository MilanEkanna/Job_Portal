import { Company } from "../models/company.model.js";
import cloudinary from "../UTILS/cloudinary.js";
import getDataUri from "../UTILS/datauri.js";

export const registerCompany = async (req, res) => {
    try {
        const { companyName } = req.body;
       
        
        if (!companyName) {
            return res.status(400).json({
                message: "Company name is required",
                status: false
            });
        }

        // Check if the user already has two companies with the same name
        const userCompanies = await Company.find({ userId: req.id, name: companyName });
        
        if (userCompanies.length >= 2) {
            return res.status(400).json({
                message: "You can only register up to two companies with the same name",
                status: false
            });
        }

        // Check if the company name already exists in the database
        const existingCompany = await Company.findOne({ userId: req.id, name: companyName });
        
        if (existingCompany) {
            return res.status(400).json({
                message: "Company name already exists",
                status: false
            });
        }

        // Create the new company
        const company = await Company.create({
            name: companyName,
            userId: req.id
        });
        
        res.status(201).json({
            message: "Company registered successfully",
            company, // return the company that we created
            success: true
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "An error occurred while registering the company",
            status: false
        });
    }
}

export const getCompany = async (req, res) => {
    try {
        const userId = req.id; // jO BHI USER LOGGED IN HOGA USKI USER ID HAI YEH

        // Here we are using the userId to get the companies details, as we want the details of only those companies which are created by the logged in user
      
        const companies = await Company.find({userId});
        if (!companies) {
            return res.status(404).json({
                message: "Companies not found",
                status: false
            })
        }
        return res.status(200).json({
            message: "Companies found successfully",
            success:true,
            companies
        })
    }

    catch(error){
        console.log(error);
    }
}

// Get company by id controller

export const getCompanyById = async (req, res) => {
    try{
        const companyId = req.params.id; // here we are getting the company id from the url parameters
        const company = await Company.findById(companyId);
        if(!company){
            return res.status(404).json({
                message: "Company not found",
                status: false
            })
        }
        return res.status(200).json({

            company,
            success:true
        })

    }
    catch(error){
        console.log(error);
    }
}

//company updated controller
export const updateCompany = async (req, res) => {
    try {
        const {name, description, website, location} = req.body;
        const file = req.file
        
        const fileUri = getDataUri(file);

       const cloudResponse = await cloudinary.uploader.upload(fileUri.content)
        const logo = cloudResponse.secure_url;

        const updateData = {name, description, website, location, logo}

        const company = await Company.findByIdAndUpdate(req.params.id, updateData, {new: true})
        if (!company) {
            return res.status(404).json({
                message: "Company not found",
                status: false
            })
        }
        return res.status(200).json({
            message:"Company updated successfully",
            success:true,
            company
        })

    }catch(error){
        console.log(error);
    }
}








