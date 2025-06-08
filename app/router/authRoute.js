const express = require('express')
const AuthController = require('../controller/AuthController')
const { AuthCheck } = require('../middleware/Auth')
const router = express.Router()


router.post('/register',AuthController.register)
router.post('/login',AuthController.login)
router.post('/otp/verifyed',AuthController.verifyedotp)
router.post('/reset-password-link',AuthController.resetPasswordLink);
router.post('/reset-password/:id/:token',AuthController.resetPassword);


router.use(AuthCheck)
router.get('/dashboard',AuthController.dashboard)
router.get('/profile',AuthController.profile)
router.post('/update/password',AuthController.updatePassword)





module.exports = router