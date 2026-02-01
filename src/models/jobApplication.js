const mongoose =require("mongoose")

const jobApplicationSchema=new mongoose.Schema({
    
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    companyName:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        required:true,
    },
    platform:{
        type:String,

    },
    jobLink:{
        type:String,
    },
    appliedDate:{
        type:Date,
        default:Date.now
    },
    
    currentStatus:{
       type:String,
       enum:{
        values:["Applied", "OA", "Interview", "Offer", "Rejected"],
        message: `{VALUE} is incorrect status type`, 
       },
       default:"Applied"
    },
    statusHistory:[
        {
            status:String,
            date:Date,
            note:String
        }
    ],
    followUpDate:Date,
    notes:String
},
{
    timestamps:true,
});

module.exports=mongoose.model("JobApplication",jobApplicationSchema);