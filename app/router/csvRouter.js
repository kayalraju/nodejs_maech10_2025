const express = require('express');
const CsvController = require('../controller/CsvController');
const router = express.Router();
const multer=require('multer');
const bodyparser=require('body-parser')
router.use(bodyparser.urlencoded({extended:true}));
router.use(bodyparser.json());
const path=require('path');
const fs=require('fs');
const storage=multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname,'../../public/csvuploads'),function(error,success){
            if(error) throw error;
        })
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

const csvUpload=multer({storage:storage})   



router.post('/csv',csvUpload.single('file'),CsvController.csv)
router.get('/all',CsvController.csvall)




module.exports = router;