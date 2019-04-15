let authService = require(__dirname+'/../../services/authenticationService/authenticationService.js');

let signup = (req, res) => {
    //call the service to perform signup
    let newUserJSON = req.body;     
    newUserJSON.profilePicture = req.file.location;
    authService.signup(newUserJSON)
    .then((result) => {
        if (result.signupSuccess===true){
            res.status(200);
            res.send({
                message: "Signup Successful",
                status: 200
            });
        }
    })
    .catch((result) => {
        
            res.status(500);
            res.send({
                message: result.message,
                status: 500
            });
        
    })

}

let uploadProfilePicture = (req,res) => {
    const singleUpload = authService.upload.single('image');
    singleUpload(req, res, function(err, some) {
        signup(req,res);
  });
}

let login = (req, res) => {
    // call the service to perform login
}

module.exports = {
    uploadProfilePicture,
    signup,
    login
}