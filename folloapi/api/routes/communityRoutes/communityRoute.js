let commController = require(__dirname +
  "/../../controllers/communityController/communityController.js");
const authChecker = require(__dirname + "/../../middleware/authChecker.js");

const imageUploadForCommunity = require (__dirname+'/../../middleware/imageUploadForCommunity.js')

let routes = require("express").Router();

routes.post("/community/", authChecker, imageUploadForCommunity, commController.createCommunity);

routes.get("/community/", commController.getAllCommunities);

module.exports = routes;