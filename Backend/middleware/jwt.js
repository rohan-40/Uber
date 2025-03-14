const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel')
const BlacklistToken = require('../models/blacklistToken');
const captainModel = require('../models/captainModel');

module.exports.authUser = async (req,res,next) =>{
    
    const token = req.cookies.token || (req.headers.authorization?.split(" ")[1]);   
    if(!token){
        return res.status(401).json({message : "Unauthorizred"});
    }
    
    const isBlackList = await BlacklistToken.findOne({token:token});
    if(isBlackList){
        return res.status(401).json({message : "Unauthorizred"});
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        const user = await userModel.findOne({_id:decoded._id});
        req.user = user;
        return next();
    }
    catch(err){
        console.log(err);
        return res.status(501).json({message : "Invalid Token"});
    }
}

module.exports.authCaptain = async (req,res,next) =>{
    
    const token = req.cookies.token || (req.headers.authorization?.split(" ")[1]);   
    if(!token){
        return res.status(401).json({message : "Unauthorizred"});
    }
    
    const isBlackList = await BlacklistToken.findOne({token:token});
    if(isBlackList){
        return res.status(401).json({message : "Unauthorizred"});
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        const captain = await captainModel.findOne({ _id: decoded._id });

        req.captain = captain;
        return next();
    }
    catch(err){
        console.log(err);
        return res.status(501).json({message : "Invalid Token"});
    }
}

module.exports.generateToken = (userId) =>{
    return jwt.sign({_id : userId}, process.env.JWT_KEY, {expiresIn : '24h'});
}

