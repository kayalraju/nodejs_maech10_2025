const express = require('express')
const AuthEjsController = require('../controller/AuthEjsController')
const AuthCheck = require('../middleware/AuthCheck')

const router = express.Router()


router.get('/register',AuthEjsController.registerview)
router.post('/register/create',AuthEjsController.registerCreate)
router.get('/login',AuthEjsController.loginview)
router.post('/login/create',AuthEjsController.loginCreate)

router.get('/dashboard',AuthCheck,AuthEjsController.checkAuth,AuthEjsController.dashboard)
router.get('/logout',AuthEjsController.logout)


module.exports = router