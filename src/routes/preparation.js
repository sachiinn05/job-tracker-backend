const express=require("express");
const preparationRouter=express.Router();
const Preparation=require("../models/preparation");
const { userAuth } = require("../middleware/auth");

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
module.exports=preparationRouter;