const express=require("express");
const app=express();

app.use("/text",(req,res)=>{
    res.send("hello from the dashboard gk tinder");
})
app.use((req,res)=>{
    res.send("hello from the srever");
});

app.listen(7777,()=>{
    console.log("server is listening on port 7777....")
});