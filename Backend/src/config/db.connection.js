const mongoose = require('mongoose');

async function ConnectDB(){

    try{

        await mongoose.connect(process.env.MONGO_URI)

        console.log("Database Connected Successfully");
        
    }catch(err){
        console.error(err)
    }
}

module.exports=ConnectDB;