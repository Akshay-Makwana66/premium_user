const userModel = require("../models/usermodel");

const userValidations = async function (req, res, next) {
  try {
    let data = req.body;
    let {name , number, email, password} = data;
    // Checks whether body is empty or not
    if (Object.keys(data).length == 0) return res.status(400).send({ status: false, msg: " Request Body cannot be empty" });

    // Name Validations------------
    if (!name) return res.status(400).send({ status: false, msg: "Please enter name" });
    if (typeof name !== "string") return res.status(400).send({ status: false, msg: " Please enter name as a String" });
    let validName =  /^\w[a-zA-Z. ]*$/;
    data.name = name.trim();
    if (!validName.test(name)) return res.status(400).send({ status: false, msg: "The name may contain only letters" });

    //  Number validations-------------
    if (!number) return res.status(400).send({ status: false, msg: "Please Enter number" });
    if (typeof number !== "string") return res.status(400).send({ status: false, msg: " Please enter only number  of 10 digits & put in string" });
    let validNumber = /^[6-9]\d{9}$/;
    if (!validNumber.test(number)) return res.status(400).send({ status: false, msg: "The user number should be indian may contain only 10 number" });
    let duplicateNumber = await userModel.find({ number: number });
    if (duplicateNumber.length !== 0) return res.status(400).send({ status: false, msg: `This ${number} is already registered` });

    // Email validations----------
    if (!email) return res.status(400).send({ status: false, msg: "Please enter E-mail" });
    if (typeof email !== "string") return res.status(400).send({ status: false, msg: "Please enter email as a String" });
    if (!/^([0-9a-z]([-_\\.]*[0-9a-z]+)*)@([a-z]([-_\\.]*[a-z]+)*)[\\.]([a-z]{2,9})+$/.test(email))return res.status(400).send({ status: false, msg: "Entered email is invalid format" });
    let duplicateEmail = await userModel.find({ email: email });
    if (duplicateEmail.length !== 0) return res.status(400).send({ status: false, msg: `${email} already exists` });
    
    // Password Validations----------
    if (!password) return res.status(400).send({ status: false, msg: "Please enter Password" });
    if (typeof password !== "string") return res.status(400).send({ status: false, msg: " Please enter password as a String" });
    let validPassword =/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,20}$/;
    if (!validPassword.test(password)) return res.status(400).send({status: false,msg: "Please enter min 8 letter password, with at least a symbol, upper and lower case letters and a number"});
   
    next();
    
  } catch (err){    
    res.status(500).send({ status: false,message: `Sorry for the inconvenience caused`, msg: err.message });
  }
};

const loginValidations = async function (req, res, next) {
    try {
      let data = req.body;
      let {number, email, password} = data;
      // Checks whether body is empty or not
      if (Object.keys(data).length == 0) return res.status(400).send({ status: false, msg: " Request Body cannot be empty" });
  
      //  Number validations-------------
      if(number){
        if (typeof number !== "string") return res.status(400).send({ status: false, msg: " Please enter only number  of 10 digits & put in string" });
      }
     
      // Email validations----------
      if(email){
        if (typeof email !== "string") return res.status(400).send({ status: false, msg: "Please enter email as a String" });
      }

      // Password Validations----------
      if (!password) return res.status(400).send({ status: false, msg: "Please enter Password" });
      if (typeof password !== "string") return res.status(400).send({ status: false, msg: " Please enter password as a String" });
     
      next();
      
    } catch (err){    
        console.log(err);
      res.status(500).send({ status: false,message: `Sorry for the inconvenience caused`, msg: err.message });
    }
  };

  const updateValidations = async function (req, res, next) {
    try {
      let data = req.body;
      let {name , number, email, password} = data;
      // Checks whether body is empty or not
      if (Object.keys(data).length == 0) return res.status(400).send({ status: false, msg: " Request Body cannot be empty" });
  
      // Name Validations------------
      if (name){
          if (typeof name !== "string") return res.status(400).send({ status: false, msg: " Please enter name as a String" });
          let validName = /^\w[a-zA-Z. ]*$/;
          data.name = name.trim();
          if (!validName.test(name)) return res.status(400).send({ status: false, msg: "The name may contain only letters" });    
      }

      //  Number validations-------------
      if (number){
          if (typeof number !== "string") return res.status(400).send({ status: false, msg: " Please enter only number  of 10 digits & put in string" });
          let validNumber = /^[6-9]\d{9}$/;
          if (!validNumber.test(number)) return res.status(400).send({ status: false, msg: "The user number should be indian may contain only 10 number" });
          let duplicateNumber = await userModel.find({ number: number });
          if (duplicateNumber.length !== 0) return res.status(400).send({ status: false, msg: `This ${number} is already registered` });
      }

      // Email validations----------
      if (email){
          if (typeof email !== "string") return res.status(400).send({ status: false, msg: "Please enter email as a String" });
          if (!/^([0-9a-z]([-_\\.]*[0-9a-z]+)*)@([a-z]([-_\\.]*[a-z]+)*)[\\.]([a-z]{2,9})+$/.test(email))return res.status(400).send({ status: false, msg: "Entered email is invalid format" });
          let duplicateEmail = await userModel.find({ email: email });
          if (duplicateEmail.length !== 0) return res.status(400).send({ status: false, msg: `${email} already exists` });
       }

      // Password Validations----------
      if (password){
          if (typeof password !== "string") return res.status(400).send({ status: false, msg: " Please enter password as a String" });
          let validPassword =/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,20}$/;
          if (!validPassword.test(password)) return res.status(400).send({status: false,msg: "Please enter min 8 letter password, with at least a symbol, upper and lower case letters and a number"});
        }
        
      next();
      
    } catch (err){    
      res.status(500).send({ status: false,message: `Sorry for the inconvenience caused`, msg: err.message });
    }
  };
  
module.exports = { userValidations ,loginValidations,updateValidations};