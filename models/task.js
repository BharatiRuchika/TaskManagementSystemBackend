var mongoose = require("mongoose");
var taskSchema = new mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    taskName:{
        type:String,
        required:true
    },
    taskDescription:{
        type:String,
        required:true
    },
    isDone:{
        type:String,
        required:true,
        default:false
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

module.exports = mongoose.model('task',taskSchema,"task");