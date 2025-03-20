let users=[
    {"email":"test1","password":"test1"}
];
//register interface
exports.register=(req,res)=>{
    const {email,password}=req.body;
    if(!email || !password){
        return res.status(400).json({message:"email and password are required"});
    }
    if(users.find((user) => user.email===email)){
        return res.status(400).json({message:"user already exists."});
    }
    users.push({email,password});
    res.json({message:"user registered successfully"});
};
//login interface
exports.login=(req,res)=>{
    const {email,password}=req.body;
    const user=users.find((u)=>u.email === email);
    console.log("users in memory",users);
    if(!user){
        return res.status(401).json({message:"Invalid email or password."});
    }
    console.log(user);
    if(password!=user.password){
        return res.status(401).json({message:"Invalid email or password"});
    }
    res.json({message:"login successful"});
};
// getuser interfaced (just test, will delete)
exports.getUser=(req,res)=>{
    res.json({message:"Users in memory",users});
};