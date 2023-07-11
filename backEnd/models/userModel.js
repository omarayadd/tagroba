const mongoose = require('mongoose');

const userShcema = mongoose.Schema({
    name: {
    type:String,
    required:true,
    },
    email: {
        type:String,
        required: true,
        lowercase: true
    },
    password:{
        type:String,
        required: true,
    },
    dateOfBirth:{
        type: Date,
    }},{
        timestamps: true 
     })



module.exports=mongoose.model('User', userShcema)