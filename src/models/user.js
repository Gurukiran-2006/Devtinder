const mongoose=require("mongoose");

const userSchema=new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    age: Number,
    password:String
});

const usermodule=mongoose.model("User1",userSchema);
module.exports=usermodule;