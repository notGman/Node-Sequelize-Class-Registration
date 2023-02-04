const express = require('express')
const router = express.Router()

const {getall,addStudent} = require('./controller')

router.get('/',getall)
router.post('/add',addStudent)

module.exports = router