const multer = require('multer');   
const path =require('path');
const fs = require('fs');


const File_type={
    'image/png':'png',
    'image/jpg':'jpg',
    'image/jpeg':'jpeg',
}

const storage=multer.diskStorage({
    destination:function(req,file,cb){
        const isValid = File_type[file.mimetype];
        let errorimage= new Error('invalid image type');
        if(isValid){
            errorimage=null;
        }
        cb(errorimage,'uploads');
        
    },
    filename:function(req,file,cb){
        const fileName=file.originalname.toLowerCase().split(' ').join('-');
        const extention=File_type[file.mimetype];
        cb(null,fileName+'-'+Date.now()+'.'+extention);
       
    }
});

const studentimageUpload=multer({storage:storage});
module.exports=studentimageUpload;