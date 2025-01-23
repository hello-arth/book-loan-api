const HttpError = require('../errors/HttpError')
const { registerUser, getUserByEmail, getAllUsers } = require('../models/users')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const secret = process.env.JWT_SECRET

module.exports = {

  // GET /auth
  index: (req, res) => {
    const users = getAllUsers()
    res.json({ users })
  },

  // POST /auth/register
  register: (req, res) => {
    const { name, email, password } = req.body
    if (
      typeof email !== 'string' ||
      !email.includes('@') ||
      typeof name !== 'string' ||
      typeof password !== 'string' ||
      password.length < 3
    ) {
      throw new HttpError(400, 'Bad request')
    }
    
    const newUser = registerUser(name, email, password)
    res.status(201).json(newUser)
  },

  // POST /auth/login
  login: (req, res) => {
    const { email, password } = req.body
    if (
      typeof email !== 'string' ||
      !email.includes('@') ||
      typeof password !== 'string'
    ) {
      throw new HttpError(400, 'Bad request')
    }

    const user = getUserByEmail(email)
    const validPassword = bcrypt.compareSync(password, user.password)
    if (!validPassword) throw new HttpError(401, 'Invalid credentials')
    
    const payload = { userId: user.id }
    const options = { expiresIn: '25m' }
    const jwtToken = jwt.sign(payload, secret, options)

    res.cookie('token', jwtToken, {
        httpOnly: true,
        secure: false,
        maxAge: 1 * 60 * 60 * 1000
      }
    )  // maxAge 1h
    res.send('Succesful login')
  }
}