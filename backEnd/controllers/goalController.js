
// @desc get goals
// @route Get /api/goals
// @ access private
const getGoals = (req, res)=>{
    res.status(200).json({ message: 'Get goals'})
}

// @desc set goals
// @route post /api/goals
// @ access private
const setGoals = (req, res)=>{
    res.status(200).json({ message: 'set goals'})
}

// @desc update goals
// @route put /api/goals/:id
// @ access private
const updateGoals = (req, res)=>{
    res.status(200).json({ message:`Update goal ${req.params.id}`})
}

// @desc delete goals
// @route delete /api/goals/:id
// @ access private
const deleteGoals = (req, res)=>{
    res.status(200).json({ message: `Delete goal ${req.params.id}`})
}

module.exports = {
    getGoals,
    setGoals,
    updateGoals,
    deleteGoals
}