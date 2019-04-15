let commService = require(__dirname +
  "/../../services/communityService/communityService.js");

let addCommunity = (req, res) => {
  const singleUpload = commService.upload.single("commImage");
  singleUpload(req, res, function(err, some) {
    createCommunity(req, res);
  });
};

let createCommunity = (req, res) => {
  let newCommJSON = req.body;
  newCommJSON.communityPicture = req.file.location;
  commService
    .createCommunity(newCommJSON)
    .then(result => {
      if (result.createSuccess === true) {
        res.status(200);
        res.send({
          message: "Community Created Successfully",
          status: 200
        });
      }
    })
    .catch(result => {
      res.status(500);
      res.send({
        message: result.message,
        status: 500
      });
    });
};

module.exports = {
  addCommunity,
  createCommunity
};
