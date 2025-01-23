require('dotenv').config()
const express = require('express')
const authRouter = require('./routes/auth-router')
const apiRouter = require('./routes/api-router')
const errorMiddleware = require('./middlewares/error-middleware')
const cookieParser = require('cookie-parser')

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(cookieParser());

app.use('/auth', authRouter)
app.use('/api', apiRouter)

app.use(errorMiddleware)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => console.log(`Server initialized and running on http://localhost:${PORT}`))