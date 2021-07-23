const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { User, validate } = require('../models/users');
//const {checkToken} = require('../token/token_validation');
const express = require('express');
    const authenticateToken = require('../token/token_validation');
const router = express.Router();

router.post('/',authenticateToken, async (req, res) => {
    
    const { error } = validate(req.body);
    if (error) {
        return res.status(400).json({status:400 , message: error.details[0].message});
    }

    

    let user = await User.findOne({ email: req.body.email });
    if (user) {
        return res.status(400).json({status:400,message:'That user already exists!'});
    } else {
    
        user = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        });
        
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password,salt);
        await user.save();
        res.send(user);
    }
});


module.exports = router;