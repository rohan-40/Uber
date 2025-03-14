const captainModel = require('../models/captainModel');
const {validationResult, cookie} = require('express-validator');
const jwt = require('../middleware/jwt')
const captainService = require('../services/captainService')
const BlacklistToken = require('../models/blacklistToken')

module.exports.registerCaptain = async (req,res,next) =>{
    const errors = validationResult(req);
    if(!errors){
        return res.status(501).json({errors: errors.array()})
    }

    const {fullname,email,password,vehicle} = req.body;

    const isCaptain = await captainModel.findOne({email});
    if(isCaptain){
        return res.status(400).json({message: "Captain Already Exists"});
    }
    const captain = await captainService.createCaptain({fullname,email,password,vehicle});
    
    const token = await jwt.generateToken(captain._id);

    res.json({token, captain});
}

module.exports.loginCaptain = async (req,res,next) =>{
    const errors = validationResult(req);
    if(!errors){
        return res.json({errors : errors.array()});
    }

    const {email,password} = req.body;
    const captain = await captainModel.findOne({email}).select("+password");
    if(!captain){
        return res.status(400).json({message: "Email or Password Incorrect"});
    }

    const isMatch = await captain.comparePassword(password);
    if(!isMatch){
        return res.status(400).json({message: "Email or Password Incorrect"});
    }

    const token =  jwt.generateToken(captain._id);
    res.cookie("token", token);
    res.status(200).json({token, captain})
}

module.exports.captainProfile = async (req,res,next)=>{
    return res.status(200).json(req.captain)
}

module.exports.logoutCaptain = async (req,res) =>{
    const token = req.cookies.token || req.headers.authorization.split(" ")[1];
    await BlacklistToken.create({token});
    res.clearCookie('token');

    res.status(200).json({message: "Logged Out "})
}