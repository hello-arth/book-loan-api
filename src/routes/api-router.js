const express = require('express')
const booksController = require('../controllers/books-controller')
const loansController = require('../controllers/loans-controller')
const { ensureAuth, ensureAdmin, optionalAuth } = require('../middlewares/auth-middleware')

const apiRouter = express.Router()

apiRouter.get('/books', optionalAuth, booksController.index)
apiRouter.get('/books/:bookId', optionalAuth, booksController.show)

apiRouter.post('/books', ensureAuth, ensureAdmin, booksController.save)
apiRouter.delete('/books/:bookId', ensureAuth, ensureAdmin, booksController.delete)

apiRouter.get('/loans', ensureAuth, ensureAdmin, loansController.index)
apiRouter.get('/loans/:loanId', ensureAuth, loansController.show)

apiRouter.post('/loans/:bookId', ensureAuth, loansController.save)
apiRouter.put('/loans/:loanId/return', ensureAuth, loansController.return)

module.exports = apiRouter