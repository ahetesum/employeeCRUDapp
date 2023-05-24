const middleware = require("../middleware/auth.validate");

module.exports = app => {
    const employee = require("../controllers/employee.controller");
  
    var router = require("express").Router();
  
  
    router.get("/",[middleware.verifyToken], employee.getEmployee);
    //router.get("/getById/:id", [middleware.verifyToken],employee.getById);    
    router.put("/:id", [middleware.verifyToken],employee.update);
    router.post("/", [middleware.verifyToken],employee.create);
      
    router.delete("/:id", [middleware.verifyToken],employee.delete);

    router.get("/search",[middleware.verifyToken], employee.search);

    app.use('/api/v1/employee', router);
  };