const {generateCrudMethods}= require('../services/index')
const Employee = require('../models/employee.model');
const employeeCrud= generateCrudMethods(Employee);
const ObjectId = require('mongoose').Types.ObjectId;


exports.getName= (req,res,next)=>{
    res.json("Employee name is -> Ali")
}

exports.getEmployee= (req,res,next)=>{

    console.log(req.query.limit,req.query.page);

    Employee.find({isUserApproved:true})
    .limit(req.query.limit)
    .skip(req.query.limit*req.query.page)
    .sort({firstName:req.query.sort})
    .then((data)=>{
        res.status(200).json(data);
    }).catch(err=>res.status(400).json(err))
}

exports.search= (req,res,next)=>{

    let searchQuery= '';
    if(req.query.by==='firstname' )
    {
        searchQuery={"firstName": { $regex: '.*' + req.query.name + '.*' }};
    }
    else if(req.query.by==='lastname' )
    {
        searchQuery={
        "lastName":{ $regex: '.*' + req.query.lastname + '.*' }      
        };

    }
    else if(req.query.by==='designation' )
    {
        searchQuery={"designation":{ $regex: '.*' + req.query.designation + '.*' } 
        };
    }

    console.log(searchQuery)
    Employee.find(searchQuery)
    .then(data=>{
        res.status(200).json(data);
    })

}

exports.getById= (req,res,next) =>{
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

exports.create= (req,res,next)=>{
    console.log(req.body)
    employeeCrud.create(req.body)
    .then(data=>{
        res.status(201).json(data)
    }).catch(err=>{
        res.status(400).json(err)
    })
}

exports.update= (req,res,next) =>{
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

exports.delete= (req,res,next) =>{
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