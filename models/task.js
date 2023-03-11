const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        require:true
    },
    name:{
        type:String,
        require:true,
    },
    description:{
        type:String,
        require:true,
    },
    priority:{
        type:String,
        enum:['low','medium','high'],
        default:'low'
    },
    status:{
        type:String,
        enum:['to do','in progress','done'],
        default:'to do'
    }
},{
    timestamps:true
})

module.exports = mongoose.model('tasks',taskSchema)