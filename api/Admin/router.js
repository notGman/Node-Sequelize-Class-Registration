const express = require('express')
const router = express.Router();

const {createAdmin,validateAdmin} = require('./controller')

router.post('/create',createAdmin)
router.post('/find',validateAdmin)

module.exports = router