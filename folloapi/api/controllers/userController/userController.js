let userService = require(__dirname +
    "/../../services/userService/userService.js");
    

  let getUser = async (req, res) => {
    console.log(req.body);
    let result = await userService.getUser(req.body.email);
    console.log(result);
    if (result) {
        res.send(result);
    }
    else {
        res.status(400).send({
            status: 400,
            message: 'cannot login'
        });
    }

}

let createPost = (req, res) => {
  let newPostJSON = req.body;
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
    getUser
  };
  