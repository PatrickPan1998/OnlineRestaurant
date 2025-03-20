const bcrypt=require("bcrypt");
const SECRET_KEY="123456";
const jwt=require("jsonwebtoken");
let users=[
    {"email":"test1","password":"test1"}
];
//register interface
exports.register=async(req,res)=>{
    const {email,password}=req.body;
    if(!email || !password){
        return res.status(400).json({message:"email and password are required"});
    }
    if(users.find((user) => user.email===email)){
        return res.status(400).json({message:"user already exists."});
    }
    //Use bcrypt for hash encryption
    const hashedPassword=await bcrypt.hash(password,10);
    users.push({email,password:hashedPassword});
    res.json({message:"user registered successfully"});
};
//login interface
exports.login=async(req,res)=>{
    const {email,password}=req.body;
    const user=users.find((u)=>u.email === email);
    if(!user){
        return res.status(401).json({message:"Invalid email or password."});
    }
    const isMatch=await bcrypt.compare(password,user.password);
    if(!isMatch){
        return res.status(401).json({message:"Invalid email or password"});
    }
    const token=jwt.sign({email:user.email},SECRET_KEY,{expiresIn:"1h"});
    res.json({message:"login successful",token});
};
// getuser interfaced (just test, will delete)
exports.getUser=(req,res)=>{
    res.json({message:"User authenticated",user:req.user});
};