const express=require("express");
const ConnectionRequest = require("../models/connectionRequest");
const {userAuth}=require("../middlewares/auth");
const userRouter=express.Router();
const User=require("../models/user");

const user_safe_data=["firstName","lastName","age","gender","skills"];

//request received api
userRouter.get("/user/request/received",userAuth,async(req,res)=>{
try{
  const loggedInUser=req.user;

  const connectionRequest=await ConnectionRequest.find({
    toUserId:loggedInUser._id,
    status:"interested"
  }).populate( "fromUserId",user_safe_data );

  res.json({
    message:"data fetched successfully",
    data:connectionRequest,
  });

}
catch(err){
    res.status(400).send("Error : "+err.message);
}
});

//connection api
userRouter.get("/user/connections",userAuth,async(req,res)=>{
try{
  const loggedInUser=req.user;
  
  const connectionRequest=await ConnectionRequest.find({
    $or:[
      {fromUserId:loggedInUser._id,status:"accepted"},
      {toUserId:loggedInUser._id,status:"accepted"}
    ],

  })
  .populate("fromUserId",user_safe_data)
  .populate("toUserId",user_safe_data);

  const data=connectionRequest.map((row)=>{
    if(row.fromUserId._id.toString()===loggedInUser._id.toString()){
      return row.toUserId;
    }
    else{
      return row.fromUserId;
    }
});

 res.json({
    message:"user connection fetched successfully",
    data
  });
}
catch(err){
  res.status(400).send("Error : "+err.message);
}
});

//feed api
userRouter.get("/user/feed",userAuth,async(req,res)=>{
try{
 const loggedInUser=req.user;
 const page=parseInt(req.query.page)|| 1;
 let limit=parseInt(req.query.limit) ||10;

 limit=limit>50?50:limit;

 const skip=(page-1)*limit;

 const connectionRequest= await ConnectionRequest.find({
  $or:[{fromUserId:loggedInUser._id},
  {toUserId:loggedInUser._id}],
}).select(["fromUserId","toUserId"]);

 const hideFromUserFeed=new Set();
 connectionRequest.forEach((req)=>{
  hideFromUserFeed.add(req.fromUserId.toString());
  hideFromUserFeed.add(req.toUserId.toString());
 });

 const users=await User.find({
  $and:[
    {_id:{$nin:Array.from(hideFromUserFeed)}},
    {_id:{$ne:loggedInUser._id}}
  ]
}).select(user_safe_data).skip(skip).limit(limit);

res.json({
  message:"feed feteched successfully",
  data:users
});

}
catch(err){
  res.status(400).send("Error : "+err.message);
}
});

module.exports=userRouter;