let User = require(__dirname + "/../../models/userModel/userModel.js");

// searches for a user with credentials, adds a new jwt token, and returns the user
let getUser = async (email) => {
    try {
      let user = await User.findByEmail(email);
      return user;
    }
    catch (e) {
      console.log(e);
      return null;
  
    }
  }

  module.exports = {
    getUser
  };