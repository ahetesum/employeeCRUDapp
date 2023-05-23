
const AuthUser = require('../models/auth.user.model');

verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];
  
    if (!token) {
      return res.status(403).send({
        message: "No token provided!"
      });
    }
    AuthUser.findOne({token:token})
    .then(user=>{
        req.userId=user.id;
        next();
    }).catch(err=>{
      res.status(401).json({"error":"Un-Authorize token!"})
    })      
  };

  const middleware = {
    verifyToken: verifyToken,
   // validUserRole:validUserRole
  };
  module.exports = middleware;