import { Course } from "../models/course.model.js";
import { v2 as cloudinary } from 'cloudinary';
import { Purchase } from "../models/purchase.model.js";
export const createCourse= async (req,res) => {
    const adminId=req.adminId;
const{title,description,price}=req.body;
try{
    if(!title || !description || !price ){
        return res.status(400).json({errors:"All fields are required"});
    }
    const {image}=req.files
    if(!req.files || Object.keys(req.files).length==0){
        return res.status(400).json({errors:"no file uploaded"});
    }
    const allowedFormat=["image/png","image/jpeg"]
    if(!allowedFormat.includes(image.mimetype)){
        return res.status(400).json({errors:"Invalid file format"});
    }
    //cloudinary code
    const cloud_response=await cloudinary.uploader.upload(image.tempFilePath)
    if(!cloud_response || cloud_response.error){
        return  res.status(400).json({errors:"error uploading to cloudinary"});
    }

    const courseData={
        title,  
        description,
        price,
        image:{
            public_id:cloud_response.public_id,
            url:cloud_response.url,
        },
        creatorId:adminId
    };
    const course=await Course.create(courseData)
    res.json({
        message:"course created successfully!",
        course

    })
}
catch(error){
    console.log(error);
    res.status(500).json({error:"error creating course"});
}
};
export const updateCourse= async (req,res) => {
     const adminId=req.adminId
 const {courseId}=req.params;
 const {title,description,price,image}=req.body;
 try{
    const courseSearch =await Course.findById(courseId);
    if(!courseSearch){return res.status(404).json({errors:"course not found"});
}
    const course = await Course.findOneAndUpdate({
        _id:courseId,
        creatorId:adminId,
    },
{
    title,
    description,
    price,
    image:{
        public_id:image?.public_id,
        url:image?.url,
    },
});
if(!course){
    return res.status(404).json({errors:"can't update,created by other admin"});
}
res.status(201).json({message:"Course updated successfully",course});
 }
 catch(error){
    res.status(500).json({error:"error in updating"});
    console.log("error in updating the course",error);
 }
};
export const deleteCourse= async (req,res) => {
    const adminId=req.adminId
        const {courseId}=req.params;
        try{
            const course=await Course.findOneAndDelete({
                _id:courseId,
                creatorId:adminId,
            })
            if(!course){
                return res.status(404).json({error:"can't delete,created by other admin"})
            }
            res.status(200).json({message:"Course deleted successfully"})
        }
        catch(error){
            res.status(500).json({errors:"error in deleting the course"})
            console.log("error in deleting the course",error)
        }
};
export const getCourses= async (req,res) => {   
    try{
        const courses=await Course.find({});
        res.status(201).json({courses});
    }
    catch(error){
        res.status(500).json({errors:"error in getting the course"})
        console.log("error in getting the course",error)
    }
};
export const courseDetails= async (req,res) => {   
    const {courseId}=req.params;
    try{
        const course=await Course.findById(courseId);
        if(!course){
            return res.status(404).json({error:"course  not found"})
        }
        res.status(201).json({course});
    }
    catch(error){
        res.status(500).json({errors:"error in getting the course details"})
        console.log("error in getting the course",error)
    }
};
// export const buyCourses = async (req, res) => {
//     console.log("Received Headers:", req.headers); // Debugging
//     console.log("Received Params:", req.params); // Debugging
//     console.log("User ID from Middleware:", req.userId); // Debugging

//     const { courseId } = req.params;
//     const { userId } = req; // Extracted from middleware

//     if (!userId) {
//         return res.status(400).json({ errors: "User ID is missing" });
//     }

//     try {
//         const course = await Course.findById(courseId);
//         if (!course) {
//             return res.status(404).json({ errors: "Course not found" });
//         }

//         const existingPurchase = await Purchase.findOne({ userId, courseId });
//         if (existingPurchase) {
//             return res.status(400).json({ errors: "User has already purchased this course" });
//         }

//         const newPurchase = new Purchase({ userId, courseId });
//         await newPurchase.save();

//         res.status(201).json({ message: "Course purchased successfully", newPurchase });
//     } catch (error) {
//         console.error("Error in buying the course:", error);
//         res.status(500).json({ errors: "Error in buying the course" });
//     }
// };

