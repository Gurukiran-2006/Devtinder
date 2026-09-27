const jwt=require("jsonwebtoken");
const User=require("../models/user")

const userAuth= async (req,res,next)=> {
try{
const {token}=req.cookies;
if(!token){
    throw new Error("token is not valid");
}
const decoded=await jwt.verify(token,"password");

const {_id}=decoded;

const user=await User.findById(_id);

if(!user){
    throw new Error("user not exists");
}
req.user=user;
next();
}
catch(err){
    res.status(404).send("Error : "+err.message);
}
};

module.exports={userAuth};