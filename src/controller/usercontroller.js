const userModel = require('../models/usermodel');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const saltRounds = 10;
const mongoose = require('mongoose')

const signupPage = async (req,res)=>{
    try{
        let data = req.body;
        let {name , number, email, password} = data;
            data.password = await bcrypt.hash(password,saltRounds);
        let savedData = await userModel.create(data);
        res.status(201).send({status:true,data:savedData, message:`${name} Your Registration Is Successfully Done`})
    }catch(err){
        res.status(500).send({ status: false,message: `Sorry for the inconvenience caused`, msg: err.message})
    }
}
const loginPage = async (req,res)=>{
    try{
        let data = req.body;
        let {email,number,password} = data;
        let checkCredentials;
        if(email){
            checkCredentials = await userModel.findOne({email:email});
            if(!checkCredentials) {
                return res.status(401).send({message:"your email-id is not correct"});
            }

        } else{
            if(number){
                checkCredentials = await userModel.findOne({number:number})
                if(!checkCredentials) {
                    return res.status(401).send({message:"your number is not correct"});
                }
            }
        }
            let decryptPassword =  await bcrypt.compare(password,checkCredentials.password)
            if(!decryptPassword){
             return res.status(401).send({message:"your password is not correct"});
            }else{
             let token = jwt.sign({
                 userId: checkCredentials._id.toString(),
                 iat: Math.floor(Date.now()/1000),
                 exp: Math.floor(Date.now()/1000)+ 1000000    
             },'premium-user')
             res.status(201).send({status:true,token:token,message:`You are Successfully loggedIn with this id:${checkCredentials._id}, ThankYou`})
        }

    }catch(err){
        res.status(500).send({ status: false,message: `Sorry for the inconvenience caused`, msg: err.message})
    }
};

const editUser = async (req,res)=>{
        try{
            let data = req.body;
            let {name ,number, email,password } = data;           
            let editUser = await userModel.findOneAndUpdate({_id:req.userId,isDeleted:false},data,{new:true})
            if(!editUser) return res.status(404).send({status:false,message:"No user found"})
            res.status(201).send({status:true,updatedData:editUser, message: `your profile is Successfully updated`})
        }catch(err){
            res.status(500).send({ status: false,message: `Sorry for the inconvenience caused`, msg: err.message})
        }
}

const deleteUser = async(req,res)=>{
        try{ 
            let deleteUser = await userModel.findOneAndUpdate({_id:req.userId,isDeleted:false},{$set:{isDeleted:true}})
            if(!deleteUser) return res.status(404).send({status:false, message:"No user found"})
            else return res.status(200).send({status:true,message: `your account is deleted`})
        }catch(err){
            res.status(500).send({ status: false,message: `Sorry for the inconvenience caused`, msg: err.message})
        }
}

const createPremiumUser = async (req,res)=>{
    try{        
        let updatePremiumStatus = await userModel.findOneAndUpdate({_id:req.userId,isDeleted:false},{$set:{is_premium_user:true}},{new:true});
        if(!updatePremiumStatus) return res.status(404).send({status:false, message:"No user found"})
        else return res.status(201).send({status:true,data:updatePremiumStatus, message:`Now you're become premium user`})
    }catch(err){
        res.status(500).send({ status: false,message: `Sorry for the inconvenience caused`, msg: err.message})
    }
}

module.exports = {signupPage,loginPage,editUser,deleteUser,createPremiumUser}