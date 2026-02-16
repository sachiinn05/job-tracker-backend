const express = require("express");
const cors = require("cors");          
const connectDB = require("./config/database");
const cookieParser = require("cookie-parser");
const path = require("path");

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));


app.use(express.json());
app.use(cookieParser());


app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

const photoRouter = require("./routes/userPhoto");
const authRouther = require("./routes/auth");
const profileRouter = require("./routes/profile");
const jobRouter = require("./routes/job");
const preparationRouter = require("./routes/preparation");
const dashboardRouter = require("./routes/dashboard");

app.use("/", photoRouter);
app.use("/", authRouther);
app.use("/", profileRouter);
app.use("/", jobRouter);
app.use("/", preparationRouter);
app.use("/", dashboardRouter);


connectDB()
  .then(() => {
    console.log("Database connection established..");
    app.listen(9001, () => {
      console.log("Server listening on port 9001");
    });
  })
  .catch((err) => {
    console.log("Database cannot be connected..", err);
  });
