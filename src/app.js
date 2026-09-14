const express=require("express");

const app=express();

const connectDB=require("./config/database");

const User1=require("./models/user")

app.use("/signup",async (req,res)=>{
    const user=new User1({
        firstName:"abc",
        lastName:"def",
        email:"xyz@123",
        age:20, 
        password:123456789
    });

    await user.save();
    res.send("user added successfully");
});

connectDB()
.then(()=>{
    console.log("database connection is estabilised");

    app.listen(7777,()=>{
    console.log("server is listening on port 7777....")
});

})
.catch((err)=>{
   console.log("unable to connect to the database");
});



