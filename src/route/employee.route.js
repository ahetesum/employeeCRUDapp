module.exports = app => {
    const employee = require("../controllers/employee.controller");
  
    var router = require("express").Router();
  
    router.get("/name", employee.getName);
  
    router.get("/", employee.getEmployee);

      
    router.post("/", employee.create);

    app.use('/api/v1/employee', router);
  };