// export const buyCourses= async (req,res) => {
//         const {userId}=req;
//         const {courseId}=req.params;
//         try{
//             const course=await Course.findById(courseId);
//             if(!course){
//                 return res.status(404).json({errors:"course not found"});
//             }
//             const existingPurchase=await Purchase.findOne({userId,courseId});
//             if(existingPurchase){
//                 return res.status(400).json({errors:"user has already purchased this course"});
//             }
//             const newPurchase=new Purchase({userId,courseId})
//             await newPurchase.save();
//             res.status(201).json({message:"course purchased successfully",newPurchase})
//         }
//         catch(error){
//             res.status(500).json({errors:"error in buying the course"});
//             console.log("error in buying the course",error)
//         }
// };
// export const buyCourses = async (req, res) => {
//     console.log("User ID in Request:", req.userId);  //  Debugging
//     const { userId } = req;
//     const { courseId } = req.params;

//     if (!userId) {
//         return res.status(400).json({ errors: "User ID is missing" });
//     }

//     try {
//         const course = await Course.findById(courseId);
//         if (!course) {
//             return res.status(404).json({ errors: "Course not found" });
//         }

//         const existingPurchase = await Purchase.findOne({ userId, courseId });
//         if (existingPurchase) {
//             return res.status(400).json({ errors: "User has already purchased this course" });
//         }

//         const newPurchase = new Purchase({ userId, courseId });
//         await newPurchase.save();

//         res.status(201).json({ message: "Course purchased successfully", newPurchase });
//     } catch (error) {
//         console.error("Error in buying the course:", error);
//         res.status(500).json({ errors: "Error in buying the course" });
//     }
// };
// export const buyCourses = async (req, res) => {
//     const { courseId } = req.params;
//     const { userId } = req; // Extracted from middleware

//     if (!userId) {
//         return res.status(400).json({ errors: "User ID is missing" });
//     }

//     try {
//         const course = await Course.findById(courseId);
//         if (!course) {
//             return res.status(404).json({ errors: "Course not found" });
//         }

//         const existingPurchase = await Purchase.findOne({ userId, courseId });
//         if (existingPurchase) {
//             return res.status(400).json({ errors: "User has already purchased this course" });
//         }

//         const newPurchase = new Purchase({ userId, courseId });
//         await newPurchase.save();

//         res.status(201).json({ message: "Course purchased successfully", newPurchase });
//     } catch (error) {
//         res.status(500).json({ errors: "Error in buying the course" });
//     }
// };
// export const buyCourses = async (req, res) => {
//     const { userId } = req;
//     const { courseId } = req.params;
  
//     try {
//       const course = await Course.findById(courseId);
//       if (!course) {
//         return res.status(404).json({ errors: "Course not found" });
//       }
//       const existingPurchase = await Purchase.findOne({ userId, courseId });
//       if (existingPurchase) {
//         return res
//           .status(400)
//           .json({ errors: "User has already purchased this course" });
//       }
//     } catch (error) {
//       res.status(500).json({ errors: "Error in course buying" });
//       console.log("error in course buying ", error);
//     }
//   };
import mongoose from "mongoose";
import Stripe from "stripe";
import config from "../config.js";
const stripe= new Stripe(config.STRIPE_SECRET_KEY);
console.log(config.STRIPE_SECRET_KEY);
// import { Course } from "../models/course.model.js";
// import { Purchase } from "../models/purchase.model.js";

export const buyCourses = async (req, res) => {
    const { userId } = req;
    const { courseId } = req.params;

    try {
        console.log("Received courseId:", courseId);
        console.log("Type of courseId:", typeof courseId);
        console.log("Length of courseId:", courseId ? courseId.length : "undefined");

        // Validate courseId
        if (!mongoose.Types.ObjectId.isValid(courseId)) {
            return res.status(400).json({ errors: "Invalid Course ID format" });
        }

        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ errors: "Course not found" });
        }

        const existingPurchase = await Purchase.findOne({ userId, courseId });
        if (existingPurchase) {
            return res.status(400).json({ errors: "User has already purchased this course" });
        }
        //stripe payment
        const amount=course.price;
        const paymentIntent = await stripe.paymentIntents.create({
    amount: amount,
    currency: "usd",
    payment_method_types: ["card"],
  });
res.status(201).json({ 
    course,
    clientSecret: paymentIntent.client_secret,
});
console.log("🎉 Response sent successfully!");

        // res.status(201).json({ message: "Course purchased successfully", course,
        //     clientSecret:paymentIntent.client_secret });
    } catch (error) {
        console.error("Error in course buying", error);
        res.status(500).json({ errors: "Error in course buying" });
    }
};
