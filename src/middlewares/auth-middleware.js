const { getUserById } = require('../models/users')
const jwt = require('jsonwebtoken')

const secret = process.env.JWT_SECRET

module.exports = {
  optionalAuth: (req, res, next) => {
    const token = req.cookies.token
    if (!token) {
      next()
    } else {

      try {
        const { userId } = jwt.verify(token, secret)
        const user = getUserById(userId)

        req.authenticatedUser = { userId, email: user.email, name: user.name, role: user.role }
        next()
      } catch (error) {
        return res.status(401).json({ message: 'Invalid token' })
      }
    }
  },

  ensureAuth: (req, res, next) => {
    const token = req.cookies.token

    if (!token) {
      return res.status(401).json({ message: 'Authorization header required' })
    } 

    try {
      const { userId } = jwt.verify(token, secret)

      const user = getUserById(userId)
      
      req.authenticatedUser = {
        userId: userId,
        email: user.email,
        name: user.name,
        role: user.role
      }
      next()

    } catch {
      return res.status(401).json({ message: 'Invalid token' })
    }
  },

  ensureAdmin: (req, res, next) => {
    const { role } = req.authenticatedUser
    if (role !== 'admin') {
      return res.status(401).json({ message: 'Permission denied' })
    } else {
      next()
    }
  }
}