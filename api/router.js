const express = require("express")
const Student = require('./Students/router')
const Class = require('./Classes/router')
const Registration = require('./Registrations/router')

const router = express.Router()

router.use('/student',Student)
router.use('/class',Class)
router.use('/registration',Registration)

module.exports = router