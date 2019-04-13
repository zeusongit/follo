let authService = require(__dirname+'/../../services/authenticationService/authenticationService.js');


let signup = (req, res) => {
    //call the service to perform signup
    let newUserJSON = req.body;
    authService.signup(newUserJSON)
    .then((result) => {
        if (result.signupSuccess===true){
            res.status(200);
            res.send({
                message: "Signup Successful",
                status: 200
            });
        }
        else{
            res.status(500);
            res.send({
                message: "something went wrong",
                status: 500
            })
        }
    })

}

let login = (req, res) => {
    // call the service to perform login
}


module.exports = {
    signup,
    login
}