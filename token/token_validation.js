const jwt = require('jsonwebtoken');

  function authenticateToken (req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]


  if (token == null) return res.sendStatus(401)

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET,{ expiresIn: '180s' }, (err ,user) => {
    console.log(err)

    if (err) return res.sendStatus(403)

    req.user = user

    next()
  })
}
module.exports = authenticateToken;


/*const {verify}= require('jsonwebtoken');
 module.exports = {
     checkToken : (req,res,next) => {
         let token =  req.get("authorisation");
         if(token) {
             token = token.slice(7);
             verify(token,process.env.ACCESS_TOKEN_SECRET,(err,decoded) => {
                 if(err){
                     res.json({message:"invalid Token" });
                 }else{
                     next();
                 }
             })

         }else {
             
             res.json({message:"access denied! unauthorised user" })
         }
     }
 }*/