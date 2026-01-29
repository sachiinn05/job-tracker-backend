const mongoose=require("mongoose");
const validator=require("validator");
const jwt=require("jsonwebtoken")
const userSchema=new mongoose.Schema({
    firstName:{
        type:String,
        require:true,
        minLength:4,
        maxLength:50,
    },
    lastName:{
        type:String,
        require:true,
    },
    emailId:{
        type:String,
        lowercase:true,
        require:true,
        unique:true,
        trim:true,
        validate(value)
        {
            if(!validator.isEmail(value))
            {
                throw new Error("Invalid Email address"+value);
            }
        },
    },    
     password:{
       type:String,
       require:true,
    },
    age:{
       type:Number,
        min:18,
    },
    gender:{
      type:String,
       validate(value)
       {
         if(!["male","female","others"].includes(value))
            {
                throw new Error("Gender data is not valid");
            }
        },
    },
     about:{
        type:String,
        default:"This is default about of user"
    },
    skills:{
      type:[String],
    },   
    photo:{
        type:String,
    },
},
{
    timeseries:true,
});

userSchema.methods.getJWT=async function ()
{
 const user=this;
 const token= await jwt.sign({ _id: user._id }, "DEV@JobTracker390", {
     expiresIn: "7d",
 });
 return token;
}

module.exports=mongoose.model("User",userSchema);