const express=require("express");
const authRouther=express.Router();
const User=require("../models/user");
const bcrypt=require("bcrypt")
authRouther.post("/signup",async(req,res)=>{
    try{
         const {firstName,lastName,emailId,password}=req.body;
         const passwordHash=await bcrypt.hash(password,10);
         console.log(passwordHash);

         const user=new User({
            firstName,
            lastName,
            emailId,
            password:passwordHash,
         })
         const  savedUser=await user.save();
         res.send({message:"User data save",data:savedUser});
         
    }
    catch(err)
    {
       res.status(400).send("Error: "+err.message);
    }
})

module.exports=authRouther;