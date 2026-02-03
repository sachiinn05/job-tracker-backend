const express=require("express");
const jobRouter=express.Router();
const {userAuth}=require("../middleware/auth");
const JobApplication = require("../models/jobApplication");
const {validateEditiJobData} =require("../utils/validation")
jobRouter.post("/job",userAuth,async(req,res)=>{
   try{
    const currentStatus = req.body.currentStatus || "Applied";

    const job = new JobApplication({
      userId: req.user.id,
      companyName: req.body.companyName,
      role: req.body.role,
      platform: req.body.platform,
      jobLink: req.body.jobLink,
      currentStatus,
      notes: req.body.notes,
      statusHistory: [
        {
          status: currentStatus,
          date: new Date(),
          note: "Initial application"
        }
      ]
    });
      await job.save();
      res.status(200).json(job);
   }
   catch(err)
   {
     res.status(400).send("Error :"+err.message);
   }
});
jobRouter.get("/job",userAuth, async(req,res)=>{
    try{
        const userId=req.user.id;
        const filter={userId:userId};
        if(req.query.status)
        {
            filter.currentStatus=req.query.status;
        }
        const job=await JobApplication.find(filter);
        res.status(200).json(job);
    }catch(error)
    {
        res.status(500).json({
            error: "Failed to fetch jobs",
             message: error.message
        })
    }
})

jobRouter.get("/job/analytics", userAuth, async (req, res) => {
  try {
    const jobs = await JobApplication.find({ userId: req.user.id });

    const analytics = {
      total: jobs.length,
      applied: jobs.filter(j => j.currentStatus === "Applied").length,
      interview: jobs.filter(j => j.currentStatus === "Interview").length,
      offer: jobs.filter(j => j.currentStatus === "Offer").length,
      rejected: jobs.filter(j => j.currentStatus === "Rejected").length,
    };

    res.status(200).json(analytics);
  } catch (err) {
    res.status(500).send("Error: " + err.message);
  }
});

jobRouter.get("/job/:id",userAuth,async(req,res)=>{
    try{
        const job_id=req.params.id;
        const job=await JobApplication.findById(job_id);
        if(!job || job.userId.toString()!==req.user.id)
        {
            return res.status(404).json({error:"Job not found"});
        }
        res.status(200).json(job);
    }catch(err)
    {
        res.status(400).send("Error"+err.message);
    }
});

jobRouter.patch("/job/:id",userAuth,async(req,res)=>{
    try{
         if (!validateEditiJobData(req)) {
         throw new Error("Invalid job update request");
        }
        const job_id=req.params.id;
        const job=await JobApplication.findById(job_id);
       
        if(!job || job.userId.toString()!==req.user.id)
        {
          return res.status(404).json({ error: "Job not found" });
        }
          Object.keys(req.body).forEach((key) => {
         job[key] = req.body[key];
        });
        await job.save();
        res.status(200).json({message:"Job updated successfully",
            data:job,
        });

    }
    catch(err)
    {
        res.status(400).send("Error:"+ err.message);
    }
})

jobRouter.patch("/job/:id/status",userAuth,async(req,res)=>{
    try{
        const {status,note}=req.body;
        const validStatuses = ["Applied", "OA", "Interview", "Offer", "Rejected"];
        if(! validStatuses.includes(status))
        {
            return res.status(400).json({error:"Invalid status value"});
        }
        const job_id=req.params.id;
        const job=await JobApplication.findById(job_id);
        if (!job || job.userId.toString() !== req.user.id) {
          return res.status(404).json({ error: "Job not found" });
        }
        job.currentStatus=status;
        job.statusHistory.push({
            status,
            date:new Date(),
            note:note|| `Status updated to ${status}`
        });
        await job.save();
        res.status(200).json(job);

    }catch(err)
    {
        res.status(400).send("Error :"+ err.message);
    }
})

jobRouter.delete("/job/:id",userAuth,async(req,res)=>{
    try{
        const job_id=req.params.id;
        const job=await JobApplication.findById(job_id)
        
        if(!job || job.userId.toString()!==req.user.id)
        {
           return res.status(400).send("Job not found");
        }
        await job.deleteOne();
        res.status(200).json({ message: "Job deleted successfully" });

    }catch(err)
    {
        res.status(500).send("Error:"+err.message);
    }
})




module.exports=jobRouter;