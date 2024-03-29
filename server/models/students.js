const mongoose=require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator=require('mongoose-unique-validator');

let studentSchema=new Schema({
    idno: {
        type: String,
        unique: true,
        required: true,
    },
    name: {
        type: String,
        required: true
    },
    dept: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
},
{
    collection: 'students',
});

studentSchema.plugin(uniqueValidator,{
    message: 'Roll number already exists'
});
module.exports=mongoose.model('Student',studentSchema);