
let authenticationController = require (__dirname+'/../../controllers/authenticationController/authenticationController.js')
let routes = require('express').Router();


routes.post('/signup/', authenticationController.signup);

routes.post('/login/', authenticationController.login);

module.exports = routes;