
let authenticationController = require (__dirname+'/../../controllers/authenticationController/authenticationController.js')
let routes = require('express').Router();


routes.post('/signup/', authenticationController.uploadProfilePicture);

routes.post('/login/', authenticationController.login);

module.exports = routes;