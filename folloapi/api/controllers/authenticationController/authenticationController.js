let authService = require(__dirname+'/../../services/authenticationService/authenticationService.js');


let signup = (req, res) => {
    //call the service to perform signup
    let newUserJSON = req.body;
    newUserJSON.profilePicture = uploadProfilePicture(req,res);
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

let login = (req, res) => {
    // call the service to perform login
}

function uploadProfilePicture(req,res){
    const singleUpload = authService.upload.single('image');
    singleUpload(req, res, function(err, some) {
    // if (err) {
    //   return res.status(500).send({errors: [{title: 'Image Upload Error', detail: err.message}] });
    // }

    //return res.json({'imageUrl': req.file.location});

    return req.file.location;
  });
}


module.exports = {
    signup,
    login
}