const express=require("express");
const app=express();





app.get("/user/:userId",(req,res)=>{
    console.log(req.params.userId);
res.send({firstname : "gk",
          lastname:"gowda"});
});





app.listen(7777,()=>{
    console.log("server is listening on port 7777....")
});

