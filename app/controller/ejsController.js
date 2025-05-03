
const Student = require('../model/student')
const fs=require('fs')


class EjsController {

    async listStudent(req, res) {
       const data=await Student.find()
        try {
            res.render('studentlist', {
                title: 'Student List',
                data: data
            })

        } catch (error) {
        console.log(error);
        }

    }
    async addStudent(req, res) {
       
        try {
            res.render('addstudent', {
                title: 'Student List',
            })

        } catch (error) {
        console.log(error);
        }

    }
    async createStudent(req, res) {
       
        try {
            const { name, email, phone, city } = req.body

            const studentobj = new Student({
                name, email, phone, city
            })
            if(req.file){
                studentobj.image=req.file.path
            }

            const data = await studentobj.save()
           if(data){
            res.redirect('/student/list')
           }
        } catch (error) {
        console.log(error);
        }

    }


    async editStudent(req, res) {
       
        try {
            res.render('editstudent', {
                title: 'Student List',
            })

        } catch (error) {
        console.log(error);
        }

    }

}

module.exports = new EjsController();  