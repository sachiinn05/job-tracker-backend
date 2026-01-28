const express=require("express");
const upload=require("../middleware/upload")
const User=require("../models/user");
const photoRouter=express.Router();

photoRouter.post("/upload-photo/:id",upload.single("photo"),async (req,res)=>{
   try{
      const user=await User.findByIdAndUpdate(
        req.params.id,
        {photo: `/uploads/${req.file.filename}`},
        {new:true}
      );
      res.status(200).json({messsage:"Photo uploads sucessfully",
        photo:user.photo
      });

   }catch(error)
   {
    res.status(500).json({error:error.messsage});
   }
});
module.exports=photoRouter;