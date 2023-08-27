const express = require('express')
const router = express.Router()
const{createUser, login, getAge, setBirth} = require('../controllers/userController')
const {protect} = require('../middleWare/authMiddleware')

router.post('/register', createUser)
router.post('/login', login)
router.get('/getAge',protect, getAge)
router.post('/setBirth',protect, setBirth)

module.exports=router