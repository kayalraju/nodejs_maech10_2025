const express = require('express');
const HomeController = require('../controller/HomeController');
const router = express.Router();



router.get('/', HomeController.homepage )
router.get('/about', HomeController.aboutpage )


module.exports = router;