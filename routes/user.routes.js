const express = require('express')
const router = express.Router()

const userController = require("../controllers/user.controller")

router.get('/findAll', userController.findAll)
router.get('/findOne/:username', userController.findOne)

router.post('/create', userController.create)
router.patch('/update', userController.update)

router.delete('/delete/:username', userController.delete)

module.exports = router