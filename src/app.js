const express=require("express");
const connectDB=require("./config/database")
const cookieParser=require("cookie-parser")
const app=express();
const path=require("path");
const photoRouter=require("./routes/userPhoto");
const authRouther = require("./routes/auth");
const profileRouter = require("./routes/profile");
const jobRouter = require("./routes/job");
const preparationRouter = require("./routes/preparation");
app.use("/uploads",express.static(path.join(__dirname,"../uploads")));

app.use(express.json());
app.use(cookieParser());

app.use("/",photoRouter)
app.use("/",authRouther);
app.use("/",profileRouter);
app.use("/",jobRouter)
app.use("/",preparationRouter)
connectDB()
.then(()=>{
    console.log("Database connection established..");
    app.listen(9001,()=>{
       console.log("Server listening on port 9001"); 
    }) 
})
.catch((err)=>{
     console.log("Database cannot be connected..", err);

})