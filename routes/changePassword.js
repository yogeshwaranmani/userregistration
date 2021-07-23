const Joi = require('joi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const{User} = require('../models/users');
const authenticateToken = require('../token/token_validation');
const expresss = require('express');
const router = expresss.Router();



router.put('/',authenticateToken,async(req,res) => {
    console.log("body",req.body)
    const{error} = validate(req.body);
    if(error) {
        
        return res.status(400).json({status:400,message:error.details[0].message});
    }
    let user =  await User.findOne({_id:req.body._id});
    if(!user) {
        
        console.log("incorrect id");
        return res.status(400).json({status:400,message:"Incorrect id "});
    }
    const validpassword =  await bcrypt.compare(req.body.password,user.password); 
    if(!validpassword) {
        console.log("password is innncorrect");
        return res.status(400).json({status:400,message:"Incorrect password"});
    }else {
        if(req.body.newPassword!=req.body.confirmPassword) {
            console.log("new password doesnt match with confirm password");
            return res.status(400).json({status:400,message:"new password dosenot match with confirm password"})
        }else{
            const salt = await bcrypt.genSalt(10);
           let newPassword = await bcrypt.hash(req.body.newPassword,salt);
            let update = await User.updateOne({_id:req.body._id},{password:newPassword});
            console.log("password updated succesfully");
            res.status(200).json({message:"password updated succesfully"});
        }
    }


});
  function validate(req) {
      const schema = Joi.object().keys({
          
         _id:Joi.string().required(),
          password :Joi.string().min(5).max(1024).required(),
          newPassword :Joi.string().min(5).max(1024).required(),
          confirmPassword :Joi.string().min(5).max(1024).required(),

          
      });
      return schema.validate(req);
        
    }
    
module.exports = router;    