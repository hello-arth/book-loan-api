const HttpError = require('../errors/HttpError')

module.exports = (error, req, res, next) => {
  if(error) {
    if (error instanceof HttpError) {
      return res.status(error.status).json({ message: error.message })
    } else {
      return res.status(400).json({ message: error.message })
    }
  } else {
    next()
  }
}