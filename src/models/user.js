const mongoose=require("mongoose");

const userSchema=new mongoose.Schema({
    firstName: {
                type: String, 
                required : true,
                trim:true,
                lowercase:true,
                minlength:3,
                maxlength:50
            },

    lastName: {
                type : String,
                trim:true,
                lowercase:true,
                minlength:5,
                maxlength:20
              },

    email: {
        type: String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        minlength:12,
    },
    age: {
        type: Number,
        min:18
    },
    password:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true,
        enum:["male","female","others"]
    },
    skills : {
        type:[String]
    },

},  {
    timestamps:true,
    });

const usermodule=mongoose.model("User1",userSchema);
module.exports=usermodule;