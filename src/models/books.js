const HttpError = require('../errors/HttpError')
const uuid = require('uuid').v4

let books = [
  {
    id: '1',
    name: 'A Máquina do Tempo',
    author: 'H.G. Wells',
    inStock: 10,
    createdAt: new Date(),
    updatedAt: new Date()
  }
]

module.exports = {
  getAllBooks: () => {
    return books
  },

  getBookById: (id) => {
    const bookIndex = books.findIndex(book => book.id === id)
    if(bookIndex === -1) throw new HttpError(404, 'Book not found')
    return books[bookIndex]
  },

  saveBook: (name, author, quantity) => {
    const bookExists = books.find(book => book.name === name)
    if(bookExists) throw new HttpError(401, 'This book is already registered')
    const newBook = {
      id: uuid(),
      name,
      author,
      inStock: quantity,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    books.push(newBook)
    return newBook
  },

  deleteBook: (id) => {
    const bookIndex = books.findIndex(book => book.id === id)
    if (bookIndex === -1) throw new HttpError(404, 'Book not found')
    const bookDeleted = books.splice(bookIndex, 1)
    return bookDeleted
  },

  takeBook: (bookId) => {
    const bookIndex = books.findIndex(book => book.id === bookId)
    if(bookIndex === -1) throw new HttpError(404, 'Book not found')
    books[bookIndex].inStock -= 1
  },

  returnBook: (bookId) => {
    const bookIndex = books.findIndex(book => book.id === bookId)
    if (bookIndex === -1) throw new HttpError(404, 'Book not found')
    books[bookIndex].inStock += 1
  } 
}