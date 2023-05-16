const mongoose =require('mongoose');

module.exports= mongoose.model('employee',{
    firstName:{type: String},
    lastName:{type: String},
    designation:{type: String},
    dob:{type: String},
    salary:{type: Number},
    empId:{type: String},
});
