const express=require("express");
const connectDB=require("./config/database")
const app=express();
const path=require("path");
const photoRouter=require("./routes/userPhoto")
app.use("/uploads",express.static(path.join(__dirname,"../uploads")));

app.use(express.json());

app.use("/",photoRouter)
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