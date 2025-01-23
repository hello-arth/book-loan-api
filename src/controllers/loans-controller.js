const HttpError = require('../errors/HttpError')
const { getBookById } = require('../models/books')
const { getAllLoans, getLoanById, createLoan, returnLoan } = require('../models/loans')

module.exports = {

  // GET /api/loans
  index: (req, res) => {
    const loans = getAllLoans()
    res.json({ loans })
  },

  // GET api/loans/:loanId
  show: (req, res) => {
    const { loanId } = req.params
    const loan = getLoanById(loanId)
    res.json({ loan })
  },

  // POST /api/loans/:bookId
  save: (req, res) => {
    const { userId } = req.authenticatedUser
    const { bookId } = req.params
    const book = getBookById(bookId)
    const newLoan = createLoan(userId, book)
    res.status(201).json(newLoan)
  },

  // PUT /api/loans/:loanId/return
  return: (req, res) => {
    const { userId } = req.authenticatedUser
    const { loanId } = req.params
    const loan = returnLoan(userId, loanId)
    res.json(loan)
  }
}