
let commController = require (__dirname+'/../../controllers/communityController/communityController.js')
let routes = require('express').Router();


routes.post('/createComm/', commController.addCommunity);

routes.get('/getCommunities/', commController.getAllCommunities);

module.exports = routes;