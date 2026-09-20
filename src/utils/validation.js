const validator=require("validator");

const validateSignupData=(userData)=>{
    
        if(!userData.firstName || !userData.lastName || !userData.email || !userData.password){
            throw new Error("fill the every boxes")
        }
        
        // all fields are present 

         if(!validator.isEmail(userData.email)){
            throw new Error("enter a valid email");
         }
         
         if(!validator.isStrongPassword(userData.password)){
            throw new Error("enter a strong password");
         }
         
         if(userData.password.length>40){
            throw new Error("password should not exceed 40 characters");
         }

         return true;
};


module.exports={validateSignupData};