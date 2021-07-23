const config = require('config');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const bcrypt = require('bcrypt');
const{User} = require('../models/users');
const expresss = require('express');
const router = expresss.Router();
//const {checkToken} = require('../token/token_validation');
require('dotenv').config()



router.post( '/',async (req,res) => {
    const{error} = validate(req.body);
    if(error) {
        return res.status(400).json({status:400,message:error.details[0].message});
    }
    let user =  await User.findOne({email:req.body.email});
    if(!user) {
        return res.status(400).json({status:400,message:"Incorrect email "});
    }
    const validpassword =  await bcrypt.compare(req.body.password,user.password);
    if(!validpassword) {
        return res.status(400).json({status:400,message:"Incorrect password"});
    }
    
    
    const accessToken = jwt.sign({_id:user._id}, process.env.ACCESS_TOKEN_SECRET);
    let op = {accessToken :accessToken,success:1,message:"loggin successfully"};
    if(!op) return res.status(400).json({status:400,message:"error"})
    res.send(op);
    console.log(op);
    
});
  

    function validate(req) {
        const schema = Joi.object().keys({
          email : Joi.string().required(), 
          password :Joi.string().min(5).max(1024).required(),
             
           
        });
        return schema.validate(req);
          
      }
      
module.exports = router;