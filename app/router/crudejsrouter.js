
const express = require('express'); 

const studentimageUpload = require('../helper/studentImage');
const ejsController = require('../controller/ejsController');
const router = express.Router();


 


router.get('/student/list',ejsController.listStudent)
router.get('/student/add',ejsController.addStudent)
router.post('/student/create',studentimageUpload.single('image'),ejsController.createStudent)
router.get('/student/edit/:id',ejsController.editStudent)


module.exports = router;