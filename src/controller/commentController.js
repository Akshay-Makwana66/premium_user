const commentModel = require('../models/commentmodel');
const mongoose = require('mongoose');
const createComment = async (req,res)=>{
    try{
        let data = req.body;
        let { articleId,comment} = data;
        data.userId =req.userId;
        let savedData = await commentModel.create(data);
        res.status(201).send({status:true,data:savedData, message:`Your comment on an article  Is Added`})
    }catch(err){
        res.status(500).send({status: false,message: `Sorry for the inconvenience caused`,Error : err.message})
    }
}


module.exports = {createComment};