const mongoose = require('mongoose');



const csvSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    
},{
    timestamps: true
}); 

const csvModel = mongoose.model('csv', csvSchema);
module.exports = csvModel;