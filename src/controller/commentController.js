const commentModel = require('../models/commentmodel');
const mongoose = require('mongoose');
const usermodel = require('../models/usermodel');
const createComment = async (req,res)=>{
    try{
        let data = req.body;
        let { articleId,comment} = data;
        data.userId =req.userId;
        let savedData = await commentModel.create(data);
        // let user = await commentModel.findOne({userId:req.userId}).populate("userId","name")
        const user = await usermodel.findById(req.userId).select('name');
        res.status(201).send({status:true, data: { comment: savedData, user }, message:`Your comment on an article  Is Added`})
    }catch(err){
        console.log(err);
        res.status(500).send({status: false,message: `Sorry for the inconvenience caused`,Error : err.message})
    }
}


module.exports = {createComment};