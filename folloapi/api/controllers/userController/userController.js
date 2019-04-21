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

  module.exports = {
    getUser
  };
  