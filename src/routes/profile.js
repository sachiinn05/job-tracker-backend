const express=require("express");
const profileRouter=express.Router();
const {userAuth}=require("../middleware/auth");
const { validateEditProfileData } = require("../utils/validation");


profileRouter.get("/profile/view",userAuth,async(req,res)=>{
    try{
        res.json(req.user);
    }
    catch(err)
    {
        res.status(400).send("Error:"+err.message);
    }
})


profileRouter.patch("/profile/editi",userAuth,async(req,res)=>{
    try{
        if(! validateEditProfileData(req))
        {
           throw new Error("Invalid user request");
        }
        const loggedInUser=req.user;
        Object.keys(req.body).forEach((key)=>(loggedInUser)[key]=req.body[key]);
        await loggedInUser.save();
        res.json({
             message: `${loggedInUser.firstName}, your profile has been updated`,
             data: loggedInUser,
        });
    }
    catch(err)
    {
        res.status(400).send("ERROR: " + err.message);
    }
})
module.exports=profileRouter;