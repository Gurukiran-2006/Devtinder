const express=require("express");

const app=express();

const {adminauth,userauth}=require("./middlewares/auth");

app.use("/admin",adminauth);

app.get("/admin/getAllData",(req,res)=>{
    console.log("user data is been transferred");
    res.send("all user data is sent");
});

app.get("/admin/deleteUser",(req,res)=>{
 console.log("the given user data is been successfully deleted");
 res.send("user dataa is been deleted successfully");
});

app.post("/user/login",(req,res)=>{
res.send("user logged in successfully");
});

app.get("/user/profile",userauth,(req,res)=>{
    console.log("get me the particular user data");
    res.send("the given user data is been sent");
})

app.listen(7777,()=>{
    console.log("server is listening on port 7777....")
});

