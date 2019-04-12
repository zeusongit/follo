let service = require(__dirname+'/../services/service.js');


let signup = (req, res) => {
    //call the service to perform signup

    let content = req.body;  

      if(!content) {
        return res.status(400).send({
            message: "User content cannot be empty"
        });
    }

    service.addUser(content).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the User."
        });
    });


}

let login = (req, res) => {
    // call the service to perform login
}


module.exports = {
    signup,
    login
}