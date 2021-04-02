const mongoose=require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator=require('mongoose-unique-validator');
const Validator = require('validator');
const isEmpty = require('./is-empty');

let courseSchema =new Schema({
    courseName:{
        type: String,
        unique: true,
        required: true,
    },

    courseCode:{
        type: String,
        unique: true,
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
module.exports=mongoose.module('course',courseSchema);