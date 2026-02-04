const express=require("express");
const preparationRouter=express.Router();
const Preparation=require("../models/preparation");
const { userAuth } = require("../middleware/auth");
const {validateEditPreparationData}=require("../utils/validation");
preparationRouter.post("/preparation",userAuth,async(req,res)=>{
    try{
        const preparation=new Preparation({
            userId:req.user.id,
            topic:req.body.topic,
            level:req.body.level ||"Beginner",
            confidence:req.body.confidence,
            notes:req.body.notes,
        });
        await preparation.save();
        res.status(200).json(preparation);
    }catch(err)
    {
        res.status(400).send("Error :"+err.message);
    }
})
preparationRouter.get("/preparation",userAuth,async(req,res)=>{
    try{
        const userId=req.user.id;
        const preparation=await Preparation.find({userId:userId});
        res.status(200).json(preparation);
    }catch(err)
    {
       res.status(400).send("Error:"+err.message);
    }
});
preparationRouter.patch("/preparation/:id",userAuth,async(req,res)=>{
    try{
         const isValid = validateEditPreparationData(req);
         if (!isValid) {
         return res.status(400).json({ error: "Invalid fields for update" });
        }
        const prep_id=req.params.id;
        const preparation=await Preparation.findById(prep_id);
        if(!preparation || preparation.userId.toString()!==req.user.id)
        {
         return res.status(404).json({ error: "Topic not found" });
        }
          Object.keys(req.body).forEach((key) => {
          preparation[key] = req.body[key];
        });
        await preparation.save();

        res.status(200).json(preparation);
    }catch(err)
    {
        res.status(400).send("Error:"+err.message);
    }
});
prepRouter.delete("/preparation/:id", userAuth, async (req, res) => {
  try {
    const preparation = await Preparation.findById(req.params.id);

    if (!preparation || preparation.userId.toString() !== req.user.id) {
      return res.status(404).json({ error: "Topic not found" });
    }

    await preparation.deleteOne();
    res.status(200).json({ message: "Topic deleted successfully" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
module.exports=preparationRouter;