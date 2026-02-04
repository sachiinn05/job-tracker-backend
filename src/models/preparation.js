const mongoose=require("express");

const preparationSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Type.ObjectId,
        ref:"User",
        required:true,
    },
    topic:{
        type:String,
        required:true,
    },
    level:{
        type:String,
        enum:["Beginner", "Intermediate", "Advanced"],
        default:"Beginner"
    },
    confidence:{
        type:Number,
        min:1,
        max:10,
    },
    notes:String,
},
{
    timestamps:true,
});

module.exports=mongoose.model("Preparation",preparationSchema);