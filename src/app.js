const express=require("express");

const app=express();

const connectDB=require("./config/database");

const User1=require("./models/user")

app.use(express.json());

//user sign up api
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

// get user by their email
app.get("/user", async (req,res)=>{
const userEmail=req.body.email;
try{
const user=await User1.find({ email:userEmail });
res.send(user);
}
catch(err){
    res.status(404).send("something went wrong");
}
});

//feed api to show all user in database to someother user
app.get("/feed",async(req,res)=>{
try{
const feeds=await User1.find({});
res.send(feeds);
}
catch(err){
    res.status(404).send("something went wrong");
}
});

//delete a user from the database

app.delete("/userdelete",async (req,res)=>{
const userId=req.body.userid;
try{
   await User1.findByIdAndDelete(userId);
 //User1.findByIdAndDelete(_id:userId)

 res.send("user deleted successfully");
}
catch(err){
res.status(404).send("something went wrong");
}
});

//update the user in the database

app.patch("/updateUser", async(req,res)=>{
const userId=req.body.userid;
const data=req.body;
try{
 await User1.findByIdAndUpdate({_id:userId},data, 
    {runvalidators:true});
 res.send("user updated successfully");
}
catch(err){
res.status(404).send("something went wrong");
}
});

//update the user using the email
app.patch("/updateUserByEmail",async(req,res)=>{
const emailId=req.body.emailId;
const data=req.body;
try{
  await User1.findOneAndUpdate({email:emailId},data);
  res.send("updated successfully");
}
catch(err){
    res.status(404).send("something went wrong");
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



