const express = require('express')
const AuthEjsController = require('../controller/AuthEjsController')
const AuthCheck = require('../middleware/AuthCheck')
const adminAuthCheck = require('../middleware/adminAuthCheck')

const router = express.Router()

//user
router.get('/register',AuthEjsController.registerview)
router.post('/register/create',AuthEjsController.registerCreate)
router.get('/login',AuthEjsController.loginview)
router.post('/login/create',AuthEjsController.loginCreate)

router.get('/dashboard',AuthCheck,AuthEjsController.checkAuth,AuthEjsController.dashboard)
router.get('/logout',AuthEjsController.logout)


//admin


router.get('/admin/login',AuthEjsController.adminlogin)
router.post('/admin/login/create',AuthEjsController.adminloginCreate)
router.get('/admin/dashboard',adminAuthCheck,AuthEjsController.checkAuthAdmin,AuthEjsController.admindashboard)
router.get('/admin/logout',AuthEjsController.adminlogout)

module.exports = router