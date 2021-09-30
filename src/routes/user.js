const express = require('express')
const userController = require('../controllers/userController')

const router = express.Router()

router.get('/', userController.home)
router.post('/signup', userController.register)
router.post('/signin', userController.login)
//router.get('*', userController.error)

module.exports = router