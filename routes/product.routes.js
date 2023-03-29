const express = require('express')
const router = express.Router()

const productController = require("../controllers/product.controller")

router.get('/findAll', productController.findAll)
router.get('/findOne/:product', productController.findOne)

router.post('/create', productController.create)
router.patch('/update', productController.update)

router.delete('/delete/:product', productController.delete)

module.exports = router