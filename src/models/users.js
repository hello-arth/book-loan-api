const HttpError = require('../errors/HttpError')
const bcrypt = require('bcrypt')
const uuid = require('uuid').v4

let users = [
  {
    id: '1',
    name: 'John Doe',
    email: 'johndoe@email.com',
    password: bcrypt.hashSync('12345', 10),
    createdAt: new Date(),
    role: 'admin'
  }
]

module.exports = {
  getAllUsers: () => {
    return users
  },

  getUserById: (id) => {
    const userIndex = users.findIndex(user => user.id === id)
    if(userIndex === -1) throw new HttpError(404, 'User not found')
    return users[userIndex]
  },

  getUserByEmail: (email) => {
    const userIndex = users.findIndex(user => user.email === email)
    if(userIndex === -1) throw new HttpError(404, 'User not found')
    return users[userIndex]
  },

  registerUser: (name, email, password) => {
    const userExists = users.find(user => user.email === email)
    if (userExists) throw new HttpError(409, 'Email already in use')
    const newUser = {
      id: uuid(),
      name,
      email,
      password: bcrypt.hashSync(password, 10),
      createdAt: new Date(),
      role: 'standard'
    }
    users.push(newUser)
    return newUser
  }
}