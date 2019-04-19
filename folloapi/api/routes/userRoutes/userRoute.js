
let userController = require (__dirname+'/../../controllers/userController/userController.js')
let routes = require('express').Router();
const authChecker = require (__dirname+'/../../middleware/authChecker.js');

routes.post('/user/me', authChecker, userController.getUser);


module.exports = routes;