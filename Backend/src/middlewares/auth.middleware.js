const jwt =  require('jsonwebtoken')
const blacklisted_model = require('../models/blacklisted_token.model')

async function get_user_auth(req,res,next){

    const token = req.cookies.token;
    
    if(!token){
        return res.status(403).json({
            message : "Token Not Found"
        })
    }

    const blacklisted = await blacklisted_model.findOne({
        token
    })

    if(blacklisted){

        return res.status(403).json({
            message : "Token Invalid"
        })
    }

    try{

        const decoded = await jwt.verify(token,process.env.JWT_SECRET);
        
        req.user = decoded;

        next();


    }catch(err){
        console.error(err);
        res.status(403).json({
            message : "Error Ocuured In Token Verification"
        })
    }



}

module.exports = get_user_auth