
const {generateCrudMethods}= require('../services/index')
const AuthUser = require('../models/auth.user.model');
const Employee = require('../models/employee.model');
const authCrud= generateCrudMethods(AuthUser);
const ObjectId = require('mongoose').Types.ObjectId;
const crypto = require('crypto');

exports.login= (req,res,next)=>{
    console.log(req.body);
    AuthUser.findOne({ mobile: req.body.mobile}).then(data=>{
          console.log(data);
          res.status(200).json({"token":data.token});

      }).catch(err=>console.log(err))
}

exports.register= (req,res,next) =>{

    req.body.token= crypto.randomBytes(16).toString("hex");

    authCrud.create(req.body).then((regData)=>{
        Employee.create(req.body.employee)
        .then(data=>{
            regData.token="";
            regData.employee=data;
            res.status(201).json(regData)
        }).catch(err=>{
            res.status(400).json(err)
        })
        //res.status(201).json(data);
    })
}