const mongoose=require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator=require('mongoose-unique-validator');

let chairSchema=new Schema({
    idno: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
},
{
    collection: 'chairpersons',
});

chairSchema.plugin(uniqueValidator,{
    message: 'ID already exists'
});
module.exports=mongoose.model('Chairperson',chairSchema);