const mongoose=require("mongoose");

const connectionRequestSchema=new mongoose.Schema({
    fromUserId:{
        required:true,
        type:mongoose.Schema.Types.ObjectId,
        ref:"User1"
    },
    toUserId:{
        required:true,
        type:mongoose.Schema.Types.ObjectId,
        ref:"User1"
    },
    status:{
        type:String,
        required:true,
        enum:{
            values:["interested","ignored","accepted","rejected"],
            message:`{values} status is incorrect`
        },
    },   
}, 
  {timestamps:true}
);

const ConnectionRequest= mongoose.model("connectionRequest",connectionRequestSchema);
module.exports=ConnectionRequest;