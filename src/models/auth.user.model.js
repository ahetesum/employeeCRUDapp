
const mongoose =require('mongoose');
const Employee = require('../models/employee.model');

console.log(Employee);

module.exports= mongoose.model('user',{
    mobile:{type: String},
    email:{type: String},
    password:{type: String},
    token:{type: String},
    role:{type: String},
    employee:{type:Employee.schema},
   
});