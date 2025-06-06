const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const StudentSchema=new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    city:{
        type: String,
        required: true
    },
    image:{
        type: String,
        required: true
    },
    Is_delete:{
        type: Boolean,
        default: false
    },
    slug:{
        type: String,
        required: true
    }
});

const StudentModel=mongoose.model('student',StudentSchema);

module.exports=StudentModel;