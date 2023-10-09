const mongoose = require('mongoose');

const NotesSchema = {
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
        
       
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    tag:{
        type:String,
        default:true
    },
    date:{
        type:String,
        default:Date.now
    }
}

module.exports = mongoose.model('Notes',NotesSchema);