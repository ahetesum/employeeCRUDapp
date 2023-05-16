const {generateCrudMethods}= require('../services/index')
const Employee = require('../models/employee.model');
const employeeCrud= generateCrudMethods(Employee);

exports.getName= (req,res)=>{
    res.json("Employee name is -> Ali")
}

exports.getEmployee= (req,res)=>{
    employeeCrud.getAll().then((data)=>{
        res.status(400).json(data);
    }).catch(err=>res.status(400).json(err))
}

exports.create= (req,res)=>{
    console.log(req.body)
    employeeCrud.create(req.body)
    .then(data=>{
        res.status(201).json(data)
    }).catch(err=>{
        res.status(400).json(err)
    })
}