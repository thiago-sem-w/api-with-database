'use strict'

const Books = require('../models/books')

async function all (req, res) {
	const books = await Books.find()
	res.json({ books })
}

module.exports = { all }
