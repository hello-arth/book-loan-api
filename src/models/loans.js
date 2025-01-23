const HttpError = require('../errors/HttpError')
const { takeBook, returnBook } = require('./books')
const uuid = require('uuid').v4
let loans = []

module.exports = {
  getAllLoans: () => {
    return loans
  },

  getLoanById: (loanId) => {
    const loan = loans.find(loan => loan.id === loanId)
    if (!loan) throw new HttpError(404, 'Loan not found')
    return loan
  },

  getLoanByUser: (userId) => {
    const loan = loans.find(loan => loan.userId === userId)
    if (!loan) throw new HttpError(404, 'Loan not found')
    return loan
  },

  createLoan: (userId, book) => {
    if (book.inStock < 1) throw new HttpError(409, 'There are no more copies available')
    const today = new Date()
    const returnDate = new Date()
    returnDate.setDate(today.getDate() + 14)
    
    const newLoan = {
      id: uuid(),
      userId,
      bookId: book.id,
      loanDate: today,
      returnDate: returnDate,
      isReturned: false,
      isLate: false
    }

    loans.push(newLoan)
    takeBook(book.id)

    return newLoan
  },

  returnLoan: (userId, loanId) => {
    const loanIndex = loans.findIndex(loan => loan.userId === userId && loan.id === loanId)
    if(loanIndex === -1) throw new HttpError(404, 'Loan not found')
    
    const loan = loans[loanIndex]
    if(loan.isReturned) return null

    loan.isReturned = true

    const today = new Date()
    const limitDate = new Date(loan.returnDate)
    loan.isLate = today > limitDate
    loan.returnDate = today

    returnBook(loan.bookId)
    return loan
  }
}