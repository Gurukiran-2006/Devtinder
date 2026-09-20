const mongoose=require("mongoose");
const validator=require("validator");

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
                required:true,
                lowercase:true,
                minlength:1,
                maxlength:20
              },

    email: {
        type: String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        minlength:12,
        maxlength:50,
        validate:(value)=>{
            if(!validator.isEmail(value)){
                throw new Error("enter a valid email");
            }
        }
    },

    password:{
        type:String,
        required:true,
        minlength:7,
        validate:(value)=>{
            if(!validator.isStrongPassword(value)){
                throw new Error("enter a strong password");
            }
        }
    },

        age: {
        type: Number,
        min:18
    },
    
    gender:{
        type:String,
        enum:["male","female","others"]
    },
    skills : {
        type:[String]
    },
    about:{
        type:String,
        default:"this is a blank information about the user"
    },
    photoUrl:{
        type:String,
        default:"https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_1280.png",
        validate:(value)=>{
            if(!validator.isURL(value)){
                throw new Error("enter a valid photo");
            }
        }
    },

},  {
    timestamps:true,
    });

const usermodule=mongoose.model("User1",userSchema);
module.exports=usermodule;