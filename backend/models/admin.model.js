import mongoose, { Mongoose } from "mongoose";
const adminSchema=new mongoose.Schema({
    firstname:{
        type:String,
        required:true,
    },
    lastname:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        union: true,
    },
    password: {
        type:String,
        required:true,
      
    },


});
export const Admin = mongoose.model("admin",adminSchema);