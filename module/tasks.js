const { TokenExpiredError } = require("jsonwebtoken");
var Task = require("../models/task")
exports.addTask = async(req,res,next)=>{
    console.log("body",req.body);
    try{
        console.log("body",req.body);
        var {task,description} = req.body;
        var task =  await Task.create({
            userId:req.user._id,
             taskName:task,
             taskDescription:description
            })
        res.send({success:true,task});
    }
catch(error){
  console.log("error",error);
  res.send({error:"something went wrong"})
}
}

exports.getTasks = async(req,res,next)=>{
    console.log("im in get tasks")
    console.log("id",req.user.userId)
      try{
        var tasks = await Task.find({userId:req.user._id})
        console.log("tasks",tasks)
        res.send({success:true,tasks})
      }catch(error){
        console.log("error",error);
        res.send({error:"something went wrong"})
      }
}

exports.getTask = async(req,res,next)=>{
    console.log("im in get task")
    try{
        var task = await Task.findOne({userId:req.user._id,_id:req.params.id})
        console.log("task",task);
        res.send({task})
    }catch(error){
        console.log("error",error);
        res.send({error:"something went wrong"})
    }
}

exports.editTask = async(req,res,next)=>{
    console.log("im in edit task")
    try{
        var {name,description} = req.body;
        
        var task = await Task.findByIdAndUpdate(req.params.id,{
            taskName:name,
            taskDescription:description
        })
        console.log("task",task);
        res.send({task,success:true})
    }catch(error){
        console.log("error",error);
        res.send({error:"something went wrong"})
    }
}

exports.deleteTask = async(req,res,next)=>{
    console.log("im in delete task");
    try{
        var task = await Task.findByIdAndRemove(req.params.id);
        res.send({task})
    }catch(error){
        console.log("error",error);
        res.send({error:"something went wrong"})
    }
}