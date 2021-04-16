const mongoose=require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator=require('mongoose-unique-validator');
const Validator = require('validator');
const isEmpty = require('./is-empty');

let courseSchema =new Schema({
    _id:{
        type: String,
        unique: true,
        required: true,
    },
    courseName:{
        type: String,
        // unique: true,
        required: true,
    },

    courseCode:{
        type: String,
        // unique: true,
        required: true,

    },
    isApproved:{
        type: String,
        // unique: true,
        required: true,

    },

    offeringFaculty:{
        type:String,
        unique:false,
        required: true,
    }

},
{
    collection:'courses_offered',
   
});

courseSchema.plugin(uniqueValidator,{
    
    message:'course already exists'
});
module.exports=mongoose.model('course',courseSchema);