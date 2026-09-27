const express=require("express");

const authRouter=express.Router();

const User1=require("../models/user");

const validator=require("validator");

const bcrypt=require("bcrypt");

const {validateSignupData}=require("../utils/validation");

const JWT=require("jsonwebtoken");



//signup api

authRouter.post("/signup",async (req,res)=>{
    
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

authRouter.post("/login",async (req,res)=>{

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

    const token = await JWT.sign({_id:user._id},
        "@DevTinder$#2006",
        {expiresIn:"1d"}
    );

    res.cookie("token",token);
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

authRouter.post("/logout",async(req,res)=>{
      res.cookie("token",null,{
        expiresIn:new Date(Date.now())
    });
    res.send("logout successfully");
});

module.exports=authRouter;