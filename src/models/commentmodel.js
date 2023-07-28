const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId
const commentSchema = new mongoose.Schema({
    userId: {
        type: ObjectId, 
        required: true, 
        ref: 'User' 
    },
    articleId: {
        type: ObjectId, 
        required: true, 
        ref: 'Article' 
    },
    comment:{
        type:String,
        required:true
    }

},{timestamps:true});
module.exports= mongoose.model('Comment',commentSchema)