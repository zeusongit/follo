let commController = require(__dirname +
  "/../../controllers/communityController/communityController.js");
const authChecker = require(__dirname + "/../../middleware/authChecker.js");

let routes = require("express").Router();

routes.post("/createComm/", authChecker, commController.addCommunity);

routes.get("/getCommunities/", commController.getAllCommunities);

module.exports = routes;
