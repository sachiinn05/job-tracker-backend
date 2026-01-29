const express=require("express");
const authRouther=express.Router();
const User=require("../models/user");
const bcrypt=require("bcrypt");
const {validateSignUpData} = require("../utils/validation");
authRouther.post("/signup",async(req,res)=>{
    try{
        validateSignUpData(req);
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
         const token =await savedUser.getJWT();

         res.cookie("token",token,{
            expires:new Date (Date.now()+8*3600000)
         })

         res.send({message:"User data save",data:savedUser});
         
    }
    catch(err)
    {
       res.status(400).send("Error: "+err.message);
    }
})

authRouther.post("/login",async(req,res)=>{
    try{
         const {emailId,password}=req.body;
         const user=await User.findOne({emailId:emailId});
         if(!user)
         {
            throw new Error("User not found ");
         }
         const isPasswordValid=await user.validatePassword(password);
         if(isPasswordValid)
         {
            const token=await user.getJWT();

            res.cookie("token",token,{
                expires:new Date(Date.now()+8*3600000)
            });

            res.send({
                message:"Login successful",
                data:user
            });
         }
         else 
         {
            throw new Error("Password is incorrect");
         }
    }catch(err)
    {
       res.status(400).send("ERROR :"+err.message);
    }
});
authRouther.post("/logout",async(req,res)=>{
  res.cookie("token",null,{
    expires:new Date(Date.now()),
  });
  res.send("logout successful");
})

module.exports=authRouther;