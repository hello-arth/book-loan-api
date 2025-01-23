const HttpError = require('../errors/HttpError')
const { getAllBooks, getBookById, saveBook, deleteBook } = require('../models/books')

module.exports = {

  // GET /api/books
  index: (req, res) => {
    const name = req.authenticatedUser?.name
    const username = name ?? 'guest'
    const books = getAllBooks()
    return res.json({ message: `Welcome, ${username}!`, books })
  },

  // GET /api/books/:bookId
  show: (req, res) => {
    const { bookId } = req.params
    const book = getBookById(bookId)
    res.json(book)
  },

  // POST /api/books
  save: (req, res) => {
    const { name, author, quantity } = req.body
    if (!name || !author) throw new HttpError(400, 'Bad request')
    
    // Verificar se quantity é um número, se é inteiro e maior que zero
    const parsedQuantity = +quantity
    if (isNaN(parsedQuantity) || !Number.isInteger(parsedQuantity) || parsedQuantity < 1) {
      throw new HttpError(400, 'Quantity must be an integer greater than zero');
    }
    
    const newBook = saveBook(name, author, parsedQuantity)
    res.status(201).json(newBook)
  },

  // DELETE /api/books/:bookId
  delete: (req, res) => {
    const { bookId } = req.params
    if (!bookId) throw new HttpError(400, 'Bad request')

    const bookDeleted = deleteBook(bookId)
    res.status(201).json(bookDeleted)
  }
}