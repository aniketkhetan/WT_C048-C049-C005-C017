const mongoose = require('mongoose');
const Uschema = new mongoose.Schema({

    fullname : {
        type:String,
        required:true

    },

    username:{
        type:String,
        required:true
    },

    email: {
        type:String,
        required:true,
        unique:true
    },

    address: {
        type:String,
        required:true
    },

    password: {
        type:String,
        required:true
    },

    cpassword:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true
    }
});
 // colelction

 const Register = new mongoose.model("Register",  Uschema);

 module.exports = Register;
 


