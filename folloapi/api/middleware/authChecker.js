const jwt = require("jsonwebtoken");
const config = require(__dirname + "/../../config/config.js");
const jwtKey = config.JWT_KEY;
console.log(jwtKey);
let User = require(__dirname + "/../models/userModel/userModel.js");

let authChecker = async (req, res, next) => {
  if (req.header("Authorization")) {
    const token = req.header("Authorization").replace("Bearer ", "");
    console.log(token);
    const decodedToken = jwt.verify(token, jwtKey);
    const user = await User.findOne({
      email: decodedToken.email,
      "tokens.token": token
    });

    if (!user) {
      res.status(401).send({
        status: 400,
        message: "Un-authenticated"
      });
    } else {
      await user.ok();
      req.user = user;
      req.token = token;

      next();
    }
  } else {
    res.status(401).send({
      status: 401,
      msg: "unauthenticated"
    });
  }
};

module.exports = authChecker;
