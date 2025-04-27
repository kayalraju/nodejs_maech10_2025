const  fs = require('fs');
const CsvModel=require('../model/csvModel');
const HttpStatusCode = require('../helper/StatusCode');
const csv=require('csvtojson');
const { totalmem } = require('os');



class  CsvController {

async csv(req,res){
    try{
        const userData=[]
        csv()
        .fromFile(req.file.path)
        .then(async(response)=>{
            for(let i=0; i< response.length; i++){
               userData.push({
                name:response[i].name,
                email:response[i].email,
                mobile:response[i].mobile
               })
            }
           const result= await CsvModel.insertMany(userData)
           return res.status(HttpStatusCode.CREATED).json({
                message: 'success',
                data:result
            })

        })

    }catch(err){
       return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            message: err.message
        })
    }
}

async csvall(req,res){
    try{
        const result=await CsvModel.find()
        return res.status(HttpStatusCode.OK).json({
            message: 'success',
            total:result.length,
            data:result
        })
    }catch(err){
        return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            message: err.message
        })
    }


}
}

module.exports =new CsvController();