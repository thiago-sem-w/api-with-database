'use strict'

const { model, Schema } = require('mongoose')

const BookSchema = new Schema({
  title: String
})

module.exports = model('books', BookSchema)
