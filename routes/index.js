const express = require('express')
const router = express.Router()
const home = require('./modules/home')
const users = require('./modules/users')
const { authenticator } = require('../middleware/auth')
// const authenticator = require('../middleware/auth').authenticator

router.use('/users', users)
router.use('/', authenticator, home)
// router.use('/users', users)
// router.use('/', home)

module.exports = router