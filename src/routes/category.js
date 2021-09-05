const express = require('express')
const { adminMiddleware, requireSignIn } = require('../common-middleware')
const { createCategory,getCategories } = require('../controller/category')

const router = express.Router()

router.post('/category/create',requireSignIn,adminMiddleware, createCategory)
router.get('/category/getCategories',getCategories)
module.exports = router