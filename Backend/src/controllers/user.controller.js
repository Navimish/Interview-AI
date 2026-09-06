const userModel = require('../models/user.model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const blacklisted_token_model = require('../models/blacklisted_token.model')








async function register(req,res){

    const {userName, email, password} = req.body;

    if(!userName || !email || !password){
        return res.status(400).json({
            message : "Fill All the required Fields"
        })
    }

    const userExists = await userModel.findOne({

        $or : [{userName},{email}]
    })

    if(userExists){
        return res.status(400).json({
            message : "Account Already Exsits with this userName or Email"
        })
    }


    try{

        const hashedpass = await bcrypt.hash(password,10);


        const user = await userModel.create({
            userName,
            email,
            password: hashedpass
        })

        const token = jwt.sign(
            {id:user._id, userName:user.userName},
            process.env.JWT_SECRET,
            {expiresIn :"1D"}
        )

        res.cookie('token',token);

        res.status(201).json({
            message : "User Created Successfully",
            user : {
                userName,
                email
            }
        })
        

 
    } catch(err){
        console.error(err);

        res.status(500).json({
            message : "User Creation Failed"
        })

    }






}


async function login(req,res){

    const {userName,email,password} = req.body;

    const user = await userModel.findOne({
        $or : [
            {userName},
            {email}
        ]
    })

    if(!user){
        return res.status(403).json({
            message : "Either useName or email is required for login"
        })
    }
    
    const passvalid = await bcrypt.compare(password,user.password)

    if(!passvalid){
        return res.status(403).json({
            message : "Password is Invalid"
        })
    }

    const token = jwt.sign(
        {id : user._id, userName : user.userName}, process.env.JWT_SECRET,{expiresIn: "1D"}

    )

    res.cookie("token",token);

       res.status(200).json({
        message:"User Login Successfull",
          user : {
                userName,
                email
            }
        

    })

     
}


async function logout(req,res){

    const token = req.cookies.token;

    if(token){
        await blacklisted_token_model.create({
            token
        })
    }

    res.clearCookie('token');

    res.status(200).json({
        message : "User Logged Out SuccessFully"
    })
}


async function get_user(req,res){
     const user = await userModel.findById(req.user.id)

     res.set("Cache-Control", "no-store");

     res.status(200).json({
        message : "User Fetched Successfully",
        user : {
           userName : user.userName,
           email : user.email
        }
     })

}

module.exports ={register,login,logout,get_user};