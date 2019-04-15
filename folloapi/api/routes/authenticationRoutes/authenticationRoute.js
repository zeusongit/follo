
let authenticationController = require (__dirname+'/../../controllers/authenticationController/authenticationController.js')
let routes = require('express').Router();
const authChecker = require (__dirname+'/../../middleware/authChecker.js');

routes.post('/user/signup/', authenticationController.signup);

routes.post('/user/login/', authenticationController.login);

routes.post('/user/logout', authChecker, authenticationController.logout);

module.exports = routes;