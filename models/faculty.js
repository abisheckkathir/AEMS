const mongoose=require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator=require('mongoose-unique-validator');

let facultySchema=new Schema({
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
    collection: 'faculty',
});

facultySchema.plugin(uniqueValidator,{
    message: 'ID already exists'
});
module.exports=mongoose.model('Faculty',facultySchema);