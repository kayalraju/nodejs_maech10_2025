
const Student = require('../model/student')
const fs=require('fs')




class EjsController {

    async listStudent(req, res) {
       const data=await Student.find({Is_delete:false})
        try {
            const message=req.flash('success')
            res.render('studentlist', {
                title: 'Student List',
                data: data,
                message
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
            const dd="Student Added Successfully"
           if(data){
            req.flash('success',dd)
            res.redirect('/student/list')
           }else{
            req.flash('error','Something Went Wrong')
            res.redirect('/student/add')
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

    //hard delete
//     async deleteStudent(req, res) {

//         try {
//           const id=req.params.id
//             const data=await Student.findByIdAndDelete(id)
//             if(data){
//                 req.flash('success','Student Deleted Successfully')
//                 res.redirect('/student/list')
//             }else{
//                 res.redirect('/student/list')
//             }

//         } catch (error) {
//         console.log(error);
//         }

// }




//soft delete
async deleteStudent(req, res) {

        try {
          const id=req.params.id
            const data=await Student.findByIdAndUpdate(id,{Is_delete:true})
            if(data){
                req.flash('success','Student Deleted Successfully')
                res.redirect('/student/list')
            }else{
                res.redirect('/student/list')
            }

        } catch (error) {
        console.log(error);
        }

}
}

module.exports = new EjsController();  