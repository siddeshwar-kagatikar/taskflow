const mongoose = require('mongoose')
const { Schema } = mongoose; 

const NotesSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    title:
    {
        type: String,
        required: true
    },
    dewdate:{
        type: Date,
        required: false
    },
    priority:{
        type: Number,
        required: true
    },
    status:{
        type: String,
        required: true
    },
    description:{
        type:String,
        required: true
    }
  })

  module.exports = mongoose.model('slots',NotesSchema)