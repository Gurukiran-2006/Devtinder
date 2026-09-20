const express=require("express");

const app=express();

const connectDB=require("./config/database");

const User1=require("./models/user");

const validator=require("validator");

const bcrypt=require("bcrypt");

const {validateSignupData}=require("./utils/validation");

app.use(express.json());

//user sign up api
app.post("/signup",async (req,res)=>{
    
    try{

    validateSignupData(req.body);
    
    const{firstName,lastName,email,password}=req.body;
   
    const passwordHash=await bcrypt.hash(password,10);

    
    const user=new User1({
        firstName,
        lastName,
        email,
        password:passwordHash
    });

    await user.save();
    res.send("user added successfully");
    }
    catch(err){
        res.status(400).send("error while saving the data "+err.message);
    }
});

//login api
app.post("/login",async (req,res)=>{

try{
const {email,password}=req.body;

if(!validator.isEmail(email)){
    throw new Error("Invalid credentials");
}

const user=await User1.findOne({email:email});
if(!user){
throw new Error("Invalid Credentials");
}

const validPassword = await bcrypt.compare(password,user.password);

if(validPassword){
    res.send("Login successfull");
}
else{
    res.send("Invalid Credentials");
}
}
catch(err){
    res.status(404).send("Error "+err.message);
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
const AllowedUsers=["firstName","lastName","age","gender","skills","about","photoUrl"];

try{
    // allow only the isallowedusers to update
    const isValid=Object.keys(req.body).every(field=>
        field==="userid" || AllowedUsers.includes(field));
    
    if(!isValid){
        return res.status(400).send("updation of password and email is not allowed");
    }
    
    //check whether any fields is present to update data or not
    const hasAllowedFields=AllowedUsers.some(field=>(req.body)[field]!==undefined);
    if(!hasAllowedFields){
        throw new Error("No fields to update");
    }

    // create only the fields we allow to update
    const updateData={};

    AllowedUsers.forEach(field=>{
        if(req.body[field]!==undefined){
            updateData[field]=req.body[field];
        }
     });


    //update the user
    const user = await User1.findByIdAndUpdate(
        userId,
        updateData,
        {
        returnDocument:"after",
        runValidators:true
    });
    
    //check whether user exists or not
    if(!user){
        return res.status(400).send("user not exists");
    }

    res.send("user updated successfully");
}
catch(err){
res.status(404).send("something went wrong " + err.message);
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



