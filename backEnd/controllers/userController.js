const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const createUser =asyncHandler(async(req,res)=>{
     if(!req.body.name || !req.body.email || !req.body.password){
        res.status(400)
        throw new Error('Please add a text') 
     }
     const checkUser = await(User.findOne({ email: req.body.email }))
     if(checkUser){
      res.status(400)
        throw new Error('User already exists')
     }
     const hashedPassword = await bcrypt.hash(req.body.password, 10);
     if(req.body.dateOfBirth){
     newUser =await User.create({
        name:req.body.name,
        email:req.body.email,
        password: hashedPassword,
        dateOfBirth: req.body.dateOfBirth
    })
   }
   else{
      newUser =await User.create({
         name:req.body.name,
         email:req.body.email,
         password: hashedPassword,
      })
   }
     res.status(200).json(newUser)

})

const login= asyncHandler(async(req,res)=>{
   if(!req.body.email || !req.body.password){
      res.status(400)
      throw new Error('please add email or password')
   }
   const oldUser =await User.findOne({
      email:req.body.email,
   })
   if (!oldUser) {
      res.status(400).json('Email or password is incorrect');
      return;
    }

   const flag = await bcrypt.compare(req.body.password, oldUser.password)

   if(flag){
      const token = generateToken(oldUser._id)
   
       res.status(200).json({ token });
   }
   else{
      res.status(400).json('email or password is wrong')
   }
})

const generateToken = (id) => {
   return jwt.sign({ id}, process.env.JWT_SECRET, {
      expiresIn: '30d', // Set an expiration time for the token
    });
}


const getAge = asyncHandler(async(req, res)=>{
   const {dateOfBirth}= await User.findById(req.user.id)
   if(!dateOfBirth){
      res.status(400).json('please  add you birth date')
   }
   age = new Date() - dateOfBirth
   const millisecondsInYear = 1000 * 60 * 60 * 24 * 365.25;
   age = Math.floor(age/millisecondsInYear)
   console.log(age)
   res.status(200).json({
      age
      })
})

const setBirth = asyncHandler (async(req,res)=>{
    oldUser = User.findById(req.user.id)
    console.log(1)
    if(oldUser.dateOfBirth){
      res.status(400)
      throw new Error('already have birth date')
    }
   console.log(2)
  newUser= await User.findByIdAndUpdate(oldUser.findById,{
   dateOfBirth:req.body,
})
console.log(3)
  res.status(200).json(newUser);
})


module.exports={createUser, login, getAge, setBirth}