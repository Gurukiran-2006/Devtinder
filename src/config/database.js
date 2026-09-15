// most important lines in the database in my project first 2 lines ok

const dns = require("dns");

dns.setServers(["1.1.1.1", "8.8.8.8"]);


const mongoose = require('mongoose');

const connectDB = async () => {
    await mongoose.connect(
        "mongodb+srv://db_user:password@devtinderpro.rpt8yda.mongodb.net/devTinder"
    );
};



module.exports=connectDB;

