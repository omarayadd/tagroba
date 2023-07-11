const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcryptjs');


const goalSchema = Schema({
    goal: {
        type : String,
        required : [true,'please add a text value']
    }
},{
   timestamps: true 
})


module.exports = mongoose.model('Goal', goalSchema)