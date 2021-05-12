const mongoose=require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator=require('mongoose-unique-validator');
const Validator = require('validator');

let utilsSchema =new Schema({
    utilKey:{
        type: String,
        unique: true,
        required: true,

    },
    utilValue:{
        type: String,
        unique: false,
        required: true,

    }
},
{
    collection:'utils',
   
});

utilsSchema.plugin(uniqueValidator,{
    
    message:'course already exists'
});
module.exports=mongoose.model('utils',utilsSchema);