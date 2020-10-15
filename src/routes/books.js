'use strict'

const { Router } = require('express')

const ash = require('express-async-handler')

const controller = require('../controllers/books')

const router = Router()

router.route('/')
	.get(controller.all)

module.exports = router
