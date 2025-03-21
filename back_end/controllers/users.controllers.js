const bcrypt=require("bcrypt");
// const SECRET_KEY="123456";
const jwt=require("jsonwebtoken");
// let users=[
    // {"email":"test1","password":"test1"}
// ];
const User=require("../models/User");
//register interface
exports.register=async(req,res)=>{
    const {email,password}=req.body;
    if(!email || !password){
        return res.status(400).json({message:"email and password are required"});
    }
    const existingUser=await User.findOne({email});
    if(existingUser){
        return res.status(400).json({message:"user already exists."});
    }
    //Use bcrypt for hash encryption
    const hashedPassword=await bcrypt.hash(password,10);
    const newUser=new User({email,password:hashedPassword});
    await newUser.save();
    // users.push({email,password:hashedPassword});
    res.json({message:"user registered successfully"});
};
//login interface
exports.login=async(req,res)=>{
    const {email,password}=req.body;
    const user=await User.findOne({email});
    if(!user){
        return res.status(401).json({message:"Invalid email or password."});
    }
    const isMatch=await bcrypt.compare(password,user.password);
    if(!isMatch){
        return res.status(401).json({message:"Invalid email or password"});
    }
    const token=jwt.sign({email:user.email},process.env.JWT_SECRET,{expiresIn:"1h"});
    console.log(token);
    res.json({message:"login successful",token:token.trim()});
};
// getuser interfaced (just test, will delete)
exports.getUser=(req,res)=>{
    res.json({message:"User authenticated",user:req.user});
};