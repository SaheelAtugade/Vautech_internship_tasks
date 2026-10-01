const express = require('express')
const authRouter = express.Router()
const authController = require('../controllers/auth.controller')
const authUser = require('../middleware/auth.middleware')

//POST = /api/auth/register
authRouter.post('/register', authController.registerController)

//POST = /api/auth/login
authRouter.post('/login', authController.loginController)

//GET = /api/auth/get-me
authRouter.get('/get-me', authUser, authController.getMeController)

//POST = /api/auth/logout
authRouter.post('/logout', authController.logoutController)

module.exports = authRouter