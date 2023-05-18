
const mongoose =require('mongoose');

module.exports= mongoose.model('user',{
    mobile:{type: String},
    email:{type: String},
    password:{type: String},
    token:{type: String},
});