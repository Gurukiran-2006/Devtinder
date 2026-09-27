const express=require("express");

const app=express();

const connectDB=require("./config/database");

const cookieParser = require("cookie-parser");

const authRouter=require("./routes/auth");
const profileRouter=require("./routes/profile");
const requestRouter=require("./routes/request");
const userRouter=require("./routes/userRoute");

app.use(express.json());
app.use(cookieParser());

app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",requestRouter);
app.use("/",userRouter);

connectDB()
.then(()=>{
    console.log("database connection is estabilised");

    app.listen(7777,()=>{
    console.log("server is listening on port 7777....")
});

})
.catch((err)=>{
   console.log("unable to connect to the database");
   console.log(err);
});



