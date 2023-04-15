const express = require('express')
const {adminAuth,studentAuth} = require('../../middlewares/auth')
const router = express.Router()

const {getall,addStudent,deleteStudent,studentLogin} = require('./controller')

router.get('/',getall)
router.post('/add',addStudent)
router.post('/login',studentLogin)
router.delete('/delete',adminAuth,deleteStudent)

module.exports = router