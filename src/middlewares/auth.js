const adminauth=(req,res,next)=> {
console.log("admin auth is getting checked");
const token="xyzasas";
const ischeckadminauth= token==="xyz";
if(!ischeckadminauth){
    res.status(401).send("unauthorized access");
}
else{
    next();
}
};


const userauth=(req,res,next)=> {
console.log("user auth is getting checked");
const token="abc";
const ischeckadminauth= token==="abc";
if(!ischeckadminauth){
    res.status(401).send("unauthorized access");
}
else{
    next();
}
};

module.exports={adminauth,userauth};