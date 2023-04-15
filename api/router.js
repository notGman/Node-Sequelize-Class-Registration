const express = require("express")
const Student = require('./Students/router')
const Class = require('./Classes/router')
const Registration = require('./Registrations/router')
const Admin = require('./Admin/router')

const router = express.Router()

router.use('/student',Student)
router.use('/class',Class)
router.use('/registration',Registration)
router.use('/admin',Admin)

module.exports = router