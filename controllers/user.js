const User = require("../models/user");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

function issignupdetailsvalid(string){
    if(string==undefined || string.length===0){
        return true;
    }
    else{
    return false;
    }
}

exports.signup = async(req,res)=>{
    try{
    const {name,email,password} = req.body;
    if(issignupdetailsvalid(name) || issignupdetailsvalid(email) || issignupdetailsvalid(password)){
        return res.status(400).json({err:'bad parameters.something is missing'})
    }
    const saltRound = 10;
   bcrypt.hash(password,saltRound,async(err,hash)=>{
    console.log(err);
    await User.create({name,email,password:hash})
    res.status(201).json({message:'Successfully created New User'}) 
   })

    }
  catch(err){
    res.status(500).json(err);
  }
}

function generateAccessToken(id){
    return jwt.sign({userId:id},"Balaji")
}

 
    exports.login = async(req,res)=>{
    try{
        const{email,password}=req.body;
      const user = await User.findAll({where:{email:email}})
     console.log(user);
        if(user.length>0){
            bcrypt.compare(password,user[0].password,(err,result)=>{
            if(!err){
                res.status(200).json({success:true,message:"User successfully logged in",token:generateAccessToken(user[0].id)})
            }
            else{
             return res.status(400).json({success:false,message:'password is incorrect'})
            }
           })
        }
        else{
            return res.status(401).json({success:false,message:'user not exist'});
         }
    
        }catch(err){
            res.status(500).json({success:false,message:err})
        }
       
    }
