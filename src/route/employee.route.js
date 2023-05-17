module.exports = app => {
    const employee = require("../controllers/employee.controller");
  
    var router = require("express").Router();
  
    router.get("/name", employee.getName);
  
    router.get("/", employee.getEmployee);
    router.get("/:id", employee.getById);    
    router.put("/:id", employee.update);
    router.delete("/:id", employee.delete);
      
    router.post("/", employee.create);

    app.use('/api/v1/employee', router);
  };