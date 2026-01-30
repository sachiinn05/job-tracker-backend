const express=require("express");
const upload=require("../middleware/upload")
const User=require("../models/user");
const photoRouter=express.Router();

photoRouter.post(
  "/upload-photo/:id",
  upload.single("photo"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      const user = await User.findByIdAndUpdate(
        req.params.id,
        { photo: `/uploads/${req.file.filename}` },
        { new: true }
      );

      res.status(200).json({
        message: "Photo uploaded successfully",
        photo: user.photo
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

module.exports=photoRouter;