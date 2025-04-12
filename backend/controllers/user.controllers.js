import { User } from "../models/user.model.js";
import {z} from "zod";
import bcrypt from "bcryptjs";
import config from "../config.js";
import jwt from "jsonwebtoken";
import { Purchase } from "../models/purchase.model.js";
import { Course } from "../models/course.model.js";
//so basically after i login i keep on sending multiple requests in the same login and jwts are used so that i dont have to login for each new request
export const signup = async(req,res)=>{
    const{firstname,lastname,email,password}=req.body;
    const userSchema=z.object({
        firstname: z.string().min(3,{message:"first name must be atleast 3 char long"}),
        lastname: z.string().min(3,{message:"last name must be atleast 3 char long"}),
        email: z.string().email({message:"please provide a valid email"}),
        password: z.string().min(6,{message:"first name must be atleast 6 char long"}),
    })
    const validatedData=userSchema.safeParse(req.body);
    if(!validatedData.success){
        return res.status(400).json({errors:validatedData.error.issues.map(err=>err.message)});
    }
    const hashedpassword =await bcrypt.hash(password,10)
    try{
        const existinguser=await User.findOne({email:email});
        if(existinguser){
            return res.status(400).json({error:"user already exists"});
        }
        const newUser= new User({
            firstname,
            lastname,
            email,
            password: hashedpassword,
        });
        await newUser.save();
        res.status(201).json({message:"signup successful",newUser});
    }
    catch(error){
        res.status(500).json({errors:"error in signup"});
        console.log("error in signup",error);
    }
};
export const login = async(req,res)=>{
const {email,password}=req.body;
try{
    const user =await User.findOne({email:email});
    if (!user) {
            return res.status(403).json({ errors: "Invalid credentials" });
        }
    const isPasswordCorrect=await bcrypt.compare(password,user.password);
    if(!user || !isPasswordCorrect){
        return res.status(403).json({errors:"invalid credentials"});
    }
    //jwt code
    const token=jwt.sign({
        id:user._id,
    },config.JWT_USER_PASSWORD,
    {expiresIn:"1d"});
    const cookieOptions={
        expires: new Date(Date.now()+ 24 * 60 * 60 * 1000), //1 day
        httpOnly: true, //can't be accessed via js directly
        secure: process.env.NODE_ENV ==="production", //true for https only
        sameSite:"Strict", //CSRF attacks
    }
   
    res.cookie("jwt",token);
    res.status(201).json({message:"login successful",user,token});
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
export const purchases=async(req,res)=>{
    const userId=req.userId;
    try{
        const purchased=await Purchase.find({userId});
        let purchasedCourseId=[];
        for(let i=0;i<purchased.length;i++){
            purchasedCourseId.push(purchased[i].courseId);
                   }
                   const courseData=await Course.find({
                    _id:{$in: purchasedCourseId},
                });
        res.status(200).json({purchased,courseData});
       
    }
    catch(error){
        res.status(500).json({errors:"error in purchase"});
        console.log("error in purchase",error);
    }
};