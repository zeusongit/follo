
let commController = require (__dirname+'/../../controllers/communityController/communityController.js')
let routes = require('express').Router();


routes.post('/createComm/', commController.addCommunity);

module.exports = routes;