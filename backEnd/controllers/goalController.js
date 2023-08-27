const asyncHandler = require('express-async-handler')
const Goal = require('../models/goalModel')
const User = require('../models/userModel')
// @desc get goals
// @route Get /api/goals
// @ access private
const getGoals = asyncHandler(async(req, res)=>{
    goals = await Goal.find({
      user:req.user.id
  })   
    res.status(200).json(goals)
})

// @desc set goals
// @route post /api/goals
// @ access private
const setGoals = asyncHandler(async(req, res)=>{
    if(!req.body.text){
      res.status(400)
      throw new Error('Please add a text') 
    }
    const newgoal = await Goal.create({
       user : req.user.id,
       goal : req.body.text
    })
    res.status(200).json(newgoal)
})

// @desc update goals
// @route put /api/goals/:id
// @ access private
const updateGoals = asyncHandler(async(req, res)=>{
    const goal = await Goal.findById(req.params.id)
    
    if(!goal){
        res.status(400)
       throw new Error('Canot find this goal')
    }
    if(req.user.id !== goal.user.toString()){
      res.status(400)
      throw new Error('cannot update this goal')
    }
    const newgoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })
    res.status(200).json(newgoal)
})

// @desc delete goals
// @route delete /api/goals/:id
// @ access private
const deleteGoals = asyncHandler(async(req, res)=>{
    const userr = await Goal.findById(req.params.id)
    if(req.user.id!== userr.user.toString()){
      res.status(400)
      throw new Error('cannot delete this goal')
    }
    const result = await Goal.deleteOne({ _id: req.params.id });

  if (result.deletedCount === 0) {
    res.status(400);
    throw new Error("Can't find this goal");
  }

  res.status(200).json({ id: req.params.id });
})

module.exports = {
    getGoals,
    setGoals,
    updateGoals,
    deleteGoals
}