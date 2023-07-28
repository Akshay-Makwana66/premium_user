const userModel = require('../models/usermodel');
const articleModel = require('../models/articlemodel')
const mongoose = require('mongoose');
const commentValidations = async (req,res,next)=>{
    try{
        let data = req.body;
        let { articleId,comment} = data;
        if(Object.keys(data).length==0) return res.status(400).send({status: false, msg: " Request body can not be empty"})
        // articleId Validations--------
        if(!articleId) return res.status(400).send({ status: false, msg: "Please Enter articleId" });
        if(!mongoose.isValidObjectId(articleId)) return res.status(400).send({ status: false, msg: "Please Enter articleId as a valid objectId" });
        if (typeof articleId !== "string") return res.status(400).send({ status: false, msg: " Please enter articleId as a String" });
        data.articleId = articleId.trim();
        let checkArticleId = await articleModel.findOne({_id:articleId});
        if(!checkArticleId) return res.status(400).send({ status: false, msg: "Enter articleId is not valid" });

        // comment Validations-----------
        if(!comment) return res.status(400).send({ status: false, msg: "Please Enter comment" });
        if (typeof comment !== "string") return res.status(400).send({ status: false, msg: " Please enter comment as a String" });
        let validComment = /^\d*[a-zA-Z][a-zA-Z\d\s]*$/; // /^[a-zA-Z0-9\s\S]+$/
        data.comment = comment.trim();
        if (!validComment.test(comment)) return res.status(400).send({ status: false, msg: "The comment may contain only letters,numbers, and symbol" });
        

        next();
    }catch(err){
        res.status(500).send({status: false,message: `Sorry for the inconvenience caused`,Error : err.message})
    }
}


module.exports = {commentValidations}