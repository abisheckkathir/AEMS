const mongoose=require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator=require('mongoose-unique-validator');
const Validator = require('validator');

let assignSchema =new Schema({
    _id:{
        type: String,
        unique: true,
        required: true,
    },
    courseCode:{
        type: String,
        unique: false,
        required: true,

    },
    isApproved:{
        type: String,
        unique: false,
        required: true,

    },

    studentID:{
        type:String,
        unique:false,
        required: true,
    }

},
{
    collection:'assigned_courses',
   
});

assignSchema.plugin(uniqueValidator,{
    
    message:'course already exists'
});
module.exports=mongoose.model('assign',assignSchema);