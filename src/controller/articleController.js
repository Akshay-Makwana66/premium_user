const articleModel = require('../models/articlemodel');
const jwt = require('jsonwebtoken');
const usermodel = require('../models/usermodel');
const mongoose = require("mongoose");
const createArticle = async (req,res)=>{
    try{
        let data = req.body;
        let {title, content} = data;
        let savedData = await articleModel.create(data);
        
        res.status(201).send({status:true,data:savedData, message:`Your Article Is Created Successfully`})
    }catch(err){
        res.status(500).send({status: false,message: `Sorry for the inconvenience caused`,Error : err.message})
    }
}

const getArticleById = async (req,res)=>{
    try{
        let  articleId = req.params.id;
        if (!mongoose.isValidObjectId(articleId)) return res.status(400).send({ status: false, message: " pls entered valid objectId"});
        let savedData = await articleModel.findOne({_id:articleId});
        if(!savedData) return res.status(404).send({status:false, message: ' Article not found , write correct article id'})
        if(!savedData.is_premium) {
            return res.status(200).send({status:true,message:`This is your article`,data:savedData})
        } else {
            let token = req.headers['x-api-key'];
            if(token){
                jwt.verify(token,"premium-user",(error,decoded)=>{           
                    if(error){
                        const message =
                        error.message ==="jwt expired"
                        ? "Token is expired"
                        : "Token is invalid"   
                        return res.status(401).send({ status: false, message});
                    }else{
                        req.userId = decoded.userId;
                    }        
                    });
                let checkUserId = await usermodel.findOne({_id:req.userId});
                if(checkUserId.is_premium_user){
                    return res.status(200).send({status:true, message:'This is your all article', data:savedData})
                }else{
                    return   res.status(400).send({status:false, message : `It is premium article`});
                }
            }             
        } 
        return   res.status(400).send({status:false, message : `It is premium article`});   
    }catch(err){
        res.status(500).send({status: false,message: `Sorry for the inconvenience caused`,Error : err.message})
    }
}

const getAllArticles = async (req,res)=>{
    try{ 

        let savedData = await articleModel.find({is_premium:false});        
        if(!savedData) return res.status(404).send({status:false, message: 'Article not found'});
        let token = req.headers['x-api-key'];
        
        if(!token){
        return res.status(200).send({status:true,message:`This is your article list`,data:savedData})
        }
        let savedAllArticle = await articleModel.find();
        if(token){
            jwt.verify(token,"premium-user",(error,decoded)=>{           
                if(error){
                    const message =
                    error.message ==="jwt expired"
                    ? "Token is expired"
                    : "Token is invalid"   
                    return res.status(401).send({ status: false, message});
                }else{
                    req.userId = decoded.userId;
                }           
                });
            let checkUserId = await usermodel.findOne({_id:req.userId});
            if(checkUserId.is_premium_user){
                return res.status(200).send({message:'This is your all article', data:savedAllArticle})
            }else{
                return res.status(200).send({status:true,message:`This is your article list`,data:savedData })
            }
        }    
       
    }catch(err){
        res.status(500).send({status: false,message: `Sorry for the inconvenience caused`,Error : err.message})
    }
}


module.exports = {createArticle,getArticleById,getAllArticles}