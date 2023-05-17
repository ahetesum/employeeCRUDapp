const {generateCrudMethods}= require('../services/index')
const Employee = require('../models/employee.model');
const employeeCrud= generateCrudMethods(Employee);
const ObjectId = require('mongoose').Types.ObjectId;


exports.getName= (req,res)=>{
    res.json("Employee name is -> Ali")
}

exports.getEmployee= (req,res)=>{
    employeeCrud.getAll().then((data)=>{
        res.status(200).json(data);
    }).catch(err=>res.status(400).json(err))
}

exports.getById= (req,res) =>{
    if(ObjectId.isValid(req.params.id)==false)
    {
        res.status(400).json({
            error:"given object id is not valid"
        })
    }
    else
        employeeCrud.getById(req.params.id).then(data=>{
            res.status(200).json(data);
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

exports.update= (req,res) =>{
    if(ObjectId.isValid(req.params.id)==false)
    {
        res.status(400).json({
            error:"given object id is not valid"
        })
    }
    else
        employeeCrud.findByIdAndUpdate(req.params.id,req.body).then(data=>{
            res.status(200).json(data);
        }).catch(err=>res.status(400).json(err))
}

exports.delete= (req,res) =>{
    if(ObjectId.isValid(req.params.id)==false)
    {
        res.status(400).json({
            error:"given object id is not valid"
        })
    }
    else
        employeeCrud.findByIdAndRemove(req.params.id).then(()=>{
            res.status(200).json({"data":"Deleted Sucessfully"});
        }).catch(err=>res.status(400).json(err))
}