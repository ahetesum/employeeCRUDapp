module.exports = app => {
    const auth = require("../controllers/auth.controller");
  
    var router = require("express").Router();
  
    router.post("/login", auth.login);
    router.post("/register", auth.register);    

    app.use('/api/v1/auth', router);
  };