const { log } = require('console')
const Student = require('../model/student')
const fs=require('fs')
const slug=require('slugify')

class StudentApiController {

    async craeteStudent(req, res) {
        log(req.file)
        try {
            const { name, email, phone, city } = req.body

            const studentobj = new Student({
                name, email, phone, city,
                slug:slug(name),
            })
            if(req.file){
                studentobj.image=req.file.path
            }

            const data = await studentobj.save()
            return res.status(200).json({
                message: "student created successfully",
                data: data
            })

        } catch (error) {
            return res.status(500).json({
                message: error.message
            })
        }

    }
    async getStudent(req, res) {
        try {
           
            const data=await Student.find()
            return res.status(200).json({
                message: "find student successfully",
                total:data.length,
                data: data
            })

        } catch (error) {
            return res.status(500).json({
                message: error.message
            })
        }

    }
    async editStudent(req, res) {
        try {
           const id=req.params.id
            const data=await Student.findById(id)
            return res.status(200).json({
                message: "get single student",
                data: data
            })

        } catch (error) {
            return res.status(500).json({
                message: error.message
            })
        }

    }
    
    async updateStudent(req, res) {
        try {
           const id=req.params.id
           const {name,email,phone,city}=req.body
            const data=await Student.findByIdAndUpdate(id,{name,email,phone,city})
            if(!data){
                return res.status(404).json({
                    message:"student not found"
                })
            }else{
                return res.status(200).json({
                    message:"student updated successfully",
                })
            }
            

        } catch (error) {
            return res.status(500).json({
                message: error.message
            })
        }

    }

    async deleteStudent(req, res) {
        try {
           const id=req.params.id
            const data=await Student.findByIdAndDelete(id)
            if(!data){
                return res.status(404).json({
                    message:"student not found"
                })
            }else{
                return res.status(200).json({
                    message:"student delete successfully",
                })
            }
            

        } catch (error) {
            return res.status(500).json({
                message: error.message
            })
        }

    }

}

module.exports = new StudentApiController();  