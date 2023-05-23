const middleware = require("../middleware/auth.validate");

module.exports = app => {
    const employee = require("../controllers/employee.controller");
  
    var router = require("express").Router();
  
  
    router.get("/",[middleware.verifyToken], employee.getEmployee);
    router.get("/:id", [middleware.verifyToken],employee.getById);    
    router.put("/:id", [middleware.verifyToken],employee.update);
    router.delete("/:id", [middleware.verifyToken],employee.delete);
      
    router.post("/", [middleware.verifyToken],employee.create);

    app.use('/api/v1/employee', router);
  };