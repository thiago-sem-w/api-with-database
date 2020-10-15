'use strict'

require('dotenv').config()

const express = require('express')
const compression = require('compression')
const helmet = require('helmet')
const cors = require('cors')
const morgan = require('morgan')
const mongoose = require('mongoose')

const databaseConfig = require('../config/database')
const booksRoutes = require('./routes/books')

const app = express()

app.set('port', process.env.PORT || 5000)

// middlewares
app.use(compression())
app.use(helmet())
app.use(cors())
app.use(express.json())
if (app.get('env') === 'development') {
	app.use(morgan('dev'))
}

mongoose.connect(databaseConfig.uri, databaseConfig.settings)
	.then(() => console.log('DATABASE ON'))
mongoose.connection.on('error', console.log)

app.use('/books', booksRoutes)

// catch all
app.use('*', async (req, res, next) => {
	res.status(404)
	next(new Error('ERROR!!!'))
})

// error handler
app.use(async (err, req, res, next) => {
	const statusCode = res.statusCode
	res
		.status(statusCode)
		.json({ error: err.message })
})

module.exports = app
