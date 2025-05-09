
import {z} from "zod";
import bcrypt from "bcryptjs";
import config from "../config.js";
import jwt from "jsonwebtoken";
import { Admin } from "../models/admin.model.js";
export const signup = async(req,res)=>{
    const{firstname,lastname,email,password}=req.body;
    const adminSchema=z.object({
        firstname: z.string().min(3,{message:"first name must be atleast 3 char long"}),
        lastname: z.string().min(3,{message:"last name must be atleast 3 char long"}),
        email: z.string().email({message:"please provide a valid email"}),
        password: z.string().min(6,{message:"first name must be atleast 6 char long"}),
    })
    const validatedData=adminSchema.safeParse(req.body);
    if(!validatedData.success){
        return res.status(400).json({errors:validatedData.error.issues.map(err=>err.message)});
    }
    const hashedpassword =await bcrypt.hash(password,10)
    try{
        const existingadmin=await Admin.findOne({email:email});
        if(existingadmin){
            return res.status(400).json({error:"admin already exists"});
        }
        const newAdmin= new Admin({
            firstname,
            lastname,
            email,
            password: hashedpassword,
        });
        await newAdmin.save();
        res.status(201).json({message:"signup successful",newAdmin});
    }
    catch(error){
        res.status(500).json({errors:"error in signup"});
        console.log("error in signup",error);
    }
};
export const login = async(req,res)=>{
const {email,password}=req.body;
try{
    const admin =await Admin.findOne({email:email});
    const isPasswordCorrect=await bcrypt.compare(password,admin.password);
    if(!admin || !isPasswordCorrect){
        return res.status(403).json({errors:"invalid credentials"});
    }
    //jwt code
    const token=jwt.sign({
        id:admin._id,
    },config.JWT_ADMIN_PASSWORD,
    {expiresIn:"1d"});
    const cookieOptions={
        expires: new Date(Date.now()+ 24 * 60 * 60 * 1000), //1 day
        httpOnly: true, //can't be accessed via js directly
        secure: process.env.NODE_ENV ==="production", //true for https only
        sameSite:"Strict", //CSRF attacks
    }
   
    res.cookie("jwt",token);
    res.status(201).json({message:"login successful",admin,token});
}
catch(error){
    res.status(500).json({errors:"error in login"});
    console.log("error in login",error);   
}
};
export const logout=(req,res)=>{

    try{
        if(!req.cookies.jwt){
            return res.status(401).json({errors:"kindly login first"});
        }
        res.clearCookie("jwt");
    res.status(200).json({message:"logged out successfully"});
    }
    catch(error){
        res.status(500).json({errors:"error in logout"});
        console.log("error in logout",error);
    }
};