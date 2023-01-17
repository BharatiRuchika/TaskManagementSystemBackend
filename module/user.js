var User = require("../models/user")
var bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken") 
exports.registerUser = async (req, res, next) => {
    try {
        console.log("im here")
        console.log("body", req.body);
        let { fname, lname, email, password } = req.body;
        var oldUser = await User.findOne({email})
        if(oldUser!=null){
          return res.send({error:"user already registered"})
        }
        password = await bcrypt.hash(password,10);
       var user =  await User.create({
            firstName:fname,
            lastName:lname,
            email,
            password
        })
        let token =  jwt.sign({ _id: user._id }, "GUvi!jdks", {
            expiresIn: '7d'
        })
        res.cookie('token',token,{
            httpOnly:true,
            maxAge:30*24*60*60*1000
        }).json({
            success:true,
            user,
            token
        })
        // res.send({user,success:true})
    } catch (error) {
        console.log("error", error);
        res.send(error)
    }
}

exports.validateUser = async(req,res,next)=>{
    try{
        let {email,password} = req.body;
        let user = await User.findOne({email});
        if(user==null){
            return res.send({error:"user not exist"})
        }
        let token =  jwt.sign({ _id: user._id }, "GUvi!jdks", {
            expiresIn: '7d'
        })
        res.cookie('token',token,{
            httpOnly:true,
            maxAge:30*24*60*60*1000
        }).json({
            success:true,
            user,
            token
        })
    }catch(error){
        console.log('error',error);
    }
   
}