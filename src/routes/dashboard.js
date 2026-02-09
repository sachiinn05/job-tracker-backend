const express=require("express");
const dashboardRouter=express.Router();

const {userAuth}=require("../middleware/auth");
const JobApplication=require("../models/jobApplication");
const Preparation=require("../models/preparation");

dashboardRouter.get("/dashboard",userAuth,async(req,res)=>{
    try{
        const jobs=await JobApplication.find({userId:req.user.id});
        const jobStats={
            total:jobs.length,
            applied: jobs.filter(j => j.currentStatus === "Applied").length,
            interview: jobs.filter(j => j.currentStatus === "Interview").length,
            offer: jobs.filter(j => j.currentStatus === "Offer").length,
            rejected: jobs.filter(j => j.currentStatus === "Rejected").length,
            oa:jobs.filter(j=>j.currentStatus==="OA").length,
        };
        const preparation=await Preparation.find({userId:req.user.id});
        res.status(200).json({
            jobs:jobStats,
            preparation,
        });
    }catch(err)
    {
        res.status(400).send("Error :"+err.message);
    }
})
module.exports=dashboardRouter;