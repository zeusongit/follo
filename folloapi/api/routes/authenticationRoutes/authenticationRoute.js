var express = require('express');

// create our router
var router = express.Router();

let authenticationController = require (__dirname+'/../controllers/authenticationController/authenticationController.js');


let signup = () => {
    // use authenticationController to signup
     authenticationController.addUser;
}


let login = () => {
    // use authenticationController to signup
}

module.exports ={
    signup,
    login
}