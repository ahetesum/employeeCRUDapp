
const {generateCrudMethods}= require('../services/index')
const AuthUser = require('../models/auth.user.model');
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

    authCrud.create(req.body).then((data)=>{
        data.token="";
        res.status(201).json(data);
    })
}