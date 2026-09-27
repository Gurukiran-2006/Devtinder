const express=require("express");

const profileRouter=express.Router();

const {userAuth}=require("../middlewares/auth");

const {validateEditProfile}=require("../utils/validation");

const User=require("../models/user");

const bcrypt=require("bcrypt");

//profile api

profileRouter.get("/profile/view",userAuth,async(req,res)=>{
  
  try{

    const user=req.user;

    res.send(user);
    }
    catch(err){
        res.status(404).send("Error "+err.message);
    }
});

profileRouter.patch("/profile/edit",userAuth,async(req,res)=>{
  try{
  if(!validateEditProfile(req.body)){
    throw new Error("Invalid Request");
  }

  const loggedInUser=req.user;

  Object.keys(req.body).forEach(key=>(loggedInUser[key]=req.body[key]));

  await loggedInUser.save();

  res.json({
    message:`${loggedInUser.firstName} your profile updated successfully`,
    data:loggedInUser
  });
}
catch(err){
  res.status(400).send("Error "+err.message);
}

});

//update the user password

profileRouter.patch("/profile/password",userAuth,async(req,res)=>{
try{
   const userId=req.user.id;
   const {currentPassword,newPassword}=req.body;
   
   const user=await User.findById(userId);

   if(!user){
    throw new Error("user not exists");
   }

   const PasswordMatch= await bcrypt.compare(currentPassword,user.password);
   if(!PasswordMatch){
    throw new Error("Incorrect password");
   }

   const hashPassword=await bcrypt.hash(newPassword,10);

   user.password=hashPassword;

   await user.save();

   res.json({
    message:`Hey {user.firstName} your password updated successfully`
   })
   
}
catch(err){
  res.status(400).send("Error "+ err.message);
}
});

module.exports=profileRouter;