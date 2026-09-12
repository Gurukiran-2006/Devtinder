const express=require("express");
const app=express();



app.use("/text",(req,res)=>{
    res.send("hello from the dashboard gk tinder");
})
app.use("/server",(req,res)=>{
    res.send("hello from the srever");
});

app.use("/user",(req,res)=>{
    res.send("hey hi how are you ?");
});

app.get("/user",(req,res)=>{
res.send({firstname : "gk",
          lastname:"gowda"});
});

app.post("/user",(req,res)=>{
res.send("data us saved successfully in the database")
});

app.delete("/user",(req,res)=>{
    res.send("deleted user successfully");
})



app.listen(7777,()=>{
    console.log("server is listening on port 7777....")
});

