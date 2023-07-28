const mongoose = require('mongoose');
const articleSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique:true
    },
    content:{
       type:String,
       required:true,
       unique:true
   },
    is_premium:{
        type:Boolean,
       default:false
    }
  
},{timestamps:true});
module.exports = mongoose.model('Article', articleSchema)