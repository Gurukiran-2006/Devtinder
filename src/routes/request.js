const express=require("express");

const requestRouter=express.Router();

const {userAuth}=require("../middlewares/auth");

const ConnectionRequest=require("../models/connectionRequest")

const User=require("../models/user");

requestRouter.post("/request/send/:status/:toUserId",userAuth,async(req,res)=>{

try{
    const fromUserId=req.user._id;
    const toUserId=req.params.toUserId;
    const status=req.params.status;
    const isAllowedStatus=["interested","ignored"];

    //invalid status check
    if(!isAllowedStatus.includes(status)){
        return res.status(400).json({
            message:`Invalid status`
        });
    }
    
    // to check connection alreaady exists or not
    const existingConnection=await ConnectionRequest.findOne({
        $or:[
            {fromUserId,toUserId},
            {fromUserId:toUserId,toUserId:fromUserId}
        ]
    });

    if(existingConnection){
        return res.status(400).json({
            message:`connection already exists`
        });
    }
    
    //to check whether the target user is present or not
    const toUser=await User.findById(toUserId);

    if(!toUser){
        return res.status(400).json({
            message:`user not found`
        });
    }
    //check if user is sending a connection request to himself
    if(fromUserId.toString()===toUserId.toString()){
        return res.status(400).json({
            message:`you cannot send a connection request to yourself`
        });
    }

    const newConnectionRequest=new ConnectionRequest({
        fromUserId,
        toUserId,
        status
    });

    const data=await newConnectionRequest.save();

    res.json({
        message:`connection sent successfully`,
        data
    });
}
catch(err){
    return res.status(400).send("ERROR : "+err.message);
}
    
});

requestRouter.post("/request/review/:status/:requestId",userAuth,async(req,res)=>{
try{
const loggedInUser=req.user;
const {status,requestId}=req.params;

console.log("loggedInUser is: "+loggedInUser._id);
console.log("status : "+status);
console.log("request id : "+requestId);

const isAllowedStatus=["accepted","rejected"];

if(!isAllowedStatus.includes(status)){
    return res.status(400).json({
        message:`Invalid status ,status not allowed`
    });
}

const connectionRequest=await ConnectionRequest.findOne({
    _id:requestId,
    toUserId:loggedInUser._id,
    status:"interested"
});

if(!connectionRequest){
    return res.status(404).json({
        message:`connection request not found`
    });
}

connectionRequest.status=status;
const data=await connectionRequest.save();
res.json({
    message:"connection request "+status,
    data
});

}
catch(err){
    res.status(400).send("Error : "+err.message);
}
});

module.exports=requestRouter;