
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
        req.userId = user.id;
        next();
    })      
  };

  const middleware = {
    verifyToken: verifyToken,
  };
  module.exports = middleware;