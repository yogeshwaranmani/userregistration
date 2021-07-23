const config = require('config');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');
const users = require('./routes/user');
const auth = require('./routes/auth');
const Get = require('./routes/Get');
const {checkToken} = require('./token/token_validation');
const changePassword =require('./routes/changePassword');
const express = require('express');
const app = express();
let validator = require("express-joi-validation").createValidator({
    passError: true,
  });

 
  

  if (!config.has("PrivateKey")) {
     console.error('FATAL ERROR: PrivateKey is not defined.');
     process.exit(1);
 }



mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

mongoose.connect('mongodb://localhost/mongo-games')

.then(() => console.log('now connected to mongodb'))
.catch(err => console.log('semething went wrong',err));

app.use(express.json());

app.use('/api/users',users);
app.use('/api/auth',auth);
app.use('/api/changePassword',changePassword);
app.use('/api/User',Get);
app.use('/api/User',Get);

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`listening on port ${port}...`))
















