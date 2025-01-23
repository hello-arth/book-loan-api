const express = require('express')
const authController = require('../controllers/auth-controller')
const { ensureAuth, ensureAdmin } = require('../middlewares/auth-middleware')

const authRouter = express.Router()

authRouter.get('/', ensureAuth, ensureAdmin, authController.index)
authRouter.post('/register', authController.register)
authRouter.post('/login', authController.login)

module.exports = authRouter