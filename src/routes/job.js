const express=require("express");
const jobRouter=express.Router();
const {userAuth}=require("../middleware/auth");
const JobApplication = require("../models/jobApplication");

jobRouter.post("/job",userAuth,async(req,res)=>{
   try{
      const job=new JobApplication ({
      userId: req.user.id,
      companyName: req.body.companyName,
      role: req.body.role,
      platform: req.body.platform,
      jobLink: req.body.jobLink,
      notes: req.body.notes
      });
      await job.save();
      res.status(200).json(job);
   }
   catch(err)
   {
     res.status(400).send("Error :"+err.message);
   }
});

module.exports=jobRouter;