const express=require("express");

const app=express();

const connectDB=require("./config/database");

const User1=require("./models/user")

app.use(express.json());

app.use("/signup",async (req,res)=>{
     const user=new User1(req.body);
  
    try{
    await user.save();
    res.send("user added successfully");
    }
    catch(err){
        res.status(404).send("error while saving the data"+err.message);
    }
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
   console.log(err);
});



