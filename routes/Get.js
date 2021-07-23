const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { User, validate } = require('../models/users');
const authenticateToken = require('../token/token_validation');
const express = require('express');
const router = express.Router();

//get all data present in mongo-game
router.get('/',authenticateToken,async(req,res) => {
  const user = await User.find({});
  console.log(user);
  res.status(200).json(user);
});
//get particular data from mongo-game
 router.get("/:_id",authenticateToken,async(req,res) => {
    const user = await User.findOne({_id:req.params._id});

    if(!user) {   
      console.log("user id is not found",user);
    res.status(400).json({status:400,message:"invalid id"});
    }else{
    console.log(user);
    res.status(200).json(user);
    }

 });
 
 
     
 module.exports = router;