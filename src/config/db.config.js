const mongoose = require('mongoose');

const dbUri= 'mongodb://127.0.0.1:27017/employeeDB';

module.exports=()=>{
   return mongoose.connect(dbUri);
}