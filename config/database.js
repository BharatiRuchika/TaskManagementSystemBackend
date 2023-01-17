// require('dotenv').config({ path: './config/config.env' })
const mongoose = require("mongoose");
exports.connect = async()=>{
    try{
       
    var con = await mongoose.connect(`${process.env.DB_LOCAL_URI}`,{useNewUrlParser:true,useUnifiedTopology:true})
    
    }catch(err){
        console.log(err);
    }
}

