const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcryptjs');
const user = require('../models/userModel')


const goalSchema = Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    goal: {
        type : String,
        required : [true,'please add a text value']
    }
},{
   timestamps: true 
})


module.exports = mongoose.model('Goal', goalSchema)