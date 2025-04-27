
const express = require('express'); 
const StudentApiController = require('../controller/StudentApiController');
const studentimageUpload = require('../helper/studentImage');
const router = express.Router();


router.post('/create/student',studentimageUpload.single('image'),StudentApiController.craeteStudent)
router.get('/student',StudentApiController.getStudent)
router.get('/student/edit/:id',StudentApiController.editStudent)
router.post('/student/update/:id',StudentApiController.updateStudent)
router.delete('/student/delete/:id',StudentApiController.deleteStudent)


module.exports = router;