const express=require("express");
const connectDB=require("./config/database")
const app=express();

app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).send("Job Tracker Backend is running 🚀");
});
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