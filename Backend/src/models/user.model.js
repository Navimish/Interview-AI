const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({

    userName : {
        type : String,
        unique : [true, "UserName Already Taken"],
        required : true
    },

    email : {
        type : String,
        unique : [true, "Email Already Exists"],
        required : true
    },

    password : {
        type : String,
        required : true
    }
})


const userModel = mongoose.model("users", userSchema);

module.exports = userModel;