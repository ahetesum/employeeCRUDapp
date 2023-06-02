
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
    (req.body.role==="ADMIN")?req.body.employee.isUserApproved=true:req.body.employee.isUserApproved=false;

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

exports.approval= (req,res,next)=>{
    console.log(req.body);
    Employee.findOne({ mobile: req.body.mobile}).then(data=>{
          console.log(data);
          data.isUserApproved=true;
          Employee.findByIdAndUpdate(data._id,data).then(data1=>{
            console.log(data1)
            res.status(200).json({"status":"User is Approved by Admin"});
        })
      }).catch(err=>console.log(err))
}

exports.generateOTP= (req,res,next)=>{
    console.log('generateOTP',req.params.mobile);
    Employee.findOne({ mobile: req.params.mobile}).then(data=>{
        console.log(data.mobile);
        res.status(200).json({
            "OTP":"123456"
        });

      }).catch(err=>
        res.status(400).json({
            "error":err
        })
        )
}

exports.generateToken= (req,res,next)=>{
    console.log('generateToken',req.body);
    AuthUser.findOne({ mobile: req.body.mobile}).then(data=>{
        console.log(data);
        if(data && req.body.OTP==="123456")
            res.status(200).json({"token":data.token});
        else
        {
            res.status(403).json({"status":"Invalid OTP"});
        }

    }).catch(err=>console.log(err))
}