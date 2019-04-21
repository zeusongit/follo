const User = require(__dirname + "/../../models/userModel/userModel.js");
let authenticationService = require(__dirname +
  "/../../services/authenticationService/authenticationService.js");

// searches for a user with credentials, adds a new jwt token, and returns the user
let getUser = async (email,token) => {
    try {
      if(!email){
        email = await authenticationService.jwtDecode(token);
      }
      let user = await User.findByEmail(email);
      console.log("uu:"+user);
      return user;
    }
    catch (e) {
      console.log("aa:"+e);
      return null;
  
    }
  }

  // let getUserByToken = async (tkn) => {
  //   try {
  //     let email= await authChecker.jwtDecode();

  //     let user = await getUser;
  //     return user;
  //   }
  //   catch (e) {
  //     console.log("jwtderr"+e);
  //     return null;
  
  //   }
  // }

  module.exports = {
    getUser
  };