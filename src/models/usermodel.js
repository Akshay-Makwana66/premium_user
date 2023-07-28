const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    number:{
       type:String,
       required:true,
       unique:true
   },
    email:{
        type:String,
        required:true,
        unique:true
    },
     password:{
        type:String,
        required:true
    },
    is_premium_user:{
        type:Boolean,
       default:false
    },
    isDeleted:{
        type:Boolean,
        default:false
    }
  
},{timestamps:true});
module.exports = mongoose.model('User', userSchema)