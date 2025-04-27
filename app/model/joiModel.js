const mongoose = require('mongoose');
const Joi = require('joi');


const JoiSchemaValidation=Joi.object({
    name: Joi.string()
        .min(3)
        .max(30)
        .required(),
    email: Joi.string().required()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'in'] } }),
    city: Joi.string().required().min(3).max(30),
})


const csvSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    
},{
    timestamps: true
}); 

const JoiModel = mongoose.model('joi', csvSchema);
module.exports = {JoiSchemaValidation,JoiModel};